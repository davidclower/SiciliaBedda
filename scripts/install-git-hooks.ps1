# Install git hooks so push/fetch keep working (removes invalid refs automatically).
# Run once per clone: .\scripts\install-git-hooks.ps1

$ErrorActionPreference = "Stop"
$root = (Get-Location)
if (-not (git rev-parse --is-inside-work-tree 2>$null)) {
    Write-Error "Not a git repository. Run from repo root."
    exit 1
}
$hooksDir = Join-Path $root ".git\hooks"
$prePush = Join-Path $hooksDir "pre-push"
$source = Join-Path $root "scripts\pre-push-hook"
Copy-Item -LiteralPath $source -Destination $prePush -Force
Write-Host "Installed pre-push hook. Invalid refs will be cleaned before each push."
