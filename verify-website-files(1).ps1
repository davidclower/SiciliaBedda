# Website File Verification Script
# This script checks that all critical files exist before committing/pushing

Write-Host "Verifying critical website files..." -ForegroundColor Cyan
Write-Host ""

$projectRoot = $PSScriptRoot
$errors = @()
$warnings = @()

# Critical HTML files that must exist
$criticalHtmlFiles = @(
    "index.html",
    "about.html",
    "contact.html",
    "support-cause.html",
    "castelbuono.html",
    "collesano.html",
    "isnello.html",
    "parco-madonie.html",
    "sicily.html",
    "current-restoration 12.html"
)

# Critical JavaScript files
$criticalJsFiles = @(
    "language.js",
    "translations.js",
    "shopping-cart.js"
)

# Critical CSS files
$criticalCssFiles = @(
    "styles.css"
)

# Critical image files (check if referenced)
$criticalImages = @(
    "SiciliaBedda_Logo.PNG"
)

# Critical API files
$criticalApiFiles = @(
    "api\create-checkout-session.js",
    "api\contact.js"
)

# Check HTML files
Write-Host "Checking HTML files..." -ForegroundColor Yellow
foreach ($file in $criticalHtmlFiles) {
    $path = Join-Path $projectRoot $file
    if (-not (Test-Path $path)) {
        $errors += "MISSING: $file"
        Write-Host "  [ERROR] Missing: $file" -ForegroundColor Red
    } else {
        Write-Host "  [OK] $file" -ForegroundColor Green
    }
}

# Check JavaScript files
Write-Host ""
Write-Host "Checking JavaScript files..." -ForegroundColor Yellow
foreach ($file in $criticalJsFiles) {
    $path = Join-Path $projectRoot $file
    if (-not (Test-Path $path)) {
        $errors += "MISSING: $file"
        Write-Host "  [ERROR] Missing: $file" -ForegroundColor Red
    } else {
        Write-Host "  [OK] $file" -ForegroundColor Green
    }
}

# Check CSS files
Write-Host ""
Write-Host "Checking CSS files..." -ForegroundColor Yellow
foreach ($file in $criticalCssFiles) {
    $path = Join-Path $projectRoot $file
    if (-not (Test-Path $path)) {
        $errors += "MISSING: $file"
        Write-Host "  [ERROR] Missing: $file" -ForegroundColor Red
    } else {
        Write-Host "  [OK] $file" -ForegroundColor Green
    }
}

# Check API files
Write-Host ""
Write-Host "Checking API files..." -ForegroundColor Yellow
foreach ($file in $criticalApiFiles) {
    $path = Join-Path $projectRoot $file
    if (-not (Test-Path $path)) {
        $errors += "MISSING: $file"
        Write-Host "  [ERROR] Missing: $file" -ForegroundColor Red
    } else {
        Write-Host "  [OK] $file" -ForegroundColor Green
    }
}

# Check critical images
Write-Host ""
Write-Host "Checking critical images..." -ForegroundColor Yellow
foreach ($file in $criticalImages) {
    $path = Join-Path $projectRoot $file
    if (-not (Test-Path $path)) {
        $warnings += "MISSING: $file"
        Write-Host "  [WARNING] Missing: $file" -ForegroundColor Yellow
    } else {
        Write-Host "  [OK] $file" -ForegroundColor Green
    }
}

# Check for translations(1).js (referenced in HTML files)
Write-Host ""
Write-Host "Checking referenced translation files..." -ForegroundColor Yellow
$translationsFile = Join-Path $projectRoot "translations(1).js"
if (-not (Test-Path $translationsFile)) {
    $warnings += "MISSING: translations(1).js (referenced in HTML files)"
    Write-Host "  [WARNING] Missing: translations(1).js" -ForegroundColor Yellow
} else {
    Write-Host "  [OK] translations(1).js" -ForegroundColor Green
}

# Summary
Write-Host ""
Write-Host "=" * 60 -ForegroundColor Cyan
if ($errors.Count -eq 0 -and $warnings.Count -eq 0) {
    Write-Host "SUCCESS: All critical files are present!" -ForegroundColor Green
    exit 0
} else {
    if ($errors.Count -gt 0) {
        Write-Host "ERRORS FOUND: $($errors.Count) critical file(s) missing!" -ForegroundColor Red
        Write-Host ""
        Write-Host "Missing files:" -ForegroundColor Red
        foreach ($err in $errors) {
            Write-Host "  - $err" -ForegroundColor Red
        }
    }
    if ($warnings.Count -gt 0) {
        Write-Host ""
        Write-Host "WARNINGS: $($warnings.Count) file(s) missing (may cause issues):" -ForegroundColor Yellow
        foreach ($warning in $warnings) {
            Write-Host "  - $warning" -ForegroundColor Yellow
        }
    }
    Write-Host ""
    Write-Host "Please restore missing files before committing!" -ForegroundColor Red
    exit 1
}
