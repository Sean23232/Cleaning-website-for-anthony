# Deploying Anthony & Co. to Netlify

Two parts deploy together:

| Part | Where it runs | Netlify piece |
|---|---|---|
| Next.js app (pages, forms, Lead Studio, API routes) | Netlify's edge + serverless runtime | `@netlify/plugin-nextjs` |
| PostgreSQL database (leads) | Hosted Postgres (Netlify DB / Neon, Supabase, RDS…) | Env var + `drizzle-kit push` |

The repo is already configured (`netlify.toml`, `.env.example`). Deployment needs your Netlify authentication — it cannot be triggered from the build sandbox.

---

## 1. Create the database

**Option A — Netlify DB (Neon), recommended**

```bash
npm i -g netlify-cli
netlify login
netlify link                     # link this folder to your Netlify site
netlify db init                  # provisions Neon, sets NETLIFY_DATABASE_URL
```

**Option B — your own Postgres** (Supabase, Neon dashboard, RDS, etc.)
Copy the connection string; it must include `?sslmode=require`.

## 2. Apply the schema

Run once against the hosted database (creates the `leads` table):

```bash
npx drizzle-kit push --dialect=postgresql \
  --schema=./src/db/schema.ts \
  --url="postgresql://USER:PASSWORD@HOST:5432/DB?sslmode=require"
```

Verify: `psql "<connection string>" -c '\d leads'`

## 3. Set environment variables

In **Site configuration → Environment variables** (or `netlify env:set`):

| Variable | Required | Example / notes |
|---|---|---|
| `DATABASE_URL` | Yes* | `postgresql://…?sslmode=require`. *Skip if using Netlify DB, which injects `NETLIFY_DATABASE_URL` — the app reads both. |
| `NEXT_PUBLIC_SITE_URL` | Yes | `https://your-site.netlify.app` — used for canonicals, sitemap, OpenGraph. |
| `ADMIN_PASSCODE` | Strongly recommended | Private passcode for `/admin` Lead Studio. Defaults to `anthony` if unset. |

## 4. Deploy the site

```bash
# First deploy (creates the site)
netlify deploy --build --prod

# Or connect the Git repo for continuous deploys:
# Netlify dashboard → Add new site → Import an existing project
#   Build command:    npm run build
#   Publish directory: .next
#   Node version:     22 (already pinned in netlify.toml)
```

Netlify reads `netlify.toml`, installs `@netlify/plugin-nextjs` automatically, and serves the App Router output (SSR, route handlers, server actions, image optimisation).

## 5. Post-deploy verification

```bash
SITE=https://your-site.netlify.app
curl -s $SITE/api/health                 # {"ok":true}  ← DB reachable
curl -s -o /dev/null -w '%{http_code}\n' $SITE/
curl -s -o /dev/null -w '%{http_code}\n' $SITE/residential
curl -s -o /dev/null -w '%{http_code}\n' $SITE/commercial
curl -s -o /dev/null -w '%{http_code}\n' $SITE/about
curl -s -o /dev/null -w '%{http_code}\n' $SITE/contact
curl -s $SITE/sitemap.xml | head
```

Then submit one test enquiry on `/residential#quote` and confirm it appears in
`/admin` (sign in with `ADMIN_PASSCODE`). Delete the test row from the studio or with SQL.

After launch, add the custom domain under **Domain management** and update
`NEXT_PUBLIC_SITE_URL` to the real domain so canonical URLs and the sitemap match.

---

## Notes for this codebase

- **Serverless-safe DB access** — `src/db/index.ts` caches a single `pg` pool per warm lambda, with SSL enabled automatically for non-local hosts.
- **Health check** — `/api/health` executes `select 1`; a red check means `DATABASE_URL` is wrong or the schema push was skipped.
- **Lead capture** — `/api/leads` validates server-side, uses a honeypot + timing check + per-IP rate limit. Enquiries are stored in Postgres, so no third-party form service is needed.
- **Images** — photography is served from Pexels' CDN (`next.config.ts` marks it unoptimized to stay within Netlify's image-optimisation limits). Swap to local `/public` assets later if you prefer fully self-hosted assets.
- **Content edits** — business name, phone, email, service area and hours all live in `src/lib/site.ts`.
