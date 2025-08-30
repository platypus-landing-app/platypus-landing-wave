#!/bin/bash

# Platypus Walk Landing Page (Vite React) Deployment Script
# Usage: ./redeploy-platypus-walk-landing.sh [options] [branch]
# Default branch: main

set -e  # Exit on any error

# Configuration
PROJECT_DIR="/opt/platypus/walk-landing"
REPO_URL="git@github.com:KaVipatel12/platypus-landing-wave.git"
BRANCH="${1:-main}"
COMPOSE_PROJECT="platypus-walk-landing"
DOMAIN="theplatypus.in"

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
PURPLE='\033[0;35m'
CYAN='\033[0;36m'
NC='\033[0m' # No Color

# Logging functions
log() {
    echo -e "${BLUE}[$(date +'%Y-%m-%d %H:%M:%S')]${NC} $1"
}

success() {
    echo -e "${GREEN}[$(date +'%Y-%m-%d %H:%M:%S')] ✅ $1${NC}"
}

warning() {
    echo -e "${YELLOW}[$(date +'%Y-%m-%d %H:%M:%S')] ⚠️  $1${NC}"
}

error() {
    echo -e "${RED}[$(date +'%Y-%m-%d %H:%M:%S')] ❌ $1${NC}"
}

info() {
    echo -e "${CYAN}[$(date +'%Y-%m-%d %H:%M:%S')] ℹ️  $1${NC}"
}

step() {
    echo -e "${PURPLE}[$(date +'%Y-%m-%d %H:%M:%S')] 🚀 $1${NC}"
}

# Function to check if directory exists and create if needed
ensure_directory() {
    step "Ensuring project directory exists..."
    if [ ! -d "$PROJECT_DIR" ]; then
        log "Creating project directory: $PROJECT_DIR"
        sudo mkdir -p "$PROJECT_DIR"
        sudo chown $(whoami):$(whoami) "$PROJECT_DIR"
    fi
    success "Project directory verified"
}

# Function to check Git repository status
check_git_repo() {
    step "Checking Git repository..."
    if [ ! -d "$PROJECT_DIR/.git" ]; then
        log "Git repository not found. Cloning repository..."
        cd $(dirname "$PROJECT_DIR")
        git clone "$REPO_URL" $(basename "$PROJECT_DIR")
        cd "$PROJECT_DIR"
        git checkout "$BRANCH"
        success "Repository cloned successfully"
    else
        success "Git repository found"
    fi
}

# Function to backup current state
backup_current_state() {
    step "Creating backup of current state..."
    BACKUP_DIR="/opt/backups/platypus-walk-landing-$(date +%Y%m%d-%H%M%S)"
    sudo mkdir -p "$BACKUP_DIR"

    # Backup current code if exists
    if [ -d "$PROJECT_DIR" ]; then
        log "Backing up current code..."
        sudo cp -r "$PROJECT_DIR" "$BACKUP_DIR/code" 2>/dev/null || true
    fi

    success "Backup created at: $BACKUP_DIR"
    echo "$BACKUP_DIR" > /tmp/latest-backup-path-walk-landing
}

# Function to update code from Git
update_code() {
    step "Updating code from Git repository..."
    cd "$PROJECT_DIR"

    # Check if there are local changes
    if [ -n "$(git status --porcelain)" ]; then
        warning "Local changes detected. Stashing them..."
        git stash push -m "Auto-stash before redeploy $(date)" 2>/dev/null || true
    fi

    # Fetch latest changes
    log "Fetching latest changes from origin..."
    git fetch origin

    # Checkout and pull the specified branch
    log "Checking out branch: $BRANCH"
    git checkout "$BRANCH"
    git pull origin "$BRANCH"

    # Show recent commits
    log "Recent commits:"
    git log --oneline -5

    success "Code updated from branch: $BRANCH"
}

# Function to validate configuration files
validate_config() {
    step "Validating configuration files..."
    cd "$PROJECT_DIR"

    # Check if docker-compose.yml exists
    if [ ! -f "docker-compose.yml" ]; then
        error "docker-compose.yml not found!"
        exit 1
    fi

    # Check if Dockerfile exists
    if [ ! -f "Dockerfile" ]; then
        error "Dockerfile not found!"
        exit 1
    fi

    # Check if nginx.conf exists
    if [ ! -f "nginx.conf" ]; then
        error "nginx.conf not found!"
        exit 1
    fi

    # Check if package.json exists
    if [ ! -f "package.json" ]; then
        error "package.json not found!"
        exit 1
    fi

    # Validate docker-compose.yml syntax
    log "Validating docker-compose.yml syntax..."
    docker-compose config >/dev/null 2>&1 || {
        error "Invalid docker-compose.yml syntax!"
        exit 1
    }

    # Validate package.json
    log "Validating package.json..."
    node -e "JSON.parse(require('fs').readFileSync('package.json', 'utf8'))" || {
        error "Invalid package.json syntax!"
        exit 1
    }

    success "Configuration validation passed"
}

