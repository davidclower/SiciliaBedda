# Set GitHub Pages to deploy from branch "main" (root).
# Requires: $env:GITHUB_TOKEN with repo scope (or fine-grained token with Pages write).
# Run: $env:GITHUB_TOKEN = "your_token"; .\Set-GitHubPagesMain.ps1

$owner = "davidclower"
$repo = "SiciliaBedda"
$token = $env:GITHUB_TOKEN
if (-not $token) {
    Write-Host "No GITHUB_TOKEN set. Open the Pages settings and choose 'main' manually:"
    Write-Host "https://github.com/$owner/$repo/settings/pages"
    Start-Process "https://github.com/$owner/$repo/settings/pages"
    exit 1
}
$body = '{"build_type":"legacy","source":{"branch":"main","path":"/"}}'
$headers = @{
    "Accept" = "application/vnd.github+json"
    "Authorization" = "Bearer $token"
    "X-GitHub-Api-Version" = "2022-11-28"
}
try {
    $r = Invoke-RestMethod -Uri "https://api.github.com/repos/$owner/$repo/pages" -Method Put -Headers $headers -Body $body -ContentType "application/json"
    Write-Host "Pages source set to main (root)."
} catch {
    Write-Host "Error: $_"
    if ($_.Exception.Response.StatusCode -eq 404) { Write-Host "Try creating the Pages site first in the repo Settings." }
    exit 1
}
# Request a new build
try {
    Invoke-RestMethod -Uri "https://api.github.com/repos/$owner/$repo/pages/builds" -Method Post -Headers $headers | Out-Null
    Write-Host "Build requested. Wait 1-2 minutes, then hard-refresh https://siciliabedda.com"
} catch { Write-Host "Build request failed (optional): $_" }
