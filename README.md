# codedbyed.com

Personal site for Edward Yi Wei Neo. Static HTML/CSS/JS on Cloudflare Workers.
No framework, no build step, no runtime dependencies, no trackers.

Total page weight: **~21 KB**, or **5.3 KB gzipped** (excluding the resume PDF).

---

## Deploy

The repo has a GitHub Actions workflow at
`.github/workflows/deploy.yml`. **Push to `main` and it deploys to Cloudflare
automatically.** You should never need to run `wrangler deploy` by hand.

```bash
git add .
git commit -m "Update site"
git push
```

Watch it run under the **Actions** tab on GitHub.

### One-time setup in Cloudflare

The workflow needs two repository secrets. Create them at
**Settings → Secrets and variables → Actions → New repository secret**:

| Secret name | Value |
|---|---|
| `CLOUDFLARE_API_TOKEN` | see below |
| `CLOUDFLARE_ACCOUNT_ID` | Cloudflare dashboard → Workers & Pages → Account ID |

To create the token: Cloudflare dashboard → **My Profile → API Tokens → Create
Token** → **Edit Cloudflare Workers** template. That grants the two
permissions the deploy needs.

### One-time setup in wrangler.jsonc

`routes` is commented out. Uncomment it so the deploy also attaches your domain:

```jsonc
"routes": [
  { "pattern": "codedbyed.com",     "custom_domain": true },
  { "pattern": "www.codedbyed.com", "custom_domain": true }
]
```

Cloudflare creates the DNS records automatically and provisions TLS. If it is
rejected for DNS permissions, add the records by hand instead:

| Type | Name | Target | Proxy |
|---|---|---|---|
| CNAME | `@` | `codedbyed.<subdomain>.workers.dev` | Proxied (orange) |
| CNAME | `www` | `codedbyed.<subdomain>.workers.dev` | Proxied (orange) |

Your domain is already on Cloudflare's nameservers but currently has **no A or
CNAME record**, so nothing resolves yet.

### Working locally

```bash
npm install     # only wrangler, as a dev dependency
npm run dev     # local preview at http://localhost:8787
npm run tail    # stream Worker logs
```

---

## Remaining TODOs

| Where | What |
|---|---|
| `public/index.html`, head | Add `public/og.png` (1200×630) for social link previews |
| Contact section | Optionally add a Calendly or Cal.com link so recruiters can book time |

The GitHub link in the hero points at `github.com/codedbyed`. Be aware that
only your public repos are visible to visitors, and those are mostly forks of
other people's projects, so that link currently shows a thin profile.

---

## Editing the site

Everything you'll touch is in `public/`. Content and styling are fully
separated, so day-to-day edits need no build step.

- **Write copy** — `public/index.html`
- **Change colours** — the `--accent`, `--bg`, `--text` variables at the top of
  `public/styles.css`, each with a `[data-theme="dark"]` counterpart
- **Add a section** — copy an existing `<section>` block; spacing and headings
  are automatic
- **Add a link** — add an `<li>` to the `.social` list in the hero
- **Replace the resume** — drop a new file at `public/resume.pdf`, same filename

### Confideniality note

Employer detail stays at the level already public in your LinkedIn profile:
capability and scope, not internal system names, data sources, roadmaps or
client names. The project descriptions were written from your private repos,
which is fine, but do not add further internal detail to a public page.

---

## Layout

```
site/
├── public/                  # everything served to visitors
│   ├── index.html           # all content
│   ├── styles.css           # all styling
│   ├── main.js              # theme toggle + footer year (1.7 KB)
│   ├── favicon.svg
│   └── resume.pdf
├── src/index.js             # Worker, serves static assets
├── wrangler.jsonc           # config, incl. commented custom-domain routes
├── .github/workflows/deploy.yml
└── package.json
```

The Worker never executes for a normal page load, because Cloudflare serves the
assets straight from the edge. It exists as the place to add logic later:
redirects, auth, A/B tests, an API endpoint.