# Function to stop containers
stop_containers() {
    step "Stopping Docker containers..."
    cd "$PROJECT_DIR"

    if [ -f "docker-compose.yml" ]; then
        docker-compose -p "$COMPOSE_PROJECT" down --remove-orphans 2>/dev/null || true
        success "Containers stopped successfully"
    else
        warning "docker-compose.yml not found, skipping container stop"
    fi
}

# Function to clean Docker resources
cleanup_docker() {
    step "Cleaning up Docker resources..."

    # Remove old project images
    log "Removing old project images..."
    docker images | grep "$COMPOSE_PROJECT" | awk '{print $3}' | xargs -r docker rmi -f 2>/dev/null || true

    # Remove unused containers
    log "Removing unused containers..."
    docker container prune -f || true

    # Remove unused images
    log "Removing unused images..."
    docker image prune -f || true

    # Remove unused networks (except external ones)
    log "Removing unused networks..."
    docker network prune -f || true

    success "Docker cleanup completed"
}

# Function to build containers
build_containers() {
    step "Building Docker containers..."
    cd "$PROJECT_DIR"

    if [ -f "docker-compose.yml" ]; then
        # Build without cache for clean build
        log "Building containers without cache..."
        docker-compose -p "$COMPOSE_PROJECT" build --no-cache --parallel
        success "Containers built successfully"
    else
        error "docker-compose.yml not found!"
        exit 1
    fi
}

# Function to start containers
start_containers() {
    step "Starting Docker containers..."
    cd "$PROJECT_DIR"

    # Start containers in detached mode
    docker-compose -p "$COMPOSE_PROJECT" up -d

    success "Containers started successfully"
}

# Function to wait for services to be healthy
wait_for_services() {
    step "Waiting for services to become healthy..."

    # Wait for containers to start
    sleep 15

    # Check container status
    local max_attempts=60
    local attempt=1

    while [ $attempt -le $max_attempts ]; do
        log "Health check attempt $attempt/$max_attempts..."

        # Check if frontend container is running
        local frontend_status=$(docker-compose -p "$COMPOSE_PROJECT" ps -q frontend | xargs docker inspect -f '{{.State.Status}}' 2>/dev/null || echo "missing")
        local health_status=$(docker-compose -p "$COMPOSE_PROJECT" ps -q frontend | xargs docker inspect -f '{{if .State.Health}}{{.State.Health.Status}}{{else}}no-health-check{{end}}' 2>/dev/null || echo "missing")

        log "Frontend: $frontend_status | Health: $health_status"

        if [ "$frontend_status" = "running" ]; then
            if [ "$health_status" = "healthy" ] || [ "$health_status" = "no-health-check" ]; then
                success "Frontend container is running and healthy!"
                break
            fi
        fi

        if [ $attempt -eq $max_attempts ]; then
            error "Services failed to start within timeout period"
            show_logs
            exit 1
        fi

        sleep 10
        ((attempt++))
    done
}

