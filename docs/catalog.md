# Cooking Skills Catalog

A beautiful, mobile-first recipe catalog hosted on GitHub Pages. Track your selected recipes, follow clear visual instructions, and cook with confidence.

## Features

- 🍽️ **Beautiful interface** — Clean, modern design optimized for cooking
- 🔍 **Search and filter** — Find recipes by name, ingredients, or tags
- 🔄 **Filter by criteria** — vegetarian, quick meals, side dishes
- ⚡ **Sort options** — by time, health, or alphabetical order
- 📱 **Mobile-first** — perfect layout for phone use in the kitchen
- 📋 **Step-by-step guidance** — clear visual instructions for each recipe
- 💾 **Persistent catalog** — your recipes stay saved and accessible

## Demo

You can try the catalog at: https://luongnv89.github.io/cooking-skills/

## How It Works

1. **Recipe data** is stored in `data/selected-recipes.json`
2. **GitHub Actions** automatically rebuilds the site when recipe data changes
3. **GitHub Pages** deploys the static site for public access

## Adding Recipes

To add a new recipe:

1. Edit `data/selected-recipes.json`
2. Add your recipe following the schema below
3. Commit and push — the site will auto-update!

### Recipe Schema

```json
{
  "id": "recipe-slug",
  "title": "Recipe Title",
  "description": "Short description of the recipe",
  "time": {
    "prep": 10,
    "cook": 20,
    "total": 30
  },
  "servings": 2,
  "ingredients": [
    {
      "name": "Ingredient name",
      "quantity": "Amount needed"
    }
  ],
  "steps": [
    {
      "order": 1,
      "title": "Step title",
      "description": "What to do"
    }
  ],
  "tags": ["vegetarian", "quick", "side-dish"],
  "metadata": {
    "difficulty": "easy",
    "meal_type": "main",
    "cuisine": "french",
    "health": {
      "protein": 1,
      "veg": "high",
      "carb": "medium"
    }
  }
}
```

## Structure

```
cooking-skills/
├── data/
│   └── selected-recipes.json   # Your recipe catalog
├── .github/workflows/
│   └── deploy.yml              # GitHub Pages deployment
├── index.html                  # Main catalog page
└── README.md                   # This file
```

## Development

To run locally:

```bash
# Serve the site with Python's built-in server
python3 -m http.server 8000

# Or use any static file server
npx serve .
```

Then visit: http://localhost:8000

## Deployment

The site is automatically deployed to GitHub Pages when you push to the `main` branch and update recipes in `data/`.

To enable GitHub Pages:

1. Go to your repository's **Settings** page
2. Click on **Pages** in the left sidebar
3. Under **Source**, select ** GitHub Actions**
4. Save changes

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-recipe`)
3. Commit your changes (`git commit -m 'Add some amazing recipe'`)
4. Push to the branch (`git push origin feature/amazing-recipe`)
5. Open a Pull Request

## License

MIT License - see [LICENSE](LICENSE) for details.

---

Built with 🍅 for cooking enthusiasts everywhere!
