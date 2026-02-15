# Fix invalid git refs (e.g. "master 2" with a space) that can break push/fetch.
# Run from repo root: .\scripts\fix-git-refs.ps1
# Safe to run anytime.

$ErrorActionPreference = "Stop"
if (-not (git rev-parse --is-inside-work-tree 2>$null)) {
    Write-Error "Not a git repository. Run from repo root."
    exit 1
}

$refs = git for-each-ref --format='%(refname)' refs/heads/ 2>$null
foreach ($ref in $refs) {
    if (-not $ref) { continue }
    $name = $ref -replace '^refs/heads/', ''
    if ($name -match '\s' -or $name -match '\.\.' -or $name -match '[~^:\\\?*\[\]]') {
        $commit = (git rev-parse $ref 2>$null)
        if ($name -match '^\s*master\s+2\s*$' -and $commit -match '^[0-9a-f]{40}') {
            git update-ref refs/heads/master $commit
            Write-Host "Created refs/heads/master from broken ref '$name'."
        }
        git update-ref -d $ref
        Write-Host "Removed invalid ref: $ref"
    }
}
