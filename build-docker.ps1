# build-docker.ps1
Write-Host "🐳 Building Capitec Dashboard Docker image..." -ForegroundColor Cyan

# Stop and remove existing container/image
Write-Host "`n🧹 Cleaning up old containers..." -ForegroundColor Yellow
docker stop capitec-dash 2>$null
docker rm capitec-dash 2>$null
docker rmi capitec-dashboard 2>$null

# Build the image
Write-Host "`n📦 Building image..." -ForegroundColor Yellow
docker build -t capitec-dashboard .

# Check if build succeeded
if ($LASTEXITCODE -ne 0) {
    Write-Host "❌ Docker build failed!" -ForegroundColor Red
    exit 1
}

# Run the container
Write-Host "`n🚀 Starting container..." -ForegroundColor Yellow
docker run -d -p 8080:80 --name capitec-dash capitec-dashboard

# Check if container started
if ($LASTEXITCODE -ne 0) {
    Write-Host "❌ Failed to start container!" -ForegroundColor Red
    exit 1
}

# Wait for container to be ready
Start-Sleep -Seconds 3

# Check status
Write-Host "`n✅ Container status:" -ForegroundColor Green
docker ps

# Show logs
Write-Host "`n📋 Container logs:" -ForegroundColor Cyan
docker logs capitec-dash

# Test if container is responding
try {
    $response = Invoke-WebRequest -Uri "http://localhost:8080" -UseBasicParsing -TimeoutSec 5
    if ($response.StatusCode -eq 200) {
        Write-Host "`n✨ Dashboard is ready at: http://localhost:8080" -ForegroundColor Magenta
        Start-Process "http://localhost:8080"
    }
} catch {
    Write-Host "`n⚠️  Container is running but not responding yet. Check logs above." -ForegroundColor Yellow
    Write-Host "   Try accessing manually: http://localhost:8080" -ForegroundColor White
}