# docker-deploy.ps1
Write-Host "🐳 Capitec Dashboard Docker Deploy" -ForegroundColor Cyan
Write-Host "====================================" -ForegroundColor Cyan

# Step 1: Clean up old containers
Write-Host "`n🧹 Cleaning up old containers..." -ForegroundColor Yellow
docker stop capitec-dash 2>$null
docker rm capitec-dash 2>$null
docker rmi capitec-dashboard 2>$null

# Step 2: Install dependencies locally
Write-Host "`n📦 Installing dependencies..." -ForegroundColor Yellow
npm install

# Step 3: Test local build
Write-Host "`n🔨 Testing local build..." -ForegroundColor Yellow
npm run build

if ($LASTEXITCODE -ne 0) {
    Write-Host "❌ Local build failed!" -ForegroundColor Red
    exit 1
}
Write-Host "✅ Local build successful!" -ForegroundColor Green

# Step 4: Build Docker image
Write-Host "`n🏗️ Building Docker image..." -ForegroundColor Yellow
docker build -t capitec-dashboard .

if ($LASTEXITCODE -ne 0) {
    Write-Host "❌ Docker build failed!" -ForegroundColor Red
    exit 1
}
Write-Host "✅ Docker build successful!" -ForegroundColor Green

# Step 5: Run container
Write-Host "`n🚀 Starting container..." -ForegroundColor Yellow
docker run -d -p 8080:80 --name capitec-dash capitec-dashboard

if ($LASTEXITCODE -ne 0) {
    Write-Host "❌ Failed to start container!" -ForegroundColor Red
    exit 1
}
Write-Host "✅ Container started!" -ForegroundColor Green

# Step 6: Check status
Write-Host "`n📋 Container status:" -ForegroundColor Cyan
docker ps

# Step 7: Show logs
Write-Host "`n📝 Container logs:" -ForegroundColor Cyan
Start-Sleep -Seconds 3
docker logs capitec-dash

# Step 8: Test connection
Write-Host "`n🌐 Testing connection..." -ForegroundColor Yellow
try {
    $response = Invoke-WebRequest -Uri "http://localhost:8080" -UseBasicParsing -TimeoutSec 5
    if ($response.StatusCode -eq 200) {
        Write-Host "✅ Dashboard is running at http://localhost:8080" -ForegroundColor Green
        Start-Process "http://localhost:8080"
    }
} catch {
    Write-Host "⚠️ Container is running but not responding yet" -ForegroundColor Yellow
    Write-Host "   Try opening manually: http://localhost:8080" -ForegroundColor White
}

# Step 9: Helpful commands
Write-Host "`n📌 Useful commands:" -ForegroundColor Cyan
Write-Host "   View logs: docker logs -f capitec-dash" -ForegroundColor White
Write-Host "   Stop container: docker stop capitec-dash" -ForegroundColor White
Write-Host "   Start container: docker start capitec-dash" -ForegroundColor White
Write-Host "   Remove container: docker rm capitec-dash" -ForegroundColor White
Write-Host "   Bash into container: docker exec -it capitec-dash sh" -ForegroundColor White