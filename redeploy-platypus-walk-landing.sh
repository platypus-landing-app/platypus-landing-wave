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

# Environment variables for Supabase (ensure these are set)
SUPABASE_URL="https://jhckzuxlkggbkbrtjjdo.supabase.co"
SUPABASE_ANON_KEY="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImpoY2t6dXhsa2dnYmticnRqamRvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTYzNjM0NTMsImV4cCI6MjA3MTkzOTQ1M30.53_OwRcIN5NGSRV5YTfLvgqUFl8a0EKWwGjFl0OUWj8"

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

    # Ensure parent directory exists
    sudo mkdir -p $(dirname "$PROJECT_DIR")

    if [ ! -d "$PROJECT_DIR/.git" ]; then
        log "Git repository not found. Cloning repository..."

        # Remove directory if it exists but isn't a git repo
        if [ -d "$PROJECT_DIR" ]; then
            log "Removing existing non-git directory..."
            sudo rm -rf "$PROJECT_DIR"
        fi

        # Clone the repository
        cd $(dirname "$PROJECT_DIR")
        git clone "$REPO_URL" $(basename "$PROJECT_DIR")
        cd "$PROJECT_DIR"

        # Set ownership to current user
        sudo chown -R $(whoami):$(whoami) "$PROJECT_DIR"

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

    # Backup current containers state
    if docker ps -q -f name="platypus_walk_landing" | grep -q .; then
        log "Backing up container information..."
        docker ps -f name="platypus_walk_landing" > "$BACKUP_DIR/containers.txt" || true
        docker logs platypus_walk_landing_frontend > "$BACKUP_DIR/frontend.log" 2>&1 || true
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

# Function to validate configuration files and environment
validate_config() {
    step "Validating configuration files and environment..."
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

    # Check for Vite-specific files
    if [ ! -f "vite.config.ts" ] && [ ! -f "vite.config.js" ]; then
        warning "No Vite config file found - this might not be a Vite project"
    fi

    # Validate environment variables are set
    if [ -z "$SUPABASE_URL" ] || [ -z "$SUPABASE_ANON_KEY" ]; then
        warning "Supabase environment variables might not be set properly"
    fi

    # Check if .env files exist (for reference)
    if [ -f ".env" ]; then
        log "Found .env file"
    fi
    if [ -f ".env.local" ]; then
        log "Found .env.local file"
    fi

    success "Configuration validation passed"
}

# Function to stop containers gracefully
stop_containers() {
    step "Stopping Docker containers..."
    cd "$PROJECT_DIR"

    if [ -f "docker-compose.yml" ]; then
        # Stop containers gracefully with timeout
        log "Stopping containers with 30s timeout..."
        docker-compose -p "$COMPOSE_PROJECT" stop -t 30 2>/dev/null || true

        # Remove containers
        log "Removing containers..."
        docker-compose -p "$COMPOSE_PROJECT" down --remove-orphans 2>/dev/null || true

        success "Containers stopped successfully"
    else
        warning "docker-compose.yml not found, skipping container stop"
    fi
}

# Function to clean Docker resources
cleanup_docker() {
    step "Cleaning up Docker resources..."

    # Remove old project images (keep last 2 versions)
    log "Removing old project images..."
    docker images --format "table {{.Repository}}\t{{.Tag}}\t{{.ID}}\t{{.CreatedAt}}" | grep "$COMPOSE_PROJECT" | tail -n +3 | awk '{print $3}' | xargs -r docker rmi -f 2>/dev/null || true

    # Remove dangling images
    log "Removing dangling images..."
    docker image prune -f || true

    # Remove unused networks (except external ones)
    log "Removing unused networks..."
    docker network prune -f || true

    # Remove build cache older than 24h
    log "Cleaning build cache..."
    docker builder prune --filter until=24h -f || true

    success "Docker cleanup completed"
}

# Function to build containers with better error handling
build_containers() {
    step "Building Docker containers..."
    cd "$PROJECT_DIR"

    if [ -f "docker-compose.yml" ]; then
        # Set build arguments for Supabase
        export VITE_SUPABASE_URL="$SUPABASE_URL"
        export VITE_SUPABASE_ANON_KEY="$SUPABASE_ANON_KEY"

        # Build with no cache and pull latest base images
        log "Building containers without cache (this may take a few minutes)..."
        if docker-compose -p "$COMPOSE_PROJECT" build --no-cache --pull --parallel; then
            success "Containers built successfully"
        else
            error "Container build failed!"

            # Show build logs for debugging
            log "Checking recent build logs..."
            docker-compose -p "$COMPOSE_PROJECT" logs || true
            exit 1
        fi
    else
        error "docker-compose.yml not found!"
        exit 1
    fi
}

