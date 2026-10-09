# Fable Admin

A static dashboard for managing the Fable Launcher ecosystem. The app is built with plain HTML, CSS, and JavaScript and can be served locally or deployed to Vercel as a static site.

## Local development

From the project root:

```bash
cd fable-admin
python -m http.server 8000
```

Then open `http://localhost:8000` in a browser.

## Project structure

- `index.html` – shell layout and app entry point
- `style.css` – dark dashboard styling and responsive layout
- `script.js` – mock data, SPA navigation, and interactive UI behavior
- `src/assets/` – static files such as branding and placeholder media

## Notes

- The app uses mock/local data and is structured so API endpoints can replace the mock data later.
- No backend, database, or real credentials are included.
- The interface is intentionally desktop-first while remaining mobile responsive.
