# Uplevel Carpentry Website

A polished, static-first website for Uplevel Carpentry — custom finished carpentry and design serving Michigan's Copper Country.

Built with Next.js (App Router), TypeScript, and Tailwind CSS.

## Run locally

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Edit business information

Most contact details and marketing copy live in one file:

**`config/site.ts`**

Update phone, email, service area, owner name, About copy, and SEO metadata there. Changes apply across the header, footer, homepage, and structured data.

## Change the phone number

1. Open `config/site.ts`
2. Update `phone` (display text) and `phoneHref` (tel link), for example:

```ts
phone: "(906) 319-1678",
phoneHref: "tel:+19063191678",
```

## Change the email

1. Open `config/site.ts`
2. Update `email` and `emailHref`

## Edit About copy

1. Open `config/site.ts`
2. Edit the `about` section
3. Home page hero text can be changed via `tagline`

Visitors contact David through Call / Email buttons on the homepage (`/#contact`). The `/contact` route permanently redirects there.

## Reorder gallery albums and photos (client)

The live gallery order is controlled by **`content/gallery-order.json`**, edited through a free browser admin (Sveltia CMS).

### For the client

1. Open **`https://YOUR-DOMAIN/admin/`** (or `http://localhost:3000/admin/` while developing)
2. Click **Login with GitHub** and approve access
3. Open **Gallery → Album & photo order**
4. Drag albums to change album order, or use **Add** / **Remove** for albums
5. Optionally set an **Album title** (shown at the top of that section on the Gallery page)
6. Expand an album, drag photos/videos, upload new ones, remove items, and optionally set a **Photo title**
7. Click **Save**

Saving commits the order file (and any new uploads) to the `main` branch on GitHub. Vercel then rebuilds and publishes the site (usually within a minute or two).

**Album folder ID** should be a short name without spaces (for example `120` or `kitchen-trim`). New photos upload into `public/gallery/<that-id>/`.

### One-time setup (maintainer): GitHub login for `/admin`

Sveltia needs a free OAuth helper so non-technical users can click **Login with GitHub** instead of pasting tokens.

1. Deploy the official authenticator: [sveltia/sveltia-cms-auth](https://github.com/sveltia/sveltia-cms-auth) to a **Cloudflare Worker** (free tier is enough). Copy the Worker URL, for example `https://uplevel-cms-auth.YOUR_SUBDOMAIN.workers.dev`.
2. Create a **GitHub OAuth App** at [github.com/settings/applications/new](https://github.com/settings/applications/new):
   - Application name: `Uplevel Carpentry CMS` (or similar)
   - Homepage URL: your live site URL
   - Authorization callback URL: `https://YOUR-WORKER-URL/callback`
3. Put the OAuth **Client ID** and **Client Secret** in the Cloudflare Worker environment variables (`GITHUB_CLIENT_ID`, `GITHUB_CLIENT_SECRET`) as described in the authenticator README.
4. In [`public/admin/config.yml`](public/admin/config.yml), set:

```yaml
backend:
  name: github
  repo: Saikawa-Yasashi/UpLevel_Website
  branch: main
  base_url: https://YOUR-WORKER-URL
```

5. Invite the client’s GitHub account as a **collaborator with write access** on the repository.
6. Share `https://YOUR-DOMAIN/admin/` with them.

Until `base_url` is set, maintainers can still sign in locally with a GitHub personal access token via Sveltia’s token login (developer-only).

### Adding new gallery media (maintainer)

1. Put web-ready files in an album folder under **`public/gallery/`** (for example `public/gallery/010/`)
2. Supported formats: `.jpg`, `.jpeg`, `.png`, `.webp`, `.avif`, and browser-ready `.mp4`
3. Convert iPhone `.mov` files to `.mp4` first
4. Add matching entries to **`content/gallery-order.json`** (or drop the files and let the site append them at the end of that album until someone reorders in `/admin`)
5. Commit and push to `main` — or have the client open `/admin`, confirm order, and Save

```
public/gallery/
  010/
    kitchen-01.jpg
    walkthrough.mp4
  020/
    exterior-01.jpg
content/gallery-order.json   # drag-and-drop order via /admin
```

Raw client dumps can stay in a local `Photos/` folder (gitignored). Do not commit original HEIC/MOV dumps.

## Deploy to Vercel

1. Push this project to a Git repository (GitHub, GitLab, or Bitbucket)
2. Sign in at [vercel.com](https://vercel.com) and click **Add New Project**
3. Import the repository
4. Vercel detects Next.js automatically — use the default build settings
5. Deploy

Each push to your main branch triggers a new deployment. CMS saves to `main` also trigger a production deploy.

## Connect a custom domain on Vercel

1. Open your project in the Vercel dashboard
2. Go to **Settings → Domains**
3. Add your domain (for example `uplevelcarpentry.com`)
4. Follow Vercel's DNS instructions at your domain registrar
5. Vercel provisions SSL automatically once DNS is verified

Update `siteConfig.seo.siteUrl` in `config/site.ts` to match your live domain.

## Project structure

```
app/                       Pages and routes
components/                Header, Footer, Gallery, Lightbox, etc.
config/site.ts             Editable business information
content/gallery-order.json Gallery album/photo order (CMS)
lib/gallery.ts             Reads order manifest + album folders
public/admin/              Sveltia CMS (/admin)
public/brand/              Logo
public/about/              About portrait
public/gallery/            Portfolio albums (subfolders)
```

## Scripts

```bash
npm run dev      # Local development
npm run build    # Production build
npm run start    # Run production build locally
npm run lint     # ESLint
```
