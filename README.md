# GitHub Pages Recipe Catalog

A beautiful, mobile-first recipe catalog for your selected cooking recipes.

## Features

- 🍽️ **Beautiful interface** — Clean, modern design
- 🔍 **Search and filter** — Find recipes easily
- 🔄 **Filter by criteria** — vegetarian, quick, side dishes
- ⚡ **Sort options** — by time, health, or title
- 📱 **Mobile-first** — perfect for kitchen use
- 📋 **Step-by-step guidance** — clear visual instructions
- 💾 **Persistent catalog** — recipes stay saved

## How It Works

1. **Recipe data** in `data/selected-recipes.json`
2. **GitHub Actions** rebuilds the site when recipes change
3. **GitHub Pages** deploys the static site

## Adding Recipes

Edit `data/selected-recipes.json` and commit — the site auto-updates!

### Recipe Schema

```json
{
  "id": "recipe-slug",
  "title": "Recipe Title",
  "description": "Short description",
  "time": { "prep": 10, "cook": 20, "total": 30 },
  "servings": 2,
  "ingredients": [
    { "name": "Ingredient", "quantity": "Amount" }
  ],
  "steps": [
    { "order": 1, "title": "Step", "description": "What to do" }
  ],
  "tags": ["vegetarian", "quick"],
  "metadata": {
    "difficulty": "easy",
    "health": { "protein": 1, "veg": "high", "carb": "medium" }
  }
}
```

## Structure

```
data/
  selected-recipes.json
.github/workflows/
  deploy.yml
index.html
README.md
```

## Deployment

The site automatically deploys to GitHub Pages when pushing to `main` and updating recipes.

To enable:
1. Go to **Settings → Pages**
2. Select **GitHub Actions** as Source
3. Save

## License

MIT
