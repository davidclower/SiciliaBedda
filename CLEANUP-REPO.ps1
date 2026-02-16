# Sicilia Bedda - Repository Cleanup
# Run from project root: .\CLEANUP-REPO.ps1
# Optional: -RemoveDuplicates to delete duplicate HTML/JSON files

param([switch]$RemoveDuplicates)

$root = $PSScriptRoot
$canonical = @('index.html', 'about.html', 'sicily.html', 'parco-madonie.html', 'isnello.html', 'collesano.html', 'castelbuono.html', 'current-restoration.html', 'support-cause.html', 'contact.html', '404.html')

# 1. Ensure current-restoration.html has content (copy from current-restoration 12.html if it has more content)
$src = Join-Path $root 'current-restoration 12.html'
$dst = Join-Path $root 'current-restoration.html'
if (Test-Path $src) {
    $srcSize = (Get-Item $src).Length
    $dstSize = if (Test-Path $dst) { (Get-Item $dst).Length } else { 0 }
    if ($srcSize -gt $dstSize -and $srcSize -gt 5000) {
        Write-Host "Copying current-restoration 12.html -> current-restoration.html (larger file)..."
        Copy-Item $src $dst -Force
    }
}

# 2. Optional: Remove duplicate vercel configs
if ($RemoveDuplicates) {
    Get-ChildItem $root -Filter 'vercel*.json' -File | Where-Object { $_.Name -ne 'vercel.json' } | ForEach-Object {
        Write-Host "Removing: $($_.Name)"
        Remove-Item $_.FullName -Force -ErrorAction SilentlyContinue
    }
}

Write-Host "`nDone. Canonical pages: $($canonical -join ', ')"
Write-Host "To remove duplicate HTML files, delete files matching: * (1)*.html, * (2)*.html, etc. See STRUCTURE.md"
