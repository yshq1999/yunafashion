# BACKUP MANIFEST — Yuna Fashion Shop

**Backup for:** Stage 1 of the YUNA brand content update task
**Date/time:** 2026-07-12, 11:14 (local, UTC+8) — timestamp tag `20260712-1114`

## Technology stack

| Item | Value |
|---|---|
| Framework / CMS | None — static single-file HTML site (`index.html`), vanilla JS, no build step, no CMS. Not Shopify/WordPress/Webflow/Wix. |
| Hosting | GitHub Pages (`yshq1999/yunafashion`, legacy build, source = `main` branch root) |
| Domain | `yunafashion.shop` (custom domain, HTTPS enforced, cert valid to 2026-09-30) |
| Source code location | `C:\Users\ROG\Documents\yunafashion` (git working copy of `github.com/yshq1999/yunafashion`) |
| Database | Supabase (managed Postgres), project `xwrsmxmnbfmyiadhaiqe.supabase.co`, accessed via REST/PostgREST + `@supabase/supabase-js` (client-side only, no server) |
| Media/asset storage | No CDN/object storage. Product photos + payment QR codes are base64 `data:image/...` strings inside Postgres rows. App icons are static files in the repo. Fonts are Google Fonts CDN links (no self-hosted font files). |
| Environment configuration | No `.env`/server env vars. Supabase project URL + **public anon key** are hardcoded in `index.html` (`SB_URL`, `SB_KEY`) — this is a publishable key by design, not a secret; no service-role key or credentials exist in the codebase. |
| Deployment process | `git push` to `main` → GitHub Pages auto-rebuilds from branch root, live within ~30–90s |
| Staging environment | **None exists.** Local preview only, via `http-server` serving the working directory on `localhost:4300` — not a real staging deploy. |

## Git state

| Item | Value |
|---|---|
| Branch at backup time | `main` |
| Latest commit | `ef0298e43c36cbfe95e518073a514153bcc60195` — "Fully translate admin panel to Vietnamese; fix hardcoded Chinese in checkout total and several dynamic admin strings" |
| Working tree status | Clean (nothing uncommitted to preserve) |
| **Backup branch** | `backup/pre-yuna-brand-update-20260712-1114` |
| **Backup tag** | `pre-yuna-brand-update-20260712-1114` (annotated) |
| **Working branch for Stage 2** | `feature/yuna-brand-content-v1` (currently checked out; all Stage 2 edits happen here) |
| Pushed to origin? | **No** — all branches/tags are local only, per instructions. Nothing has been pushed, merged, or deployed. |

## Archives

All paths relative to `C:\Users\ROG\Documents\yunafashion\backups\`:

| Archive | Path | Notes |
|---|---|---|
| Source code | `yuna-website-source-20260712-1114.zip` | Full working tree (12 files: `index.html`, `manifest.json`, `sw.js`, `CNAME`, `.nojekyll`, `README.md`, 3 icons, `postcodes.json`, `manual/` PDFs) |
| Source code (bonus) | `yuna-source-git-history-20260712-1114.bundle` | Complete `git bundle --all` — full commit history + all branches/tags, verified with `git bundle verify` |
| Database | `yuna-database-20260712-1114.zip` | JSON export of the 4 tables reachable via the public key: `products` (16), `product_sizes` (136), `settings` (16), `config` (7). **Partial — see "Missing backup items" below.** |
| Media/assets | `yuna-media-assets-20260712-1114.zip` | 16 product photos + 2 payment QR images (exported live from DB), 3 app icons, plus `existing-content-snapshot/` containing extracted custom CSS, custom JS, and the pre-change About/Design-Philosophy/homepage copy as standalone text files |
| Screenshot/design folder | `backups/design-reference/20260712-1114/` | `current-design-inventory.md` (colours/fonts/spacing/structure, sourced directly from CSS) + header/footer DOM, homepage/about/design/listing/cart text snapshots. **No pixel screenshots** — see below. |

## SHA-256 checksums

Full file: `backups/SHA256SUMS-20260712-1114.txt`. Independently re-verified with `sha256sum -c` — all 4: **OK**.

```
3918156C11464BC6DBEBA970F421025A2D7C9B3CF42AE53B69D5A701FFC1A2CC  yuna-website-source-20260712-1114.zip
4C2FCEBB54A80707E16E7EBCC908C5B6875E4734D57D09B46C0BA4BDE6E9C246  yuna-media-assets-20260712-1114.zip
A7F543DFAD7DD4B1932A2C88A170890C886A8809D8FFF5D47F503177AA0DF6EB  yuna-database-20260712-1114.zip
4F9A0F7CD8581BE7F010BF47EB54575020C72C7EB9749D673B696D59FE64F637  yuna-source-git-history-20260712-1114.bundle
```

## Missing backup items

1. **Full database (schema + all tables).** No Supabase dashboard login, no service-role key, no `pg_dump` access — only the site's public anon key, which can read exactly 4 tables. `profiles`, `orders`, `order_items`, `withdrawals`, `commissions`, `chat_threads`, `chat_messages` all return HTTP 200 with 0 rows under RLS for an anonymous caller — **no customer/member/order/chat data could be backed up.**
2. **Database schema / RLS policies / RPC functions** — not retrievable via REST API.
3. **Pixel screenshots** of the 9 requested views. The browser automation tool's screenshot function timed out on every attempt (confirmed on two separate occasions, ~30 minutes apart, across multiple tabs) — this is a tool failure, not a site problem (the same pages returned correct content via text/DOM extraction in the same sessions). Substituted with a CSS-sourced design inventory (more precise for colour/spacing values than a screenshot would be) plus DOM/text captures of header, footer, homepage, About, Design Philosophy, listing, and cart.
4. **Email templates** — configured in the Supabase dashboard, not accessible without dashboard login.
5. **Font files** — none exist to back up; fonts are Google Fonts CDN references, already preserved in the source archive's `<head>` markup.

## Rollback instructions

**To fully revert Stage 2 and return to this exact backed-up state:**

```bash
cd path/to/yunafashion
git checkout main
git branch -D feature/yuna-brand-content-v1   # discard the brand-update work entirely
# main was never touched, so it already matches this backup
```

**To inspect or cherry-pick from the backup without losing Stage 2 work:**

```bash
git checkout backup/pre-yuna-brand-update-20260712-1114
# or
git checkout pre-yuna-brand-update-20260712-1114   # tag, detached HEAD
```

**To restore from the archives instead of git** (e.g. if local git state is
somehow lost): extract `yuna-website-source-20260712-1114.zip` into the repo
root, overwriting all files, then `git add -A && git commit`. For full
history recovery, `git clone backups/yuna-source-git-history-20260712-1114.bundle`.

**Full step-by-step instructions** (source, database, media, environment,
deployment) are in `ROLLBACK_GUIDE.md` at the repo root.

**No production deployment has occurred.** `main` is untouched; nothing has
been pushed. Rolling back at this stage requires no live-site action at all.
