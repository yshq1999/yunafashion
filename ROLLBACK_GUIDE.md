# ROLLBACK GUIDE — YUNA Brand Content Update

Covers reverting the brand content changes made on `feature/yuna-brand-content-v1`
back to the pre-update state captured in `BACKUP_MANIFEST.md`
(commit `ef0298e`, tag `pre-yuna-brand-update-20260712-1114`).

**Current state: nothing has been deployed.** `main` was never touched, and
`feature/yuna-brand-content-v1` has not been pushed, merged, or published.
Rolling back at this point requires no live-site action — it's purely local
git housekeeping.

## 1. Source code

**To discard the brand-update work entirely and do nothing else:**

```bash
cd path/to/yunafashion
git checkout main
git branch -D feature/yuna-brand-content-v1
```

`main` already matches the pre-update state exactly (it was never edited),
so no further action is needed.

**To keep the branch around but stop using it (safer, reversible):**

```bash
git checkout main
# leave feature/yuna-brand-content-v1 as-is, just don't merge it
```

**To restore a specific file from the backup instead of the whole branch:**

```bash
git checkout pre-yuna-brand-update-20260712-1114 -- index.html
```

**If local git state is somehow lost:** extract
`backups/yuna-website-source-20260712-1114.zip` into the repo root
(overwrites `index.html` etc. with the pre-update version), or clone from
`backups/yuna-source-git-history-20260712-1114.bundle` for full history.

## 2. Database

No database rows were modified by Stage 2 (this was a content-only change to
`index.html`; nothing in the code calls `products`/`settings`/`config`
write operations related to brand copy — all brand text lives in
client-side JS, not the database). **There is nothing to roll back in the
database for this specific change.** If you need it anyway, the pre-update
database export is in `backups/yuna-database-20260712-1114.zip` — see the
general restore steps in that backup's own manifest.

## 3. Media

Not touched by Stage 2. No product images, QR codes, or icons were changed.

## 4. Theme / template

The visual design (CSS) was **not** redesigned — only content strings
changed, plus one new small CSS class (`.hero-btn-secondary`) and one new
homepage `<section>`. To remove just the new elements without a full
rollback:

- Delete the `.hero-btn-secondary` rule and its `:hover` rule from `<style>`
- Delete the `<section id="homeStorySection">...</section>` block
- Remove the second `<button class="hero-btn hero-btn-secondary">` from the
  hero (restores the single-button hero)

A full `git checkout` (section 1) is simpler and safer than hand-removing
pieces.

## 5. Environment configuration

Not touched. `SB_URL`/`SB_KEY` are unchanged.

## 6. Production deployment

**Nothing has been deployed.** If this guide is being used *after* a future
push to `main` made this live, revert with:

```bash
git checkout main
git revert <the-merge-commit-or-range>   # preferred: keeps history
# or, if you must force back to the exact pre-update snapshot:
git reset --hard ef0298e43c36cbfe95e518073a514153bcc60195
git push origin main --force-with-lease   # ONLY with explicit owner approval
```

Force-pushing to `main` rewrites the live site's history — **do not run
this without direct sign-off**, and confirm no one else has pushed to `main`
in the meantime (`--force-with-lease` will refuse if so, which is why it's
preferred over plain `--force`).

After any deploy-affecting rollback, verify:

```bash
curl -sI https://yunafashion.shop/ | head -5
```

and hard-refresh (or clear the PWA cache — service worker cache `yuna-v3`)
on a real device to confirm the reverted content is actually being served.

## Quick checklist

- [ ] Confirm rollback is actually wanted
- [ ] `git checkout main` (already matches backup — no reset needed unless
      main was later modified)
- [ ] Decide: delete or keep `feature/yuna-brand-content-v1`
- [ ] If already deployed: revert/reset `main`, push only with explicit
      approval, verify live site + clear PWA cache
- [ ] Confirm cart/checkout/product functionality still works post-rollback
      (should be automatic, since Stage 2 never touched that logic)
