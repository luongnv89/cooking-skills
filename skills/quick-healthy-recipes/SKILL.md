---
name: quick-healthy-recipes
description: "Generate exactly 3 quick healthy recipes with quantities, visual cues, and process/final images from food photos, ingredients, cravings, or recipe search. Don't use for restaurants, meal plans, baking, or medical diets."
license: MIT
effort: medium
metadata:
  version: 1.2.0
  author: "Luong NGUYEN <luongnv89@gmail.com>"
---

# Quick Healthy Recipes

Turn food photos, ingredient lists, or a short cooking desire into **exactly 3** practical recipes that are simple, fast, visual, and healthy enough for a normal weeknight.

## When to use

Use this skill when the user asks things like:

- "what can I cook with this?" plus an image
- "find the best recipe for these ingredients"
- "I have eggs, rice, and spinach — dinner ideas?"
- "I want something healthy and quick tonight"

Do not use it for restaurant recommendations, long meal plans, baking projects, special-diet medical advice, or gourmet cooking that requires advanced technique.

## Core principles

Optimize every answer for:

1. **Simple** — few extra ingredients; favor common pantry items.
2. **Fast** — target 15–30 minutes, max 40 minutes unless the user explicitly wants slow cooking.
3. **Healthy** — include vegetables/fiber, useful protein, and reasonable carbs or fats when possible.
4. **Practical tonight** — no special equipment, rare ingredients, or chef techniques.
5. **Low-friction** — if an ingredient is uncertain, give a safe assumption and an easy substitute.
6. **Visual** — show what each recipe should look like from prep to mid-cook to finished plate, and generate, attach, or download demonstration images when the runtime supports it.
7. **Quantified** — include servings and ingredient quantities whenever enough context is available; use estimates when the user did not provide exact amounts.
8. **Source-aware** — if the user asks to search or find recipes, use web sources for inspiration, cite them briefly, and handle images with licensing/attribution care.

Common pantry items are acceptable: salt, pepper, oil, butter, garlic, onion, vinegar, lemon, soy sauce, eggs, rice, pasta, bread, beans, yogurt, cheese, herbs, and basic spices.

## Workflow

### 1. Understand the input

If images are provided, inspect them before suggesting recipes. Identify:

- Main ingredient(s)
- Freshness or cleaning concerns
- Parts that cook differently, such as stems vs leaves
- Any visible uncertainty

If text is provided, extract:

- Ingredients available
- Desired dish, cuisine, or constraint
- Timing clues like "tonight", "quick", or "lunch"

Ask a question only when a safety-critical detail is missing. Otherwise, make a reasonable assumption and state it briefly.

### 2. Safety filter

Do not confidently identify or recommend eating high-risk unknown items such as wild mushrooms, unknown berries, spoiled food, raw seafood, or foraged plants. If the food might be unsafe, say so and suggest using only verified ingredients.

Do not give medical nutrition advice. For allergies, pregnancy, diabetes, kidney disease, or other medical constraints, keep guidance general and tell the user to follow their clinician's advice.

### 3. Build 3 recipe options

If the user explicitly asks to search, find the best recipe, or use recipe results, search the web before finalizing. Prefer reputable recipe pages, official food publications, or open recipe datasets. Use the sources to inform technique and quantities, but adapt the final recipes to the user's ingredients and the quick/healthy constraints.

Create exactly 3 distinct options. Each option should vary by cooking style or meal format, for example:

- Stir-fry / sauté
- Soup / stew
- Bowl / salad / pasta
- Omelet / egg dish
- Sheet-pan / pan-roast

For each recipe, keep ingredient additions short. Prefer one protein booster and one carb/fiber base when the raw ingredients alone are not balanced.

### 4. Add quantities

Default to **2 servings** unless the user states otherwise. Provide practical quantities in metric first, with household equivalents when useful. If the input is visual and exact weight is unknown, estimate honestly, for example "about 1 bunch / 400–500 g chard".

For each recipe include:

- Servings
- Ingredient quantities
- Prep/cook time split when useful
- Optional swaps only when they reduce friction

### 5. Add visual guidance and images

Give step-by-step visual cues so the user knows what success looks like:

- Name the visible state at each key step, such as "stems glossy and softened" or "leaves just wilted".
- For **each of the 3 recipes**, provide a compact 3-shot visual plan: prep/ingredients, mid-cook checkpoint, and finished plate.
- When image generation or attachment tools are available, create or attach **3 demonstration images per recipe**: prep, mid-cook, and finished output. Keep them realistic, home-kitchen, and instructional — not fancy restaurant styling.
- If tool limits make 9 images impractical, prioritize the Pick tonight recipe with 3 generated/attached images, then include text-only 3-shot guides for the other two recipes.
- If image tools are not available, include the compact 3-shot photo guide for every recipe.

