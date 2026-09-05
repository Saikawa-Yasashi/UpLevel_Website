# Gallery admin OAuth checklist

Complete these steps once so the client can use **Login with GitHub** at `/admin/`.

## 1. Deploy the free authenticator

1. Open [sveltia/sveltia-cms-auth](https://github.com/sveltia/sveltia-cms-auth)
2. Use **Deploy to Cloudflare Workers** (or clone and `wrangler deploy`)
3. Copy the Worker URL, for example:
   `https://uplevel-cms-auth.<your-subdomain>.workers.dev`

## 2. Create a GitHub OAuth App

1. Go to [GitHub → Developer settings → OAuth Apps → New](https://github.com/settings/applications/new)
2. Set:
   - **Application name:** Uplevel Carpentry CMS
   - **Homepage URL:** your live site (for example `https://uplevelcarpentry.com`)
   - **Authorization callback URL:** `https://YOUR-WORKER-URL/callback`
3. Create the app and generate a **Client Secret**
4. Copy **Client ID** and **Client Secret**

## 3. Configure the Worker

In the Cloudflare Worker settings, add encrypted environment variables:

- `GITHUB_CLIENT_ID` = Client ID from step 2
- `GITHUB_CLIENT_SECRET` = Client Secret from step 2

Redeploy the Worker if required.

## 4. Point the CMS at the Worker

In [`public/admin/config.yml`](../public/admin/config.yml), uncomment and set `base_url`:

```yaml
backend:
  name: github
  repo: Saikawa-Yasashi/UpLevel_Website
  branch: main
  base_url: https://sveltia-cms-auth.kacie-b49.workers.dev
```

Commit and push to `main`.

## 5. Invite the client

1. Invite their GitHub username as a repository **collaborator with write access**
2. Send them: `https://YOUR-DOMAIN/admin/`
3. They sign in with GitHub, drag albums/photos, and click **Save**

Do not commit Client ID/Secret into this repository. Keep them only in Cloudflare.
