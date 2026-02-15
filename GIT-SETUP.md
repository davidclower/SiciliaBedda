# Git setup (avoid push/ref problems)

This repo is set up so the issues we hit (invalid refs, missing remote, push auth) don’t block you again.

## One-time per machine / clone

1. **Install the pre-push hook** (cleans invalid refs before every push):
   ```powershell
   .\scripts\install-git-hooks.ps1
   ```

2. **Ensure `origin` is set** (if `git remote -v` is empty):
   ```powershell
   git remote add origin https://github.com/davidclower/SiciliaBedda.git
   ```
   Use the URL GitHub shows (e.g. SiciliaBedda or www.siciliabedda.com).

3. **One interactive push** so Git can store credentials:
   - Run `git push -u origin master` in a normal terminal (not automation).
   - Sign in or approve when prompted; `credential.helper=store` will save it for later.

## If push still fails

- **“refspec master does not match any” / “bad object refs/heads/master 2”**  
  Run:
  ```powershell
  .\scripts\fix-git-refs.ps1
  ```
  Then push again.

- **“could not read Username”**  
  Push once from a terminal where you can sign in (see step 3 above).

- **“Updates were rejected (non-fast-forward)”**  
  Either pull then push, or force-push only if you intend to overwrite the remote branch:
  ```powershell
  git pull origin master --rebase
  git push origin master
  ```
