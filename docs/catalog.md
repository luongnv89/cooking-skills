# Catalog Authoring Guide

This document explains how the GitHub Pages cooking catalog works and how to add selected recipes with photos.

## What the site includes

- `index.html` — searchable and filterable recipe catalog
- `recipes/<recipe-id>/index.html` — dedicated recipe path for each selected recipe
- `assets/css/catalog.css` — shared design system
- `assets/js/catalog.js` — shared catalog and recipe rendering logic
- `assets/recipes/<recipe-id>/` — recipe photos
- `data/selected-recipes.json` — structured recipe data

## Dedicated recipe paths

Every recipe should have a stable path:

```text
recipes/<recipe-id>/index.html
```

Example:

```text
recipes/quick-chard-saute/index.html
```

The page should set:

```html
<body data-mode="recipe" data-recipe-id="quick-chard-saute" data-base-path="../../">
```

The shared JavaScript loads `data/selected-recipes.json`, finds the matching recipe by `id` or `slug`, and renders the page.

## Photo requirements

Each recipe should include at least one real photo. Use multiple photos when available:

- `hero` — primary recipe/catalog card image
- `prep` — ingredients or prep checkpoint
- `mid-cook` — in-progress cooking checkpoint
- `finished` — finished plate

Store files here:

```text
assets/recipes/<recipe-id>/<photo-name>.jpg
```

Reference them in JSON:

```json
"photos": [
  {
    "type": "hero",
    "src": "assets/recipes/quick-chard-saute/fresh-chard.jpg",
    "alt": "Fresh Swiss chard with white stalks on a kitchen countertop",
    "caption": "Fresh chard before cooking: separate thick stems from tender leaves."
  }
]
```

## Recipe checklist

Before committing a new recipe, verify:

- [ ] `id` is stable and URL-safe
- [ ] `slug` matches `id`
- [ ] `path` points to `recipes/<id>/`
- [ ] At least one photo exists and loads
- [ ] Every photo has useful `alt` text
- [ ] Ingredients include quantities
- [ ] Steps include visual cues
- [ ] The recipe page exists at `recipes/<id>/index.html`
- [ ] The catalog card links to the recipe page

## Local verification

```bash
python3 -m http.server 8000
```

Open:

```text
http://localhost:8000/
http://localhost:8000/recipes/quick-chard-saute/
```

## Deployment

The GitHub Action in `.github/workflows/deploy.yml` publishes the static site to GitHub Pages when catalog files change, including:

- `index.html`
- `_config.yml`
- `assets/**`
- `data/**`
- `docs/**`
- `recipes/**`
- `skills/**`
- `.github/workflows/deploy.yml`
