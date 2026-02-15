# Comprehensive 404 Check Script
# Checks ALL referenced files in HTML to prevent 404 errors

Write-Host "=== COMPREHENSIVE 404 CHECK ===" -ForegroundColor Cyan
Write-Host ""

$projectRoot = $PSScriptRoot
$errors = @()
$warnings = @()

# Get all HTML files
$htmlFiles = Get-ChildItem -Path $projectRoot -Filter "*.html" | Where-Object { 
    $_.Name -notmatch ' \d+\.html$' -and $_.Name -notmatch '\(1\)' -and $_.Name -ne 'test.html'
}

Write-Host "Checking $($htmlFiles.Count) HTML files for missing resources..." -ForegroundColor Yellow
Write-Host ""

foreach ($htmlFile in $htmlFiles) {
    Write-Host "Checking: $($htmlFile.Name)" -ForegroundColor Cyan
    $content = Get-Content $htmlFile.FullName -Raw
    
    # Check script sources
    $scriptPattern = 'src=["'']([^"'']+\.js)["'']'
    $scriptMatches = [regex]::Matches($content, $scriptPattern)
    foreach ($match in $scriptMatches) {
        $scriptFile = $match.Groups[1].Value
        # Skip CDN URLs
        if ($scriptFile -notmatch '^https?://') {
            $scriptPath = Join-Path $projectRoot $scriptFile
            if (-not (Test-Path $scriptPath)) {
                $errors += "$($htmlFile.Name) -> Missing script: $scriptFile"
                Write-Host "  [ERROR] Missing script: $scriptFile" -ForegroundColor Red
            }
        }
    }
    
    # Check image sources
    $imgPattern = 'src=["'']([^"'']+\.(jpg|jpeg|png|PNG|JPG|JPEG|gif|GIF|svg|SVG))["'']'
    $imgMatches = [regex]::Matches($content, $imgPattern)
    foreach ($match in $imgMatches) {
        $imgFile = $match.Groups[1].Value
        # Skip data URIs and CDN URLs
        if ($imgFile -notmatch '^data:' -and $imgFile -notmatch '^https?://') {
            $imgPath = Join-Path $projectRoot $imgFile
            if (-not (Test-Path $imgPath)) {
                $errors += "$($htmlFile.Name) -> Missing image: $imgFile"
                Write-Host "  [ERROR] Missing image: $imgFile" -ForegroundColor Red
            }
        }
    }
    
    # Check CSS links
    $cssPattern = 'href=["'']([^"'']+\.css)["'']'
    $cssMatches = [regex]::Matches($content, $cssPattern)
    foreach ($match in $cssMatches) {
        $cssFile = $match.Groups[1].Value
        if ($cssFile -notmatch '^https?://') {
            $cssPath = Join-Path $projectRoot $cssFile
            if (-not (Test-Path $cssPath)) {
                $errors += "$($htmlFile.Name) -> Missing CSS: $cssFile"
                Write-Host "  [ERROR] Missing CSS: $cssFile" -ForegroundColor Red
            }
        }
    }
    
    # Check internal HTML links (non-external)
    $linkPattern = 'href=["'']([^"'']+\.html[^"'']*)["'']'
    $linkMatches = [regex]::Matches($content, $linkPattern)
    foreach ($match in $linkMatches) {
        $linkFile = $match.Groups[1].Value
        # Extract just the filename (before #)
        $linkFile = $linkFile -replace '#.*$', ''
        if ($linkFile -notmatch '^https?://' -and $linkFile -ne '') {
            $linkPath = Join-Path $projectRoot $linkFile
            if (-not (Test-Path $linkPath)) {
                $errors += "$($htmlFile.Name) -> Missing HTML link: $linkFile"
                Write-Host "  [ERROR] Missing HTML link: $linkFile" -ForegroundColor Red
            }
        }
    }
}

# Check API files exist
Write-Host ""
Write-Host "Checking API files..." -ForegroundColor Yellow
$apiFiles = @("api\create-checkout-session.js", "api\contact.js")
foreach ($apiFile in $apiFiles) {
    $apiPath = Join-Path $projectRoot $apiFile
    if (-not (Test-Path $apiPath)) {
        $errors += "Missing API file: $apiFile"
        Write-Host "  [ERROR] Missing: $apiFile" -ForegroundColor Red
    } else {
        Write-Host "  [OK] $apiFile" -ForegroundColor Green
    }
}

# Summary
Write-Host ""
Write-Host "=" * 60 -ForegroundColor Cyan
if ($errors.Count -eq 0) {
    Write-Host "SUCCESS: No missing files found!" -ForegroundColor Green
    Write-Host "All referenced resources are present." -ForegroundColor Green
    exit 0
} else {
    Write-Host "ERRORS FOUND: $($errors.Count) missing file(s)!" -ForegroundColor Red
    Write-Host ""
    Write-Host "Missing files:" -ForegroundColor Red
    foreach ($err in $errors) {
        Write-Host "  - $err" -ForegroundColor Red
    }
    Write-Host ""
    Write-Host "Please fix these before deploying!" -ForegroundColor Red
    exit 1
}
