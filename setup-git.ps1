# Git Repository Setup Script
# Run this script after Git is installed and available in your PATH

Write-Host "Initializing git repository..." -ForegroundColor Green
git init

Write-Host "Staging all files..." -ForegroundColor Green
git add .

Write-Host "Creating initial commit..." -ForegroundColor Green
git commit -m "Initial commit"

Write-Host "Adding remote origin..." -ForegroundColor Green
git remote add origin https://github.com/davidclower/www.siciliabedda.com.git

Write-Host "Checking current branch name..." -ForegroundColor Green
$branch = git branch --show-current
if (-not $branch) {
    $branch = git symbolic-ref --short HEAD
}
if (-not $branch) {
    $branch = "main"
    git branch -M main
}

Write-Host "Pushing to GitHub (branch: $branch)..." -ForegroundColor Green
git push -u origin $branch

Write-Host "`nGit repository setup complete!" -ForegroundColor Green
