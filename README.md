# AcmeTravel WhatsApp Prototype

A static, public prototype for testing a WhatsApp-shared flight poll artifact.

Canonical test URL:

```text
https://pierosierra.github.io/AcmeShare/flights/lisbon-weekend/
```

## Local Development

```bash
npm install
npm run dev -- --host 0.0.0.0
```

Open the Vite URL under `/AcmeShare/flights/lisbon-weekend/` to match the
GitHub Pages base path.

## Production Preview

```bash
npm run build
npm run preview -- --host 0.0.0.0
```

Verify:

- `/AcmeShare/flights/lisbon-weekend/` loads directly.
- `dist/flights/lisbon-weekend/index.html` contains the Open Graph tags.
- `dist/assets/og-flight-lisbon.png` is public after deploy.

## Deploy

Push `main` to the `AcmeShare` GitHub repo and enable GitHub Pages with source
set to GitHub Actions. The workflow in `.github/workflows/deploy.yml` builds and
publishes `dist`.

WhatsApp may cache previews. If OG metadata changes, test with a cache-busting
query string such as:

```text
https://pierosierra.github.io/AcmeShare/flights/lisbon-weekend/?v=2
```