# Function to test deployment
test_deployment() {
    step "Testing deployment..."

    # Wait a bit more for services to be fully ready
    sleep 10

    local test_passed=0
    local test_failed=0

    # Test container health
    log "Testing container health..."
    if docker exec platypus_walk_landing_frontend curl -f http://localhost:80/health >/dev/null 2>&1; then
        success "✅ Container health check passed"
        ((test_passed++))
    else
        warning "❌ Container health check failed"
        ((test_failed++))
    fi

    # Test external accessibility - Frontend
    log "Testing external accessibility..."
    if curl -f -s -I "https://$DOMAIN" >/dev/null 2>&1; then
        success "✅ Frontend domain accessible: https://$DOMAIN"
        ((test_passed++))
    else
        warning "❌ Frontend domain failed: https://$DOMAIN"
        ((test_failed++))
    fi

    # Test www redirect
    if curl -f -s -I "https://www.$DOMAIN" >/dev/null 2>&1; then
        success "✅ WWW domain accessible: https://www.$DOMAIN"
        ((test_passed++))
    else
        warning "❌ WWW domain failed: https://www.$DOMAIN"
        ((test_failed++))
    fi

    # Test nginx-proxy integration
    if docker network inspect nginx-proxy_default >/dev/null 2>&1; then
        if docker network inspect nginx-proxy_default | grep -q "platypus_walk_landing_frontend"; then
            success "✅ Frontend connected to nginx-proxy network"
            ((test_passed++))
        else
            warning "❌ Frontend not connected to nginx-proxy network"
            ((test_failed++))
        fi
    fi

    # Test static assets
    log "Testing static assets..."
    if curl -f -s "https://$DOMAIN/favicon.ico" >/dev/null 2>&1; then
        success "✅ Static assets accessible"
        ((test_passed++))
    else
        warning "❌ Static assets not accessible"
        ((test_failed++))
    fi

    # Test page content
    log "Testing page content..."
    local response=$(curl -s "https://$DOMAIN" | grep -i "platypus" | head -1)
    if [ -n "$response" ]; then
        success "✅ Page content loads correctly"
        ((test_passed++))
    else
        warning "❌ Page content not loading correctly"
        ((test_failed++))
    fi

    # Summary
    log "Test Results: $test_passed passed, $test_failed failed"

    if [ $test_failed -eq 0 ]; then
        success "🎉 All tests passed!"
    elif [ $test_failed -le 2 ]; then
        warning "⚠️ Some tests failed but deployment appears functional"
    else
        error "❌ Multiple tests failed. Deployment may have issues."
        return 1
    fi
}

# Function to show logs
show_logs() {
    step "Showing recent container logs..."
    cd "$PROJECT_DIR"

    echo "=== Frontend Logs ==="
    docker-compose -p "$COMPOSE_PROJECT" logs --tail=30 frontend || true
}

# Function to show deployment status
show_status() {
    step "Deployment Status Report"
    cd "$PROJECT_DIR"

    echo ""
    echo "=== Container Status ==="
    docker-compose -p "$COMPOSE_PROJECT" ps

    echo ""
    echo "=== Resource Usage ==="
    docker stats --no-stream $(docker-compose -p "$COMPOSE_PROJECT" ps -q) 2>/dev/null || true

    echo ""
    echo "=== Network Information ==="
    echo "Frontend URL: https://$DOMAIN"
    echo "WWW URL: https://www.$DOMAIN"

    echo ""
    echo "=== Environment ==="
    echo "Branch: $BRANCH"
    echo "Project Directory: $PROJECT_DIR"
    echo "Compose Project: $COMPOSE_PROJECT"

    echo ""
    echo "=== Useful Commands ==="
    echo "View logs: docker-compose -p $COMPOSE_PROJECT logs -f"
    echo "Stop containers: docker-compose -p $COMPOSE_PROJECT down"
    echo "Restart: docker-compose -p $COMPOSE_PROJECT restart"
    echo "Rebuild: docker-compose -p $COMPOSE_PROJECT build --no-cache"
    echo "Shell into frontend: docker exec -it platypus_walk_landing_frontend /bin/sh"

    echo ""
    echo "=== Recent Backup ==="
    if [ -f "/tmp/latest-backup-path-walk-landing" ]; then
        echo "Latest backup: $(cat /tmp/latest-backup-path-walk-landing)"
    else
        echo "No recent backup found"
    fi
}

# Function to rollback deployment
rollback_deployment() {
    step "Rolling back deployment..."

    if [ ! -f "/tmp/latest-backup-path-walk-landing" ]; then
        error "No backup found for rollback!"
        exit 1
    fi

    local backup_path=$(cat /tmp/latest-backup-path-walk-landing)

    if [ ! -d "$backup_path" ]; then
        error "Backup directory not found: $backup_path"
        exit 1
    fi

    log "Rolling back to: $backup_path"

    # Stop current containers
    stop_containers

    # Restore code
    log "Restoring code from backup..."
    cp -r "$backup_path/code/"* "$PROJECT_DIR/" 2>/dev/null || true

    # Rebuild and start
    build_containers
    start_containers
    wait_for_services

    success "Rollback completed!"
}

