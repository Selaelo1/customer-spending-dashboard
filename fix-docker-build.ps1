# fix-docker-build.ps1
Write-Host "🐳 Fixing Docker build..." -ForegroundColor Cyan

# Update package.json to use Vite 5
$packagePath = "package.json"
$packageJson = Get-Content $packagePath -Raw | ConvertFrom-Json

# Downgrade Vite to v5
$packageJson.devDependencies.vite = "^5.4.0"

# Remove terser if present
if ($packageJson.devDependencies.PSObject.Properties.Name -contains "terser") {
    $packageJson.devDependencies.PSObject.Properties.Remove("terser")
}

# Save package.json
$packageJson | ConvertTo-Json -Depth 10 | Set-Content $packagePath
Write-Host "✅ package.json updated (Vite 5)" -ForegroundColor Green

# Update vite.config.ts
$viteConfig = @'
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
    host: true,
    open: true
  },
  build: {
    outDir: 'dist',
    sourcemap: false,
    minify: 'esbuild',
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom'],
          icons: ['lucide-react'],
          charts: ['recharts'],
          utils: ['date-fns']
        }
      }
    }
  }
});
'@
Set-Content -Path "vite.config.ts" -Value $viteConfig
Write-Host "✅ vite.config.ts updated (using esbuild)" -ForegroundColor Green

# Create new Dockerfile
$dockerfile = @'
FROM node:20-alpine AS builder

WORKDIR /app

COPY package*.json ./
COPY tsconfig*.json ./
COPY vite.config.ts ./
COPY tailwind.config.js ./
COPY postcss.config.js ./
COPY index.html ./

RUN npm install

COPY src ./src
COPY public ./public

RUN npm run build

FROM nginx:alpine

COPY --from=builder /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
'@
Set-Content -Path "Dockerfile" -Value $dockerfile
Write-Host "✅ Dockerfile updated (Node.js 20)" -ForegroundColor Green

# Clean up
Write-Host "`n🧹 Cleaning up..." -ForegroundColor Yellow
docker stop capitec-dash 2>$null
docker rm capitec-dash 2>$null
docker rmi capitec-dashboard 2>$null

# Install dependencies locally first
Write-Host "`n📦 Installing dependencies..." -ForegroundColor Yellow
npm install

# Build Docker image
Write-Host "`n🏗️ Building Docker image..." -ForegroundColor Yellow
docker build -t capitec-dashboard .

# Run container
Write-Host "`n🚀 Running container..." -ForegroundColor Yellow
docker run -d -p 8080:80 --name capitec-dash capitec-dashboard

# Check status
Write-Host "`n✅ Container status:" -ForegroundColor Green
docker ps

Write-Host "`n📋 Container logs:" -ForegroundColor Cyan
Start-Sleep -Seconds 2
docker logs capitec-dash

Write-Host "`n✨ Dashboard should be running at: http://localhost:8080" -ForegroundColor Magenta
start "http://localhost:8080"