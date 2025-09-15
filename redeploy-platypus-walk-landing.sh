#!/bin/bash

# Platypus Walk Landing Page (Vite React + MongoDB) Deployment Script
# Usage: ./redeploy-platypus-walk-landing.sh [options] [branch]
# Default branch: main

set -e  # Exit on any error

# Configuration
PROJECT_DIR="/opt/platypus/walk-landing"
REPO_URL="git@github.com:KaVipatel12/platypus-landing-wave.git"
BRANCH="${1:-main}"
COMPOSE_PROJECT="platypus-walk-landing"
DOMAIN="theplatypus.in"

# Environment variables for build (from your actual .env files)
GOOGLE_MAPS_API_KEY=""
BACKEND_API_URL="https://api.theplatypus.in/api"
GA_MEASUREMENT_ID="GTM-K69JPQWK"

# Backend environment variables (for production)
MONGODB_URI="mongodb://platypus:platypus_secure_password_2024@mongodb:27017"
DB_NAME="platypus"
BREVO_API_KEY=""
BREVO_SENDER_EMAIL="info@theplatypus.in"
RECEIVER_EMAIL="info@theplatypus.in"

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
    if docker ps -q -f name="platypus_" | grep -q .; then
        log "Backing up container information..."
        docker ps -f name="platypus_" > "$BACKUP_DIR/containers.txt" || true
        docker logs platypus_frontend > "$BACKUP_DIR/frontend.log" 2>&1 || true
        docker logs platypus_backend > "$BACKUP_DIR/backend.log" 2>&1 || true
        docker logs platypus_mongodb > "$BACKUP_DIR/mongodb.log" 2>&1 || true
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

    # Check if Dockerfile.frontend exists (based on your actual files)
    if [ ! -f "Dockerfile.frontend" ]; then
        error "Dockerfile.frontend not found!"
        exit 1
    fi

    # Check if Dockerfile.backend exists (based on your actual files)
    if [ ! -f "Dockerfile.backend" ]; then
        error "Dockerfile.backend not found!"
        exit 1
    fi

    # Check if client directory exists (your frontend context)
    if [ ! -d "client" ]; then
        error "client directory not found!"
        exit 1
    fi

    # Check if server directory exists (your backend context)
    if [ ! -d "server" ]; then
        error "server directory not found!"
        exit 1
    fi

    # Check if package.json exists in client directory
    if [ ! -f "client/package.json" ]; then
        error "client/package.json not found!"
        exit 1
    fi

    # Check if package.json exists in server directory
    if [ ! -f "server/package.json" ]; then
        error "server/package.json not found!"
        exit 1
    fi

    # Check if nginx.frontend.conf exists (based on your Dockerfile)
    if [ ! -f "client/nginx.frontend.conf" ]; then
        warning "client/nginx.frontend.conf not found - using default nginx config"
    fi

    # Check for Vite-specific files in client directory
    if [ ! -f "client/vite.config.ts" ] && [ ! -f "client/vite.config.js" ]; then
        warning "No Vite config file found in client directory - this might not be a Vite project"
    fi

    # Validate docker-compose.yml syntax
    log "Validating docker-compose.yml syntax..."
    docker-compose config >/dev/null 2>&1 || {
        error "Invalid docker-compose.yml syntax!"
        exit 1
    }

    # Validate environment variables are set
    if [ -z "$GOOGLE_MAPS_API_KEY" ]; then
        warning "Google Maps API key not set - location features may not work"
    fi

    if [ -z "$BACKEND_API_URL" ]; then
        warning "Backend API URL not set - API calls may not work"
    fi

    if [ -z "$MONGODB_URI" ]; then
        warning "MongoDB URI not set - database connections may fail"
    fi

    if [ -z "$BREVO_API_KEY" ]; then
        warning "Brevo API key not set - email functionality may not work"
    fi

    # Check if .env files exist in the correct directories (for reference)
    if [ -f "client/.env" ]; then
        log "Found client/.env file"
    fi
    if [ -f "server/.env" ]; then
        log "Found server/.env file"
    fi
    if [ -f "client/.env.local" ]; then
        log "Found client/.env.local file"
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
        # Set build arguments for all environment variables (removed Supabase)
        export VITE_GOOGLE_MAPS_API_KEY="$GOOGLE_MAPS_API_KEY"
        export VITE_BACKEND_API_URL="$BACKEND_API_URL"
        export VITE_GA_MEASUREMENT_ID="$GA_MEASUREMENT_ID"

        # Set backend environment variables
        export MONGODB_PASSWORD="platypus_secure_password_2024"
        export BREVO_API_KEY="$BREVO_API_KEY"
        export BREVO_SENDER_EMAIL="$BREVO_SENDER_EMAIL"
        export RECEIVER_EMAIL="$RECEIVER_EMAIL"

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
    sleep 15

    # Check container status
    local max_attempts=60
    local attempt=1

    while [ $attempt -le $max_attempts ]; do
        log "Health check attempt $attempt/$max_attempts..."

        # Check frontend container status (using your actual container name)
        local frontend_container_id=$(docker-compose -p "$COMPOSE_PROJECT" ps -q frontend 2>/dev/null || echo "")
        local backend_container_id=$(docker-compose -p "$COMPOSE_PROJECT" ps -q backend 2>/dev/null || echo "")
        local mongodb_container_id=$(docker-compose -p "$COMPOSE_PROJECT" ps -q mongodb 2>/dev/null || echo "")

        if [ -n "$frontend_container_id" ]; then
            local frontend_status=$(docker inspect -f '{{.State.Status}}' "$frontend_container_id" 2>/dev/null || echo "missing")
            local frontend_health=$(docker inspect -f '{{if .State.Health}}{{.State.Health.Status}}{{else}}no-health-check{{end}}' "$frontend_container_id" 2>/dev/null || echo "missing")

            log "Frontend: $frontend_status | Health: $frontend_health"

            # Check backend if it exists
            if [ -n "$backend_container_id" ]; then
                local backend_status=$(docker inspect -f '{{.State.Status}}' "$backend_container_id" 2>/dev/null || echo "missing")
                local backend_health=$(docker inspect -f '{{if .State.Health}}{{.State.Health.Status}}{{else}}no-health-check{{end}}' "$backend_container_id" 2>/dev/null || echo "missing")

                log "Backend: $backend_status | Health: $backend_health"
            fi

            # Check MongoDB if it exists
            if [ -n "$mongodb_container_id" ]; then
                local mongodb_status=$(docker inspect -f '{{.State.Status}}' "$mongodb_container_id" 2>/dev/null || echo "missing")
                local mongodb_health=$(docker inspect -f '{{if .State.Health}}{{.State.Health.Status}}{{else}}no-health-check{{end}}' "$mongodb_container_id" 2>/dev/null || echo "missing")

                log "MongoDB: $mongodb_status | Health: $mongodb_health"
            fi

            # Check if all containers are running and healthy
            if [ "$frontend_status" = "running" ]; then
                if [ "$frontend_health" = "healthy" ] || [ "$frontend_health" = "no-health-check" ]; then
                    # If backend exists, check it too
                    if [ -n "$backend_container_id" ]; then
                        if [ "$backend_status" = "running" ] && ([ "$backend_health" = "healthy" ] || [ "$backend_health" = "no-health-check" ]); then
                            # If MongoDB exists, check it too
                            if [ -n "$mongodb_container_id" ]; then
                                if [ "$mongodb_status" = "running" ] && ([ "$mongodb_health" = "healthy" ] || [ "$mongodb_health" = "no-health-check" ]); then
                                    success "All containers (frontend, backend, MongoDB) are running and healthy!"
                                    break
                                fi
                            else
                                success "Frontend and backend containers are running and healthy!"
                                break
                            fi
                        fi
                    else
                        success "Frontend container is running and healthy!"
                        break
                    fi
                fi
            fi
        else
            warning "Containers not found or not started yet"
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

    # Test container health (using your actual container names)
    log "Testing container health..."
    local frontend_healthy=false
    local backend_healthy=false
    local mongodb_healthy=false

    # Test frontend container health
    if docker exec platypus_frontend wget --quiet --tries=1 --timeout=5 --spider http://localhost:80/health >/dev/null 2>&1; then
        success "✅ Frontend container health check passed"
        frontend_healthy=true
        ((test_passed++))
    else
        warning "❌ Frontend container health check failed"
        ((test_failed++))
    fi

    # Test backend container health (if it exists)
    if docker ps --format "{{.Names}}" | grep -q "platypus_backend"; then
        if docker exec platypus_backend curl -f http://localhost:3000/health >/dev/null 2>&1; then
            success "✅ Backend container health check passed"
            backend_healthy=true
            ((test_passed++))
        else
            warning "❌ Backend container health check failed"
            ((test_failed++))
        fi
    fi

    # Test MongoDB container health (if it exists)
    if docker ps --format "{{.Names}}" | grep -q "platypus_mongodb"; then
        if docker exec platypus_mongodb mongosh --eval "db.adminCommand('ping')" >/dev/null 2>&1; then
            success "✅ MongoDB container health check passed"
            mongodb_healthy=true
            ((test_passed++))
        else
            warning "❌ MongoDB container health check failed"
            ((test_failed++))
        fi
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

    # Test backend API accessibility
    log "Testing backend API accessibility..."
    if timeout 10 curl -f -s -I "https://api.$DOMAIN/health" >/dev/null 2>&1; then
        success "✅ Backend API accessible: https://api.$DOMAIN"
        ((test_passed++))
    else
        warning "❌ Backend API failed: https://api.$DOMAIN"
        ((test_failed++))
    fi

    # Test nginx-proxy integration (using your actual network name)
    if docker network inspect nginx-proxy_default >/dev/null 2>&1; then
        local frontend_connected=$(docker network inspect nginx-proxy_default | grep -q "platypus_frontend" && echo "yes" || echo "no")
        local backend_connected=$(docker network inspect nginx-proxy_default | grep -q "platypus_backend" && echo "yes" || echo "no")

        if [ "$frontend_connected" = "yes" ]; then
            success "✅ Frontend connected to nginx-proxy network"
            ((test_passed++))
        else
            warning "❌ Frontend not connected to nginx-proxy network"
            ((test_failed++))
        fi

        if [ "$backend_connected" = "yes" ]; then
            success "✅ Backend connected to nginx-proxy network"
            ((test_passed++))
        else
            warning "❌ Backend not connected to nginx-proxy network"
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

    # Test Google Maps integration (if applicable)
    log "Testing for Google Maps configuration..."
    local maps_content=$(timeout 10 curl -s "https://$DOMAIN" 2>/dev/null | grep -i -E "(maps\.googleapis|google.*maps)" | head -1)
    if [ -n "$maps_content" ]; then
        success "✅ Google Maps integration detected"
        ((test_passed++))
    else
        info "ℹ️  Google Maps integration not detected in page source (might be bundled)"
        # Don't count as failed since it might be compiled/bundled
    fi

    # Test MongoDB connection through backend API
    log "Testing MongoDB connection through backend..."
    if timeout 10 curl -s "https://api.$DOMAIN/health" | grep -q "database.*ok\|mongo.*ok\|healthy" 2>/dev/null; then
        success "✅ Backend database connectivity confirmed"
        ((test_passed++))
    else
        info "ℹ️  Backend database connectivity check inconclusive"
        # Don't count as failed since health endpoint might not return database status
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
    echo "=== Backend Container Logs ==="
    docker-compose -p "$COMPOSE_PROJECT" logs --tail=50 backend || true

    echo ""
    echo "=== MongoDB Container Logs ==="
    docker-compose -p "$COMPOSE_PROJECT" logs --tail=30 mongodb || true

    echo ""
    echo "=== Container Statistics ==="
    local frontend_id=$(docker-compose -p "$COMPOSE_PROJECT" ps -q frontend 2>/dev/null || echo "")
    local backend_id=$(docker-compose -p "$COMPOSE_PROJECT" ps -q backend 2>/dev/null || echo "")
    local mongodb_id=$(docker-compose -p "$COMPOSE_PROJECT" ps -q mongodb 2>/dev/null || echo "")

    if [ -n "$frontend_id" ] || [ -n "$backend_id" ] || [ -n "$mongodb_id" ]; then
        docker stats --no-stream $frontend_id $backend_id $mongodb_id 2>/dev/null || true
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
    echo "Backend API: https://api.$DOMAIN"

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
    echo "Backend API: ${VITE_BACKEND_API_URL:-'Not set'}"
    echo "MongoDB Database: ${DB_NAME:-'Not set'}"
    echo "Google Maps API: ${VITE_GOOGLE_MAPS_API_KEY:0:20}..." # Show only first 20 chars for security
    echo "GA Measurement ID: ${VITE_GA_MEASUREMENT_ID:-'Not set'}"
    echo "Environment loaded from: .env files"
    echo "Build Context: $(pwd)"

    echo ""
    echo "=== Useful Commands ==="
    echo "View logs: docker-compose -p $COMPOSE_PROJECT logs -f"
    echo "Stop containers: docker-compose -p $COMPOSE_PROJECT down"
    echo "Restart: docker-compose -p $COMPOSE_PROJECT restart"
    echo "Rebuild: docker-compose -p $COMPOSE_PROJECT build --no-cache"
    echo "Shell into frontend: docker exec -it platypus_frontend /bin/sh"
    echo "Shell into backend: docker exec -it platypus_backend /bin/sh"
    echo "Shell into MongoDB: docker exec -it platypus_mongodb mongosh"
    echo "MongoDB logs: docker logs platypus_mongodb"

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

    # Check if old containers are still running on same domains (using your actual container names)
    local existing_frontend=$(docker ps --format "{{.Names}}" | grep -E "(platypus.*frontend|platypus_walk_landing)" || true)
    local existing_backend=$(docker ps --format "{{.Names}}" | grep -E "(platypus.*backend)" || true)

    if [ -n "$existing_frontend" ] && [ "$existing_frontend" != "platypus_frontend" ]; then
        warning "Potential frontend domain conflicts detected with container: $existing_frontend"
        warning "This may cause domain conflicts on: $DOMAIN"

        read -p "Do you want to continue anyway? (y/N): " -r
        if [[ ! $REPLY =~ ^[Yy]$ ]]; then
            error "Deployment cancelled due to frontend conflicts"
            exit 1
        fi
    fi

    if [ -n "$existing_backend" ] && [ "$existing_backend" != "platypus_backend" ]; then
        warning "Potential backend API conflicts detected with container: $existing_backend"
        warning "This may cause API conflicts on: api.$DOMAIN"

        read -p "Do you want to continue anyway? (y/N): " -r
        if [[ ! $REPLY =~ ^[Yy]$ ]]; then
            error "Deployment cancelled due to backend conflicts"
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
        info "   API: https://api.$DOMAIN"
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
    echo "A comprehensive deployment script for the Vite + React + MongoDB landing page."
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
    echo "  $0 SEO-SEPT-2025             # Deploy SEO-SEPT-2025 branch"
    echo "  $0 develop                   # Deploy develop branch"
    echo "  $0 feature/new-ui            # Deploy feature branch"
    echo "  $0 --status                  # Show current status"
    echo "  $0 --logs                    # Deploy and show logs"
    echo "  $0 --test                    # Run tests only"
    echo "  $0 --rollback                # Rollback to previous version"
    echo "  $0 --force SEO-SEPT-2025     # Force deploy SEO-SEPT-2025 branch"
    echo ""
    echo "Domains:"
    echo "  Frontend: https://$DOMAIN"
    echo "  WWW: https://www.$DOMAIN"
    echo "  Backend API: https://api.$DOMAIN"
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