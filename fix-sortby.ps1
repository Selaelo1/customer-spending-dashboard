# fix-sortby.ps1
Write-Host "🔧 Fixing SortBy export..." -ForegroundColor Cyan

$typesPath = "src/types/index.ts"

# Read the file
$content = Get-Content $typesPath -Raw

# Check if SortBy exists
if ($content -notmatch "export type SortBy") {
    Write-Host "⚠️  SortBy type missing. Adding now..." -ForegroundColor Yellow
    
    # Create the new utility types section
    $utilityTypes = @"

// Utility Types
export type Period = '7d' | '30d' | '90d' | '1y';
export type SortBy = 'date_desc' | 'date_asc' | 'amount_desc' | 'amount_asc';
"@
    
    # Check if Period already exists
    if ($content -match "export type Period = .*?;") {
        # Replace the existing Period line with both types
        $newContent = $content -replace "export type Period = .*?;", $utilityTypes.Trim()
        Set-Content -Path $typesPath -Value $newContent
        Write-Host "✅ SortBy type added (replaced Period line)!" -ForegroundColor Green
    } else {
        # Add to the end of the file
        $newContent = $content + $utilityTypes
        Set-Content -Path $typesPath -Value $newContent
        Write-Host "✅ Utility types added with SortBy!" -ForegroundColor Green
    }
} else {
    Write-Host "✅ SortBy type already exists!" -ForegroundColor Green
}

# Clear Vite cache
Write-Host "🧹 Clearing Vite cache..." -ForegroundColor Yellow
if (Test-Path "node_modules/.vite") {
    Remove-Item -Recurse -Force "node_modules/.vite"
    Write-Host "✅ Vite cache cleared" -ForegroundColor Green
} else {
    Write-Host "✅ No Vite cache to clear" -ForegroundColor Green
}

Write-Host "`n🚀 Restarting dev server..." -ForegroundColor Cyan
npm run dev