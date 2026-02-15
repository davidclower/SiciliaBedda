# Pre-commit check wrapper
# Run this before committing to ensure all files are present

Write-Host "Running pre-commit file verification..." -ForegroundColor Cyan
Write-Host ""

& "$PSScriptRoot\verify-website-files.ps1"

if ($LASTEXITCODE -ne 0) {
    Write-Host ""
    Write-Host "PRE-COMMIT CHECK FAILED!" -ForegroundColor Red
    Write-Host "Please fix missing files before committing." -ForegroundColor Red
    Write-Host ""
    Write-Host "To restore files from backups, run:" -ForegroundColor Yellow
    Write-Host "  .\restore-missing-files.ps1" -ForegroundColor Yellow
    exit 1
} else {
    Write-Host ""
    Write-Host "Pre-commit check passed. Safe to commit." -ForegroundColor Green
    exit 0
}
