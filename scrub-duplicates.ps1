# Remove duplicate HTML, JS, JSON - keep only canonical files
param([string]$TargetPath)
$root = if ($TargetPath) { $TargetPath } else { $PSScriptRoot }
$canonicalHtml = @('index.html','about.html','sicily.html','parco-madonie.html','isnello.html','collesano.html','castelbuono.html','current-restoration.html','support-cause.html','contact.html','404.html','test.html')
$canonicalJs = @('language.js','translations(1).js','translations-data.js','shopping-cart.js','server.js')
$canonicalJson = @('vercel.json','package.json')

$removed = 0
Get-ChildItem $root -Filter '*.html' -File | Where-Object { $_.Name -notin $canonicalHtml } | ForEach-Object {
    Write-Host "Removing: $($_.Name)"
    Remove-Item $_.FullName -Force -ErrorAction SilentlyContinue
    $removed++
}
Get-ChildItem $root -Filter '*.js' -File | Where-Object { $_.Name -notin $canonicalJs } | ForEach-Object {
    Write-Host "Removing: $($_.Name)"
    Remove-Item $_.FullName -Force -ErrorAction SilentlyContinue
    $removed++
}
Get-ChildItem $root -Filter 'vercel*.json' -File | Where-Object { $_.Name -ne 'vercel.json' } | ForEach-Object {
    Write-Host "Removing: $($_.Name)"
    Remove-Item $_.FullName -Force -ErrorAction SilentlyContinue
    $removed++
}
Write-Host "Removed $removed duplicate file(s)."
