# FINAL 404 FIX - Ensures ALL files are committed
# Run this before every commit/push to prevent 404 errors

Write-Host "=== FINAL 404 FIX - Ensuring ALL files are committed ===" -ForegroundColor Cyan
Write-Host ""

$projectRoot = $PSScriptRoot
$added = 0

# Critical HTML files
$htmlFiles = @(
    "index.html",
    "support-cause.html",
    "about.html",
    "contact.html",
    "isnello.html",
    "castelbuono.html",
    "collesano.html",
    "parco-madonie.html",
    "sicily.html",
    "current-restoration 12.html"
)

# Critical JS files
$jsFiles = @(
    "language.js",
    "shopping-cart.js",
    "translations.js",
    "translations(1).js"
)

# Critical CSS files
$cssFiles = @(
    "styles.css"
)

# Critical images
$imageFiles = @(
    "SiciliaBedda_Logo.PNG",
    "Isnello_pic1.jpg",
    "isnello.jpg",
    "castelbuono.jpg",
    "collesano.jpg",
    "sicily.jpg",
    "madonie.jpg",
    "Heritage Collection_Table.png",
    "Heritage Collection_Village.png",
    "Heritage Collection_Artisan.png",
    "donation-stone.png",
    "donation-door.png",
    "donation-tile.png",
    "donation-roof.png"
)

# Critical API files
$apiFiles = @(
    "api/create-checkout-session.js",
    "api/contact.js"
)

# Critical config files
$configFiles = @(
    "vercel.json",
    "package.json"
)

# Check and add all files
Write-Host "Checking and adding files to git..." -ForegroundColor Yellow

$allFiles = $htmlFiles + $jsFiles + $cssFiles + $imageFiles + $apiFiles + $configFiles

foreach ($file in $allFiles) {
    $filePath = Join-Path $projectRoot $file
    if (Test-Path $filePath) {
        $inGit = git ls-files $file 2>&1
        if ($inGit -and $inGit -notmatch "error|fatal") {
            Write-Host "  [OK] $file" -ForegroundColor Gray
        } else {
            git add $file 2>&1 | Out-Null
            Write-Host "  [ADDED] $file" -ForegroundColor Green
            $added++
        }
    } else {
        Write-Host "  [NOT FOUND] $file" -ForegroundColor Yellow
    }
}

# Add entire api directory
if (Test-Path (Join-Path $projectRoot "api")) {
    git add api/ 2>&1 | Out-Null
    Write-Host "  [ADDED] api/ directory" -ForegroundColor Green
    $added++
}

Write-Host ""
if ($added -gt 0) {
    Write-Host "Added $added file(s) to git. Please commit and push." -ForegroundColor Yellow
} else {
    Write-Host "All files are already in git." -ForegroundColor Green
}

Write-Host ""
Write-Host "Running verification..." -ForegroundColor Cyan
& "$projectRoot\verify-website-files.ps1"
