# codedbyed.com

Personal site for Edward Yi Wei Neo. Static HTML/CSS/JS on Cloudflare Workers.
No framework, no build step, no runtime dependencies, no trackers.

Total page weight: **~21 KB**, or **5.3 KB gzipped** (excluding the resume PDF).

---

## Deploy

Deploy is manual from your machine, the same way `ourwedding` and `brushie.sg`
are done. There is no CI, no API token, and no GitHub secrets.

```bash
npm run deploy
```

Wrangler authenticates through `wrangler login`, which runs an interactive
OAuth flow once and caches the credential in your macOS keychain. If the deploy
ever fails with an auth error, run `npx wrangler logout && npx wrangler login`
to refresh it.

The site lives at the `*.workers.dev` URL that the deploy prints, until you
attach the custom domain.

### Attaching codedbyed.com

Your domain is already on Cloudflare's nameservers but currently has **no A or
CNAME record**, so nothing resolves.

Uncomment `routes` in `wrangler.jsonc`, then deploy once:

```jsonc
"routes": [
  { "pattern": "codedbyed.com",     "custom_domain": true },
  { "pattern": "www.codedbyed.com", "custom_domain": true }
]
```

Cloudflare creates the DNS records automatically and provisions TLS. If that
is rejected for DNS permissions, add the records by hand instead:

| Type | Name | Target | Proxy |
|---|---|---|---|
| CNAME | `@` | `codedbyed.<subdomain>.workers.dev` | Proxied (orange) |
| CNAME | `www` | `codedbyed.<subdomain>.workers.dev` | Proxied (orange) |

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
└── package.json
```

The Worker never executes for a normal page load, because Cloudflare serves the
assets straight from the edge. It exists as the place to add logic later:
redirects, auth, A/B tests, an API endpoint.