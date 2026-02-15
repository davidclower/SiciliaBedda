# ALWAYS RUN THIS BEFORE COMMITTING
# This ensures ALL files are in git before you commit/push

Write-Host "=== PRE-COMMIT CHECK: Ensuring ALL files are in git ===" -ForegroundColor Cyan
Write-Host ""

& "$PSScriptRoot\FINAL-404-FIX.ps1"

Write-Host ""
Write-Host "=== VERIFICATION ===" -ForegroundColor Cyan
& "$PSScriptRoot\verify-website-files.ps1"
& "$PSScriptRoot\comprehensive-404-check.ps1"

Write-Host ""
Write-Host "If all checks pass, you can now safely commit and push." -ForegroundColor Green
