# Uplevel Carpentry Website

A polished, static-first website for Uplevel Carpentry — custom homes and fine carpentry in Michigan's Upper Peninsula.

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

Update phone, email, service area, owner name, About copy, and services there. Changes apply across the header, footer, contact page, and SEO metadata.

## Change the phone number

1. Open `config/site.ts`
2. Update `phone` (display text) and `phoneHref` (tel link), for example:

```ts
phone: "(906) 555-1234",
phoneHref: "tel:+19065551234",
```

## Change the email

1. Open `config/site.ts`
2. Update `email` and `emailHref`

## Edit About copy

1. Open `config/site.ts`
2. Edit the `about` and `philosophy` sections
3. Home page hero text can be changed via `tagline` and `description`

## Add gallery photographs

1. Put image files in **`public/gallery/`**
2. Supported formats: `.jpg`, `.jpeg`, `.png`, `.webp`, `.avif`
3. Use descriptive filenames like `kitchen-walnut-cabinets-01.jpg`
4. Commit and redeploy — images appear automatically

No React or code edits are required.

## Configure the contact form (Formspree)

1. Create a form at [formspree.io](https://formspree.io)
2. Copy your form endpoint URL
3. Create `.env.local` from the example:

```bash
cp .env.example .env.local
```

4. Set the endpoint:

```env
NEXT_PUBLIC_FORMSPREE_ENDPOINT=https://formspree.io/f/your-form-id
```

5. Restart the dev server

If the endpoint is not configured, the contact page still works — visitors can call or email, and a development notice appears on the form.

## Deploy to Vercel

1. Push this project to a Git repository (GitHub, GitLab, or Bitbucket)
2. Sign in at [vercel.com](https://vercel.com) and click **Add New Project**
3. Import the repository
4. Vercel detects Next.js automatically — use the default build settings
5. Add `NEXT_PUBLIC_FORMSPREE_ENDPOINT` under **Settings → Environment Variables**
6. Deploy

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
components/       Header, Footer, Gallery, ContactForm, etc.
config/site.ts    Editable business information
lib/gallery.ts    Reads gallery images at build time
public/brand/     Logo
public/gallery/   Project photos (drop files here)
```

## Scripts

```bash
npm run dev      # Local development
npm run build    # Production build
npm run start    # Run production build locally
npm run lint     # ESLint
```