# Function to start containers with better monitoring
start_containers() {
    step "Starting Docker containers..."
    cd "$PROJECT_DIR"

    # Start containers in detached mode
    if docker-compose -p "$COMPOSE_PROJECT" up -d; then
        success "Containers started successfully"

        # Show container status immediately
        log "Container status:"
        docker-compose -p "$COMPOSE_PROJECT" ps
    else
        error "Failed to start containers!"
        show_logs
        exit 1
    fi
}

# Function to wait for services to be healthy with better monitoring
wait_for_services() {
    step "Waiting for services to become healthy..."

    # Initial wait for containers to initialize
    sleep 10

    # Check container status
    local max_attempts=60
    local attempt=1

    while [ $attempt -le $max_attempts ]; do
        log "Health check attempt $attempt/$max_attempts..."

        # Check if frontend container is running
        local container_id=$(docker-compose -p "$COMPOSE_PROJECT" ps -q frontend 2>/dev/null || echo "")

        if [ -n "$container_id" ]; then
            local frontend_status=$(docker inspect -f '{{.State.Status}}' "$container_id" 2>/dev/null || echo "missing")
            local health_status=$(docker inspect -f '{{if .State.Health}}{{.State.Health.Status}}{{else}}no-health-check{{end}}' "$container_id" 2>/dev/null || echo "missing")

            log "Container: $container_id | Status: $frontend_status | Health: $health_status"

            if [ "$frontend_status" = "running" ]; then
                if [ "$health_status" = "healthy" ] || [ "$health_status" = "no-health-check" ]; then
                    success "Frontend container is running and healthy!"
                    break
                fi
            fi
        else
            warning "Container not found or not started yet"
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

# Function to test deployment comprehensively
test_deployment() {
    step "Testing deployment..."

    # Wait for services to be fully ready
    sleep 15

    local test_passed=0
    local test_failed=0

    # Test container health
    log "Testing container health..."
    local container_id=$(docker-compose -p "$COMPOSE_PROJECT" ps -q frontend 2>/dev/null || echo "")
    if [ -n "$container_id" ] && docker exec "$container_id" wget --quiet --tries=1 --timeout=5 --spider http://localhost:80/ >/dev/null 2>&1; then
        success "✅ Container health check passed"
        ((test_passed++))
    else
        warning "❌ Container health check failed"
        ((test_failed++))
    fi

    # Test external accessibility - Frontend
    log "Testing external accessibility..."
    if timeout 10 curl -f -s -I "https://$DOMAIN" >/dev/null 2>&1; then
        success "✅ Frontend domain accessible: https://$DOMAIN"
        ((test_passed++))
    else
        warning "❌ Frontend domain failed: https://$DOMAIN"
        ((test_failed++))
    fi

    # Test www redirect
    if timeout 10 curl -f -s -I "https://www.$DOMAIN" >/dev/null 2>&1; then
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

    # Test static assets (favicon as indicator)
    log "Testing static assets..."
    if timeout 10 curl -f -s "https://$DOMAIN/favicon.ico" >/dev/null 2>&1; then
        success "✅ Static assets accessible"
        ((test_passed++))
    else
        warning "❌ Static assets not accessible"
        ((test_failed++))
    fi

    # Test React app content (check for specific Platypus content)
    log "Testing React app content..."
    local response=$(timeout 10 curl -s "https://$DOMAIN" 2>/dev/null | grep -i -E "(platypus|react|vite)" | head -1)
    if [ -n "$response" ]; then
        success "✅ React app content loads correctly"
        info "Found: $(echo "$response" | cut -c1-50)..."
        ((test_passed++))
    else
        warning "❌ React app content not loading correctly"
        ((test_failed++))
    fi

    # Test Supabase integration (if applicable)
    log "Testing for Supabase configuration..."
    local js_content=$(timeout 10 curl -s "https://$DOMAIN" 2>/dev/null | grep -o "supabase" | head -1)
    if [ -n "$js_content" ]; then
        success "✅ Supabase integration detected"
        ((test_passed++))
    else
        info "ℹ️  Supabase integration not detected in page source (might be bundled)"
        # Don't count as failed since it might be compiled/bundled
    fi

    # Summary
    log "Test Results: $test_passed passed, $test_failed failed"

    if [ $test_failed -eq 0 ]; then
        success "🎉 All tests passed!"
        return 0
    elif [ $test_failed -le 2 ]; then
        warning "⚠️ Some tests failed but deployment appears functional"
        return 0
    else
        error "❌ Multiple tests failed. Deployment may have issues."
        return 1
    fi
}

# Function to show logs with better formatting
show_logs() {
    step "Showing recent container logs..."
    cd "$PROJECT_DIR"

    echo ""
    echo "=== Frontend Container Logs ==="
    docker-compose -p "$COMPOSE_PROJECT" logs --tail=50 frontend || true

    echo ""
    echo "=== Container Statistics ==="
    local container_id=$(docker-compose -p "$COMPOSE_PROJECT" ps -q frontend 2>/dev/null || echo "")
    if [ -n "$container_id" ]; then
        docker stats --no-stream "$container_id" || true
    fi
}

# Function to show deployment status with more details
show_status() {
    step "Deployment Status Report"
    cd "$PROJECT_DIR"

    echo ""
    echo "=== Container Status ==="
    docker-compose -p "$COMPOSE_PROJECT" ps

    echo ""
    echo "=== Resource Usage ==="
    local container_ids=$(docker-compose -p "$COMPOSE_PROJECT" ps -q 2>/dev/null || echo "")
    if [ -n "$container_ids" ]; then
        docker stats --no-stream $container_ids 2>/dev/null || true
    fi

    echo ""
    echo "=== Network Information ==="
    echo "Frontend URL: https://$DOMAIN"
    echo "WWW URL: https://www.$DOMAIN"

    echo ""
    echo "=== Repository Information ==="
    if [ -d "$PROJECT_DIR/.git" ]; then
        cd "$PROJECT_DIR"
        echo "Current branch: $(git branch --show-current 2>/dev/null || echo 'unknown')"
        echo "Last commit: $(git log -1 --oneline 2>/dev/null || echo 'unknown')"
        echo "Repository: $REPO_URL"
    fi

    echo ""
    echo "=== Environment ==="
    echo "Project Directory: $PROJECT_DIR"
    echo "Compose Project: $COMPOSE_PROJECT"
    echo "Supabase URL: $SUPABASE_URL"
    echo "Google Maps API: $(echo $GOOGLE_MAPS_API_KEY | cut -c1-20)..." # Show only first 20 chars for security
    echo "Build Context: $(pwd)"

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
    if [ -d "$backup_path/code" ]; then
        cp -r "$backup_path/code/"* "$PROJECT_DIR/" 2>/dev/null || true
        success "Code restored from backup"
    fi

    # Rebuild and start
    build_containers
    start_containers
    wait_for_services

    if test_deployment; then
        success "Rollback completed successfully!"
    else
        error "Rollback completed but some tests failed"
        show_logs
    fi
}

# Pre-flight checks with enhanced validation
preflight_checks() {
    step "Running pre-flight checks..."

    # Check if running as root or with sudo access
    if [ "$EUID" -ne 0 ] && ! sudo -n true 2>/dev/null; then
        error "This script requires root privileges or passwordless sudo access"
        exit 1
    fi

    # Check required commands
    local commands=("docker" "docker-compose" "git" "curl" "wget")
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

    # Verify Docker Compose version (should work with v1 and v2)
    local compose_version=$(docker-compose version --short 2>/dev/null || echo "unknown")
    log "Docker Compose version: $compose_version"

    # Check nginx-proxy network
    if ! docker network inspect nginx-proxy_default >/dev/null 2>&1; then
        error "nginx-proxy_default network not found. nginx-proxy must be running."
        info "To start nginx-proxy: docker run -d -p 80:80 -p 443:443 --name nginx-proxy --net nginx-proxy_default ..."
        exit 1
    fi

    # Check if nginx-proxy containers are running
    local proxy_containers=$(docker ps --filter "name=nginx-proxy" --format "{{.Names}}" | wc -l)
    if [ "$proxy_containers" -eq 0 ]; then
        warning "No nginx-proxy containers found running!"
        warning "This may cause domain routing issues"
    else
        success "Found $proxy_containers nginx-proxy container(s) running"
    fi

    # Check disk space
    local available_space=$(df "$PROJECT_DIR" 2>/dev/null | awk 'NR==2{print $4}' || echo "0")
    if [ "$available_space" -lt 1048576 ]; then  # Less than 1GB
        warning "Low disk space available: $(($available_space / 1024)) MB"
    fi

    # Check if SSH key exists for git operations
    if [ ! -f ~/.ssh/id_rsa ] && [ ! -f ~/.ssh/id_ed25519 ]; then
        warning "No SSH keys found. Git operations might fail if repository requires authentication"
    fi

    success "Pre-flight checks passed"
}

# Function to check for conflicts
check_conflicts() {
    step "Checking for conflicts with existing services..."

    # Check if old platypus-landing containers are still running on same domains
    local conflicting_containers=$(docker ps --filter "label=com.docker.compose.service=frontend" --format "{{.Names}}" | grep -v "platypus_walk_landing" || true)

    if [ -n "$conflicting_containers" ]; then
        warning "Potential domain conflicts detected with containers:"
        echo "$conflicting_containers"
        warning "These may be using the same domains: $DOMAIN"

        read -p "Do you want to continue anyway? (y/N): " -r
        if [[ ! $REPLY =~ ^[Yy]$ ]]; then
            error "Deployment cancelled due to conflicts"
            exit 1
        fi
    fi

    # Check if port 80 or 443 are bound by other services
    local port_conflicts=$(netstat -tlnp 2>/dev/null | grep -E ":80|:443" | grep -v docker-proxy || true)
    if [ -n "$port_conflicts" ] && [ "$(echo "$port_conflicts" | wc -l)" -gt 2 ]; then
        warning "Detected services binding to ports 80/443 outside Docker:"
        echo "$port_conflicts"
    fi

    success "No critical conflicts detected"
}

# Enhanced main deployment function
main() {
    step "🚀 Starting Platypus Walk Landing Page Deployment"
    log "Timestamp: $(date)"
    log "Branch: $BRANCH"
    log "Project Directory: $PROJECT_DIR"
    log "Domain: $DOMAIN"
    log "Repository: $REPO_URL"

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
        echo ""
        info "🌟 Your Platypus Walk Landing Page is now live at:"
        info "   Primary: https://$DOMAIN"
        info "   WWW: https://www.$DOMAIN"
        echo ""
        show_status
    else
        error "🚨 Deployment completed with issues!"
        show_logs
        warning "Consider running rollback: $0 --rollback"
        exit 1
    fi
}

# Trap to handle script interruption
trap 'error "Script interrupted by user"; exit 1' INT TERM

# Help function with enhanced information
show_help() {
    echo "Platypus Walk Landing Page Deployment Script"
    echo "============================================="
    echo ""
    echo "A comprehensive deployment script for the Vite + React + Supabase landing page."
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
    echo "  -q, --quick       Quick deployment (skip some cleanup steps)"
    echo ""
    echo "Arguments:"
    echo "  BRANCH            Git branch to deploy (default: main)"
    echo ""
    echo "Examples:"
    echo "  $0                           # Deploy main branch"
    echo "  $0 develop                   # Deploy develop branch"
    echo "  $0 feature/new-ui            # Deploy feature branch"
    echo "  $0 --status                  # Show current status"
    echo "  $0 --logs                    # Deploy and show logs"
    echo "  $0 --test                    # Run tests only"
    echo "  $0 --rollback                # Rollback to previous version"
    echo "  $0 --force main              # Force deploy main branch"
    echo ""
    echo "Domains:"
    echo "  Frontend: https://$DOMAIN"
    echo "  WWW: https://www.$DOMAIN"
    echo ""
    echo "Environment:"
    echo "  Repository: $REPO_URL"
    echo "  Project Dir: $PROJECT_DIR"
    echo "  Docker Project: $COMPOSE_PROJECT"
    echo ""
    echo "Prerequisites:"
    echo "  - Docker and docker-compose installed"
    echo "  - nginx-proxy running with nginx-proxy_default network"
    echo "  - SSH access to git repository (if private)"
    echo "  - Sufficient disk space (>1GB recommended)"
    echo ""
    echo "For support, check logs with: docker-compose -p $COMPOSE_PROJECT logs -f"
}

# Parse command line arguments with enhanced options
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
        shift  # Remove -l/--logs from arguments
        BRANCH="${1:-main}"
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
        shift  # Remove -f/--force from arguments
        BRANCH="${1:-main}"
        export FORCE_DEPLOY=1
        main
        ;;
    -q|--quick)
        shift  # Remove -q/--quick from arguments
        BRANCH="${1:-main}"
        export QUICK_DEPLOY=1
        main
        ;;
    *)
        main
        ;;
esac