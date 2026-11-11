# A.R.C. Disco — Nuxt website

The existing A.R.C. Disco site rebuilt with Nuxt 4. All 13 pages are generated as static HTML for GitHub Pages, with local images and fonts.

## Update the website

1. Open `content/pages/` in GitHub and choose the page you want to change (`home.html` is the homepage).
2. Click the pencil icon. Change the wording between the HTML tags, keeping the tags in place.
3. Commit your change to `main`. GitHub Actions automatically rebuilds and publishes the site.

Page titles and search descriptions are in `content/pages.json`. The menu, phone number and shared footer are in `app/components/SiteNavigation.vue`. Colours and styles are in `public/assets/site.css`. Images and fonts are in `public/assets/`.

Internal links in content should start with `/` (for example `/contact/` or `/assets/photo.jpg`). Nuxt adds the GitHub Pages project prefix automatically.

## Local development

Use Node.js 24:

```sh
npm ci
npm run dev
```

Open the local URL shown in the terminal, including `/arcdisco-static/`.

```sh
npm run generate
```

The generated website is in `.output/public`. `NUXT_APP_BASE_URL` changes the hosting prefix; it defaults to `/arcdisco-static/`.

## Deployment

Live site: https://matt3188.github.io/arcdisco-static/

The workflow in `.github/workflows/deploy.yml` builds and deploys on every push to `main`. GitHub repository Settings → Pages must use **GitHub Actions** as the source. This does not change the existing arcdisco.co.uk website or DNS.

## Enquiries

The contact and photo booth enquiry forms validate fields and open a prefilled email to info@arcdisco.co.uk. Visitors must send that email through their own email app. GitHub Pages cannot run a server-side email service.

## Browser checks

After generating, serve `.output/public` at `http://127.0.0.1:4173/arcdisco-static/`, install Chromium with `npx playwright install chromium`, and run `npm run test:e2e`. Set `PLAYWRIGHT_CHROMIUM_EXECUTABLE` to use an existing Chromium binary. The tests cover all pages and asset requests, mobile navigation, gallery controls and form validation.
