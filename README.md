# Zihao (Jason) Zhang - Portfolio

Source for [TacoRav4.github.io](https://TacoRav4.github.io/), a static,
evidence-focused portfolio for Zihao (Jason) Zhang.

## Routes

- `/` - selected work, background, and contact links
- `/work/quickbin/` - QuickBin/JGI experience case study
- `/work/tonal-inference/` - recurrent tonal-inference research case study

## Local development

```bash
npm ci
npm run dev
```

The production checks are:

```bash
npm test
npm run lint
npx tsc --noEmit --incremental false
```

The default build uses `/` as its base path for the GitHub user site.

## Public-material boundary

This repository contains only the portfolio source, its tests, six approved
visual assets, and a phone-free public resume. The QuickBin case study uses
resume-level descriptions and newly drawn explanatory graphics; it does not
include JGI code, data, or internal artifacts. The tonal figures are unchanged
copies of assets already tracked in the public tonal-inference project. The
Connect Four item includes a portfolio evidence graphic, not recovered
coursework source.

## Deployment

Pushes to `main` run `.github/workflows/deploy-pages.yml`, which builds,
tests, lints, and type-checks the site, then deploys it to GitHub Pages using
GitHub's built-in `GITHUB_TOKEN`. No hosting credentials are stored in this
repository.
