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

## Add gallery albums

Organize portfolio media into album folders under **`public/gallery/`**:

```
public/gallery/
  010/
    kitchen-01.jpg
    detail-02.jpg
    walkthrough.mp4
  020/
    exterior-01.jpg
```

- Each immediate subdirectory is one untitled album (visual separation only — no album titles on the page)
- Folder and file names sort predictably (numeric-aware)
- Loose files placed directly in `public/gallery/` appear as a miscellaneous album
- Supported formats: `.jpg`, `.jpeg`, `.png`, `.webp`, `.avif`, and browser-ready `.mp4`
- Convert iPhone `.mov` files to `.mp4` before adding them (Live Photo companion `.mov` files are usually not portfolio videos)
- Commit the web-ready files in `public/gallery/` and redeploy — media appear automatically

Raw client dumps can stay in a local `Photos/` folder (gitignored). Do not commit original HEIC/MOV dumps.

## Deploy to Vercel

1. Push this project to a Git repository (GitHub, GitLab, or Bitbucket)
2. Sign in at [vercel.com](https://vercel.com) and click **Add New Project**
3. Import the repository
4. Vercel detects Next.js automatically — use the default build settings
5. Deploy

Each push to your main branch triggers a new deployment.

## Connect a custom domain on Vercel

1. Open your project in the Vercel dashboard
2. Go to **Settings → Domains**
3. Add your domain (for example `uplevelcarpentry.com`)
4. Follow Vercel's DNS instructions at your domain registrar
5. Vercel provisions SSL automatically once DNS is verified

Update `siteConfig.seo.siteUrl` in `config/site.ts` to match your live domain.

## Project structure

```
app/              Pages and routes
components/       Header, Footer, Gallery, Lightbox, etc.
config/site.ts    Editable business information
lib/gallery.ts    Reads album folders at build time
public/brand/     Logo
public/about/     About portrait
public/gallery/   Portfolio albums (subfolders)
```

## Scripts

```bash
npm run dev      # Local development
npm run build    # Production build
npm run start    # Run production build locally
npm run lint     # ESLint
```