When web search finds recipe pages with useful images:

- Download or attach images only when they are clearly permitted to reuse, user-owned, public-domain/open-license, or explicitly provided by the user. Preserve source URLs and attribution when used.
- If reuse rights are unclear, do **not** download copyrighted recipe photos. Link/cite the source instead and generate original demonstration images or provide shot descriptions.
- Never hotlink images as if they are owned by the user; keep provenance clear.

Do not generate or download images for unsafe, uncertain, or medical-diet situations.

### 6. Rank for tonight

Put the best fit first. The first recipe should usually be the fastest and most realistic with the least extra shopping.

## Output format

Use this exact structure. Keep it concise but specific.

```markdown
Looks like: [ingredient identification or parsed request]
Assumption: [one short assumption, including default servings if needed]

1. [Recipe name] — [total time], [servings]
Best if: [why this is the top fit]
Ingredients:
- [quantity] [ingredient]
- [quantity] [ingredient]
Steps:
1. [action + visual cue]
2. [action + visual cue]
3. [action + visual cue]
Healthy balance: [protein + veg/fiber + carb/fat note]

2. [Recipe name] — [total time], [servings]
Best if: [why choose it]
Ingredients:
- [quantity] [ingredient]
- [quantity] [ingredient]
Steps:
1. [action + visual cue]
2. [action + visual cue]
3. [action + visual cue]
Healthy balance: [protein + veg/fiber + carb/fat note]

3. [Recipe name] — [total time], [servings]
Best if: [why choose it]
Ingredients:
- [quantity] [ingredient]
- [quantity] [ingredient]
Steps:
1. [action + visual cue]
2. [action + visual cue]
3. [action + visual cue]
Healthy balance: [protein + veg/fiber + carb/fat note]

Pick tonight: [one sentence recommendation]

Photo guide:
- [Recipe 1] Photo 1: [prep/ingredient shot]
- [Recipe 1] Photo 2: [mid-cook visual checkpoint]
- [Recipe 1] Photo 3: [finished dish]
- [Recipe 2] Photo 1: [prep/ingredient shot]
- [Recipe 2] Photo 2: [mid-cook visual checkpoint]
- [Recipe 2] Photo 3: [finished dish]
- [Recipe 3] Photo 1: [prep/ingredient shot]
- [Recipe 3] Photo 2: [mid-cook visual checkpoint]
- [Recipe 3] Photo 3: [finished dish]

Images used/generated:
- [If attached/downloaded/generated, list files or URLs grouped by recipe and label prep/mid-cook/finished. Include source attribution for downloaded images.]
```

If actual image files are generated, attach or reference them immediately after the text. Keep generated images instructional: overhead or 45-degree kitchen photos, realistic portions, clear ingredients, no misleading impossible results.

## Acceptance criteria

A successful response must be easy to verify:

- Exactly 3 numbered recipes, no more and no fewer.
- Each recipe has time, servings, quantities, steps with visual cues, and a healthy-balance note.
- Each recipe has a prep, mid-cook, and finished-output photo guide.
- Image files or URLs are grouped by recipe when available.
- Downloaded images include source attribution and are used only when reuse rights are clear.
- If image generation, downloading, or search is unavailable, the response says so briefly and still provides shot descriptions.

Expected output shape:

```markdown
Looks like: ...
Assumption: ...

1. Recipe name — 25 min, 2 servings
...
Healthy balance: ...

2. Recipe name — 30 min, 2 servings
...
Healthy balance: ...

3. Recipe name — 35 min, 2 servings
...
Healthy balance: ...

Pick tonight: ...
Photo guide:
- [Recipe 1] Photo 1: ...
...
Images used/generated:
- [Recipe 1] prep: ...
```

## Quality checklist

Before finalizing, check:

- Exactly 3 recipes are present
- Each recipe can be cooked without special equipment
- Extra ingredients are common and limited
- Quantities and servings are included or clearly estimated
- Steps include visual cues, not just actions
- A 3-photo guide is included for every recipe
- Generated/attached/downloaded images are included for every recipe when tools and rights allow; otherwise the limitation is stated briefly
- Downloaded images have clear reuse permission or attribution; unclear-rights images are linked/cited, not copied
- The first recipe is the best fit for tonight
- At least two recipes include a realistic protein path
- Any uncertainty from images is stated rather than hidden

If a recipe fails the checklist, replace it before answering.
