# BRAND CONTENT CHANGELOG — YUNA Fashion Brand Update

**File changed for all entries below:** `index.html` (only file changed in
Stage 2 — single-file site, no other source files exist)
**Reason for every change below:** Locked brand foundation rollout — new
positioning ("YUNA Fashion — Wear Your Story.") replacing the previous
sleepwear-only branding, per explicit content spec provided for this task.

## 1. Header tagline (`slogan` key, shown under the logo in the nav bar)

| Language | Original | Replacement |
|---|---|---|
| zh | 柔软相伴，安睡每一夜 | Wear Your Story. |
| en | Soft Comfort, Sweet Dreams | Wear Your Story. |
| ms | Lembut Selesa, Tidur Lena | Wear Your Story. |
| vi | Êm ái mỗi đêm, ngọt ngào giấc mơ | Wear Your Story. |

*Note: this string was not explicitly listed in the task's content spec, but
was left showing the old sleepwear tagline directly beside the new "Wear
Your Story." hero heading, one scroll away. Updated for brand consistency —
flagged in IMPLEMENTATION_REPORT.md as a judgment call worth owner review.*

## 2. Footer tagline (`slogan2` key)

Same original→replacement pairs as table 1 above (both keys held identical
text pre-change; both now hold "Wear Your Story." — same reasoning).

## 3. Homepage hero

| Field | Language | Original | Replacement |
|---|---|---|---|
| `heroTag` (small kicker above heading) | all 4 | 舒适睡衣 · 萌趣童装 / Cozy Sleepwear · Sweet Kids / Baju Tidur Selesa · Comel untuk Anak / Đồ ngủ êm ái · Đồ trẻ em xinh xắn | YUNA FASHION (universal, brand name not translated) |
| `heroTitle` (H1) | all 4 | 柔软相伴，安睡每一夜 / Soft Comfort, Sweet Dreams / Lembut Selesa, Tidur Lena / Êm ái mỗi đêm, ngọt ngào giấc mơ | **Wear Your Story.** (universal — per locked brand foundation, this slogan is kept in English across all 4 languages, matching how it appears untranslated inside the given zh/ms/vi body copy too) |
| `heroDesc` (supporting line) | zh | 为你和宝贝，带来柔软温暖的睡眠时光。 | 为真实的日子、有意义的时刻，以及真正的你而设计。 |
| | en | Soft, warm sleep moments for you and your little one. | Clothing made for real days, meaningful moments and the woman you already are. |
| | ms | Saat tidur lembut dan hangat untuk anda dan si kecil. | Pakaian untuk kehidupan sebenar, detik yang bermakna dan diri anda yang sebenar. |
| | vi | Khoảnh khắc ngủ êm ấm cho bạn và bé yêu. | Trang phục dành cho những ngày thật, những khoảnh khắc ý nghĩa và chính con người bạn. |
| `shopNow` (primary CTA button label) | zh | 立即选购 | 探索 YUNA |
| | en | Shop now | Discover YUNA |
| | ms | Beli sekarang | Terokai YUNA |
| | vi | Mua ngay | Khám Phá YUNA |

**New** `ourStoryBtn` (secondary CTA button, added next to the primary
button, opens the About modal): zh 我们的故事 / en Our Story / ms Kisah Kami /
vi Câu Chuyện Của Chúng Tôi. This is new content, not a replacement — the
hero previously had only one button.

## 4. New homepage section — "Made for the Life You Live"

Entirely new section (`#homeStorySection`), inserted between the hero and
the product grid, hidden automatically when a specific category filter is
active (matches existing hero/promo-banner show/hide behaviour). No
original text — this is additive content per the task's "Suggested
homepage story section" spec.

| Language | `homeStoryHeading` | `homeStoryBody` |
|---|---|---|
| zh | 为你的生活而设计 | 从忙碌的清晨，到安静的周末，YUNA 自然融入你在意的每一个时刻。 |
| en | Made for the Life You Live | From busy mornings to quiet weekends, YUNA is created to move naturally through the moments that matter to you. |
| ms | Direka untuk Kehidupan Anda | Dari pagi yang sibuk hingga hujung minggu yang tenang, YUNA dicipta untuk mengiringi setiap detik yang bermakna buat anda. |
| vi | Được Tạo Ra Cho Cuộc Sống Của Bạn | Từ những buổi sáng bận rộn đến cuối tuần yên bình, YUNA được tạo ra để đồng hành tự nhiên trong những khoảnh khắc quan trọng với bạn. |

