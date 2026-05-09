# GitHub Pages Recipe Catalog

A mobile-first visual cooking catalog for selected recipes.

## Features

- **Dedicated recipe URLs** — each recipe has its own path, e.g. `/recipes/quick-chard-saute/`
- **Recipe photos** — catalog cards, hero sections, and detail pages use real recipe photos
- **Search and filter** — search by title, ingredient, tag, cuisine, or style
- **Sort options** — newest selected, fastest, healthiest, or title A–Z
- **Cooking mode details** — ingredients, quantities, steps, visual cues, and photo guide
- **Static hosting** — no backend; deploys with GitHub Pages

## Live Site

After GitHub Pages is enabled, the catalog will be available at:

https://luongnv89.github.io/cooking-skills/

## Recipe URLs

Each recipe gets its own static folder under `recipes/`:

```text
recipes/quick-chard-saute/index.html
```

The recipe data points to that page using the `path` field:

```json
{
  "id": "quick-chard-saute",
  "slug": "quick-chard-saute",
  "path": "recipes/quick-chard-saute/"
}
```

## Adding Photos

Put recipe photos under:

```text
assets/recipes/<recipe-id>/
```

Then reference them in `data/selected-recipes.json`:

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

The catalog will use the first photo for cards and the `hero` photo for the featured visual.

## Adding a Recipe

1. Add recipe data to `data/selected-recipes.json`.
2. Add photos to `assets/recipes/<recipe-id>/`.
3. Create a static route at `recipes/<recipe-id>/index.html` using an existing recipe page as a template.
4. Set `data-recipe-id="<recipe-id>"` in that page.
5. Commit and push — GitHub Actions deploys the site.

## Data Schema

```json
{
  "id": "recipe-slug",
  "slug": "recipe-slug",
  "path": "recipes/recipe-slug/",
  "title": "Recipe Title",
  "description": "Short description",
  "selected_at": "2026-05-09T16:30:00Z",
  "time": { "prep": 10, "cook": 20, "total": 30 },
  "servings": 2,
  "photos": [
    {
      "type": "hero",
      "src": "assets/recipes/recipe-slug/photo.jpg",
      "alt": "Accessible photo description",
      "caption": "Cooking checkpoint caption"
    }
  ],
  "ingredients": [
    { "name": "Ingredient", "quantity": "Amount", "optional": false }
  ],
  "steps": [
    {
      "order": 1,
      "title": "Step title",
      "description": "What to do",
      "visual": "What success should look like"
    }
  ],
  "tags": ["vegetarian", "quick"],
  "metadata": {
    "difficulty": "easy",
    "meal_type": "side",
    "main_ingredient": "Swiss chard",
    "protein_type": "none",
    "vegetarian": true,
    "health": { "protein": 0, "veg": "high", "carb": "low" }
  }
}
```

## Development

Run locally:

```bash
python3 -m http.server 8000
```

Then open:

- Catalog: http://localhost:8000/
- Recipe page: http://localhost:8000/recipes/quick-chard-saute/

## Deployment

GitHub Pages deploys through `.github/workflows/deploy.yml` when relevant files change.

To enable:

1. Go to **Settings → Pages**
2. Select **GitHub Actions** as Source
3. Save

## License

MIT