# Pre-flight checks
preflight_checks() {
    step "Running pre-flight checks..."

    # Check if running as root or with sudo access
    if [ "$EUID" -ne 0 ] && ! sudo -n true 2>/dev/null; then
        error "This script requires root privileges or passwordless sudo access"
        exit 1
    fi

    # Check required commands
    local commands=("docker" "docker-compose" "git" "curl" "node")
    for cmd in "${commands[@]}"; do
        if ! command -v "$cmd" >/dev/null 2>&1; then
            error "$cmd is not installed or not in PATH"
            exit 1
        fi
    done

    # Check Docker daemon
    if ! docker info >/dev/null 2>&1; then
        error "Docker daemon is not running"
        exit 1
    fi

    # Check nginx-proxy network
    if ! docker network inspect nginx-proxy_default >/dev/null 2>&1; then
        error "nginx-proxy_default network not found. nginx-proxy must be running."
        exit 1
    fi

    # Check if nginx-proxy is running
    if ! docker ps | grep -q "nginx-proxy"; then
        warning "nginx-proxy container might not be running"
    fi

    success "Pre-flight checks passed"
}

# Function to check for conflicts
check_conflicts() {
    step "Checking for conflicts with existing services..."

    # Check if old platypus-landing is still running on same domains
    if docker ps | grep -q "platypus_frontend"; then
        warning "Old platypus_frontend container is still running!"
        warning "This may cause domain conflicts. Consider stopping the old deployment first:"
        warning "cd /opt/platypus-landing && docker-compose down"

        read -p "Do you want to continue anyway? (y/N): " -r
        if [[ ! $REPLY =~ ^[Yy]$ ]]; then
            error "Deployment cancelled due to conflicts"
            exit 1
        fi
    fi

    success "No critical conflicts detected"
}

# Main deployment function
main() {
    step "🚀 Starting Platypus Walk Landing Page Deployment"
    log "Branch: $BRANCH"
    log "Project Directory: $PROJECT_DIR"
    log "Domain: $DOMAIN"

    # Run all deployment steps
    preflight_checks
    check_conflicts
    ensure_directory
    check_git_repo
    backup_current_state
    update_code
    validate_config
    stop_containers
    cleanup_docker
    build_containers
    start_containers
    wait_for_services

    if test_deployment; then
        success "🎉 Deployment completed successfully!"
        show_status
    else
        error "🚨 Deployment completed with issues!"
        show_logs
        warning "Consider running: $0 --rollback"
        exit 1
    fi
}

# Trap to handle script interruption
trap 'error "Script interrupted by user"; exit 1' INT TERM

# Help function
show_help() {
    echo "Platypus Walk Landing Page Deployment Script"
    echo ""
    echo "Usage: $0 [OPTIONS] [BRANCH]"
    echo ""
    echo "Options:"
    echo "  -h, --help        Show this help message"
    echo "  -l, --logs        Show logs after deployment"
    echo "  -s, --status      Show current status without deploying"
    echo "  -t, --test        Run tests without deploying"
    echo "  -r, --rollback    Rollback to previous deployment"
    echo "  -f, --force       Force deployment (skip confirmations)"
    echo ""
    echo "Arguments:"
    echo "  BRANCH            Git branch to deploy (default: main)"
    echo ""
    echo "Examples:"
    echo "  $0                           # Deploy main branch"
    echo "  $0 develop                   # Deploy develop branch"
    echo "  $0 --status                  # Show current status"
    echo "  $0 --logs                    # Deploy and show logs"
    echo "  $0 --test                    # Run tests only"
    echo "  $0 --rollback                # Rollback to previous version"
    echo ""
    echo "Domains:"
    echo "  Frontend: https://$DOMAIN"
    echo "  WWW: https://www.$DOMAIN"
}

# Parse command line arguments
case "${1:-}" in
    -h|--help)
        show_help
        exit 0
        ;;
    -s|--status)
        cd "$PROJECT_DIR" 2>/dev/null || { error "Project directory not found: $PROJECT_DIR"; exit 1; }
        show_status
        exit 0
        ;;
    -l|--logs)
        main
        show_logs
        exit 0
        ;;
    -t|--test)
        cd "$PROJECT_DIR" 2>/dev/null || { error "Project directory not found: $PROJECT_DIR"; exit 1; }
        preflight_checks
        test_deployment
        exit 0
        ;;
    -r|--rollback)
        rollback_deployment
        exit 0
        ;;
    -f|--force)
        BRANCH="${2:-main}"
        main
        ;;
    *)
        main
        ;;
esac