# Restore Missing Files Script
# Automatically restores main HTML/JS files from numbered backups

Write-Host "Restoring missing files from backups..." -ForegroundColor Cyan
Write-Host ""

$projectRoot = $PSScriptRoot
$restored = @()

# Map of main files to their backup patterns
$fileMappings = @{
    "index.html" = @("index 3.html", "index 2.html")
    "support-cause.html" = @("support-cause 48.html", "support-cause 47.html", "support-cause 46.html", "support-cause 45.html", "support-cause 44.html", "support-cause 43.html", "support-cause 42.html", "support-cause 41.html", "support-cause 40.html", "support-cause 39.html", "support-cause 38.html", "support-cause 37.html", "support-cause 36.html", "support-cause 35.html", "support-cause 34.html", "support-cause 33.html", "support-cause 32.html", "support-cause 31.html", "support-cause 30.html", "support-cause 29.html", "support-cause 28.html", "support-cause 27.html", "support-cause 26.html", "support-cause 25.html", "support-cause 24.html", "support-cause 23.html", "support-cause 22.html", "support-cause 21.html", "support-cause 20.html", "support-cause 19.html", "support-cause 18.html", "support-cause 17.html", "support-cause 16.html", "support-cause 15.html", "support-cause 14.html", "support-cause 13.html", "support-cause 12.html", "support-cause 11.html", "support-cause 10.html", "support-cause 9.html", "support-cause 8.html", "support-cause 7.html", "support-cause 6.html", "support-cause 5.html", "support-cause 4.html", "support-cause 3.html", "support-cause 2.html")
    "about.html" = @("about 2.html")
    "contact.html" = @("contact 2.html")
    "castelbuono.html" = @("castelbuono 2.html")
    "collesano.html" = @("collesano 2.html")
    "parco-madonie.html" = @("parco-madonie 2.html")
    "sicily.html" = @("sicily 2.html")
    "current-restoration 12.html" = @("current-restoration 13.html")
    "language.js" = @("language 2.js")
    "translations(1).js" = @("translations(1) 44.js", "translations(1) 43.js", "translations(1) 42.js", "translations(1) 41.js", "translations(1) 40.js", "translations(1) 39.js", "translations(1) 38.js", "translations(1) 37.js", "translations(1) 36.js", "translations(1) 35.js", "translations(1) 34.js", "translations(1) 33.js", "translations(1) 32.js", "translations(1) 31.js", "translations(1) 30.js", "translations(1) 29.js", "translations(1) 28.js", "translations(1) 27.js", "translations(1) 26.js", "translations(1) 25.js", "translations(1) 24.js", "translations(1) 23.js", "translations(1) 22.js", "translations(1) 21.js", "translations(1) 20.js", "translations(1) 19.js", "translations(1) 18.js", "translations(1) 17.js", "translations(1) 16.js", "translations(1) 15.js", "translations(1) 14.js", "translations(1) 13.js", "translations(1) 11.js", "translations(1) 10.js", "translations(1) 9.js", "translations(1) 8.js", "translations(1) 7.js", "translations(1) 6.js", "translations(1) 5.js", "translations(1) 4.js", "translations(1) 3.js", "translations(1) 2.js")
}

foreach ($mainFile in $fileMappings.Keys) {
    $mainPath = Join-Path $projectRoot $mainFile
    
    if (-not (Test-Path $mainPath)) {
        $backups = $fileMappings[$mainFile]
        $restoredFile = $false
        
        foreach ($backup in $backups) {
            $backupPath = Join-Path $projectRoot $backup
            if (Test-Path $backupPath) {
                Copy-Item $backupPath $mainPath -Force
                Write-Host "  [RESTORED] $mainFile from $backup" -ForegroundColor Green
                $restored += $mainFile
                $restoredFile = $true
                break
            }
        }
        
        if (-not $restoredFile) {
            Write-Host "  [ERROR] Cannot restore $mainFile - no backup found" -ForegroundColor Red
        }
    } else {
        Write-Host "  [OK] $mainFile already exists" -ForegroundColor Gray
    }
}

if ($restored.Count -gt 0) {
    Write-Host ""
    Write-Host "Restored $($restored.Count) file(s):" -ForegroundColor Green
    foreach ($file in $restored) {
        Write-Host "  - $file" -ForegroundColor Green
    }
    Write-Host ""
    Write-Host "Please verify the restored files are correct before committing." -ForegroundColor Yellow
} else {
    Write-Host ""
    Write-Host "No files needed restoration." -ForegroundColor Green
}
