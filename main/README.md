# Fable Launcher website

The public Fable Launcher website uses React, TypeScript, Vite, Tailwind CSS 4, React Router, Framer Motion, and i18next. It includes the original reference site's home, download, news, article, privacy, terms, and not-found page architecture, adapted for Fable's actual Windows launcher.

## Run locally

```powershell
npm install
npm run dev -- --host 0.0.0.0
```

Vite prints the local URL when the server starts. The site is client-routed; static hosts should route unknown paths back to `index.html`.

## Build

```powershell
npm run typecheck
npm run build
npm run preview
```

`npm run build` regenerates the Fable news index from `content/blog/en/` and `content/blog/zh/`, type-checks the app, and builds the static site into `dist/`.

## Fable assets and release status

- `public/assets/fable-logo.png` is the shared Fable logo used by the navigation, footer, download page, screenshot placeholders, and favicon. `src/assets/logo.png` is the unchanged source copy.
- `src/assets/launcher/` contains explicitly labeled, replaceable screenshot placeholders. No reference-project screenshots are presented as Fable UI.
- `public/assets/backgrounds/` preserves the reference site's ambient Minecraft scenery and image treatment; it contains no launcher UI imagery.
- `src/brand.ts` holds the Fable version, future content route names, and nullable release/community URL placeholders. No release API is called.
- The download page shows Fable Launcher v0.1.1 Beta for Windows. Its download control stays disabled until an authorized public release URL is configured.
- News has no posts until Fable-specific articles are added. Privacy and terms routes explain that approved policies are not yet published; they make no legal or data-handling claims.
- English and Chinese UI strings are provided in `src/i18n/locales/`.

## Future content routes

These route names are recorded for later integration only and are not requested by the website:

- `GET /client/updates`
- `GET /client/announcements`
- `GET /client/ads`

## License

The upstream website's MIT license notice is preserved in [LICENSE](./LICENSE). Fable branding, copy, release information, and screenshot placeholders are Fable-specific.
