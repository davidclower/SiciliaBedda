# Sicilia Bedda Website Server
# Starts a simple HTTP server using Python

Write-Host "Starting Sicilia Bedda Website Server..." -ForegroundColor Green
Write-Host ""
Write-Host "Server will be available at: http://localhost:8000" -ForegroundColor Cyan
Write-Host "Press Ctrl+C to stop the server" -ForegroundColor Yellow
Write-Host ""

Set-Location $PSScriptRoot

# Start the server
python -m http.server 8000