## 5. About page (footer link "关于我们"/"About us", opens `openInfo('about')`)

**Modal title** (`INFO.about.t`):

| Language | Original | Replacement |
|---|---|---|
| zh | 关于我们 | 我们的故事 |
| en | About us | Our Story |
| ms | Tentang kami | Kisah Kami |
| vi | Về chúng tôi | Câu Chuyện Của Chúng Tôi |

**Modal body:** completely replaced. Original was a short 4-paragraph note
(same shape in zh/en only — ms/vi previously silently fell back to the
English text, since no ms/vi translation existed at all). New content is a
5-section structured page (Hero line → Our Beginning → What We Believe →
Designed for Real Life → Wear Your Story closing + CTA), rendered via a new
`renderAboutHTML()` function reading ~20 new `T[lang]` keys per language
(`aboutHeroLine`, `aboutBeginningHeading/Body`, `aboutBelieveHeading`,
`aboutVal1–5Name/Line`, `aboutPhilosophyHeading/Body`, `aboutClosingBody`).
Full original and replacement text for all 4 languages is in the task
transcript and directly readable in `index.html`'s `zh:{...}` / `en:{...}`
/ `ms:{...}` / `vi:{...}` blocks (search for `aboutHeroLine`) — not
reproduced here in full since it's several hundred words × 4 languages;
this changelog documents *what* changed and *why*, the exact strings live
in source.

Pre-change content that was replaced: see
`backups/media-export-20260712-1114/existing-content-snapshot/about-page-content.txt`
for the exact original zh text that was captured before this change.

**New:** SEO title/description swap on modal open (`aboutSeoTitle`,
`aboutSeoDesc` per language) — previously the page `<title>` and (nonexistent)
meta description never changed when this modal opened.

## 6. Design Philosophy page (footer link "设计理念", `openInfo('design')`)

**Modal title:**

| Language | Original | Replacement |
|---|---|---|
| zh | 设计理念 | 为真实生活而设计 |
| en | Design | Designed for Real Life |
| ms | Reka bentuk *(body previously had no ms translation — fell back to English)* | Direka untuk Kehidupan Sebenar |
| vi | Thiết kế *(body previously had no vi translation — fell back to English)* | Thiết Kế Cho Cuộc Sống Thật |

**Modal body:** replaced with the new 5-principles design philosophy copy
(EN/ZH given directly in the task spec; MS/VI composed as polished,
non-literal translations preserving tone, since the task only supplied
EN/ZH for this section and explicitly asked for natural MS/VI versions).
Full text in `index.html`, `INFO.design.c`. Pre-change zh text captured in
`backups/media-export-20260712-1114/existing-content-snapshot/design-philosophy-page-content.txt`.

## 7. Global `<head>` metadata

**New:** `<meta name="description" id="metaDesc">` added (didn't exist
before at all). Default content set to a YUNA-brand summary; dynamically
overwritten with `aboutSeoDesc` while the About modal is open, restored
implicitly (only the About-open path changes it; default persists
otherwise).

## Explicitly NOT changed (per task's "preserve" instructions)

- Product catalogue, product cards, pricing, stock — untouched
- Navigation labels (主页/女士睡衣/小孩服装/优惠/会员) — untouched
- Footer link labels and structure — untouched (only the About/Design
  *content behind* two of the links changed, not the footer itself)
- Cart, checkout, payment logic — untouched, verified in QA_REPORT.md
- Member/referral program copy — untouched
- Admin panel — untouched
- Logo — no logo *file* exists to change (text wordmark only); per
  instructions, no redesign attempted
- Colours — no CSS custom-property values changed; the site's existing
  `--rose`/`--berry` etc. tokens were reused as-is for all new elements
