const catalogState = { recipes: [], mode: document.body.dataset.mode || 'catalog', recipeId: document.body.dataset.recipeId || null };
const basePath = document.body.dataset.basePath || './';
const absolute = (path) => new URL(path, window.location.origin + window.location.pathname.replace(/(?:recipes\/[^/]+\/)?(?:index\.html)?$/, '')).toString();
const asset = (path) => `${basePath}${path}`;

async function loadRecipes() {
  const response = await fetch(`${basePath}data/selected-recipes.json`, { cache: 'no-store' });
  if (!response.ok) throw new Error(`Could not load recipe data: ${response.status}`);
  const data = await response.json();
  catalogState.recipes = data.recipes || [];
  if (catalogState.mode === 'recipe') renderRecipePage(); else renderCatalog();
}

function photoFor(recipe, type = 'hero') {
  const photos = recipe.photos || [];
  return photos.find((photo) => photo.type === type) || photos[0] || null;
}

function recipePath(recipe) {
  return `${basePath}${recipe.path || `recipes/${recipe.slug || recipe.id}/`}`;
}

function searchableText(recipe) {
  return [
    recipe.title,
    recipe.description,
    (recipe.tags || []).join(' '),
    (recipe.ingredients || []).map((item) => item.name).join(' '),
    recipe.metadata?.cuisine,
    recipe.metadata?.main_ingredient,
    recipe.metadata?.meal_type,
    recipe.metadata?.healthy_balance,
    (recipe.nutrition?.vitamins || []).join(' '),
  ].join(' ').toLowerCase();
}

function nutritionFor(recipe) {
  return recipe.nutrition || recipe.metadata?.nutrition || null;
}

function nutritionSummary(recipe) {
  const nutrition = nutritionFor(recipe);
  if (!nutrition) return '';
  const score = nutrition.score ? `${nutrition.score}/10` : '?/10';
  const calories = nutrition.calories_kcal ? `~${nutrition.calories_kcal} kcal` : '~? kcal';
  const protein = nutrition.protein_g ? `~${nutrition.protein_g}g protein` : '~?g protein';
  return `<div class="nutrition-strip" aria-label="Nutrition estimate per serving">
    <span>📊 ${score}</span>
    <span>🔥 ${calories}</span>
    <span>💪 ${protein}</span>
  </div>`;
}

function renderNutritionPanel(recipe) {
  const nutrition = nutritionFor(recipe);
  if (!nutrition) return '';
  const vitamins = (nutrition.vitamins || []).join(', ') || 'varies by ingredients';
  const sodium = nutrition.sodium_mg ? `~${nutrition.sodium_mg} mg sodium` : (nutrition.salt_g ? `~${nutrition.salt_g} g salt` : 'season to taste');
  return `<section class="content-panel nutrition-panel">
      <h2>Nutrition estimate</h2>
      <p class="estimate-note">Per serving · rough cooking estimate, not medical advice.</p>
      <div class="nutrition-grid">
        <div><span>Score</span><strong>${nutrition.score || '?'} / 10</strong></div>
        <div><span>Calories</span><strong>~${nutrition.calories_kcal || '?'} kcal</strong></div>
        <div><span>Protein</span><strong>~${nutrition.protein_g || '?'} g</strong></div>
        <div><span>Sugar</span><strong>~${nutrition.sugar_g || '?'} g</strong></div>
        <div><span>Sodium/salt</span><strong>${sodium}</strong></div>
        <div><span>Vitamins</span><strong>${vitamins}</strong></div>
      </div>
      ${nutrition.note ? `<p class="visual-cue">${nutrition.note}</p>` : ''}
    </section>`;
}

function renderCatalog() {
  const featured = catalogState.recipes[0];
  const heroPhoto = featured ? photoFor(featured) : null;
  const hero = document.querySelector('[data-hero-photo]');
  if (hero && heroPhoto) {
    hero.innerHTML = `<div class="photo-frame"><img src="${asset(heroPhoto.src)}" alt="${heroPhoto.alt || featured.title}"></div><figcaption>${heroPhoto.caption || featured.title}</figcaption>`;
  }
  updateCatalog();
  document.querySelector('[data-search]')?.addEventListener('input', updateCatalog);
  document.querySelector('[data-filter]')?.addEventListener('change', updateCatalog);
  document.querySelector('[data-sort]')?.addEventListener('change', updateCatalog);
}

function updateCatalog() {
  const query = (document.querySelector('[data-search]')?.value || '').trim().toLowerCase();
  const filter = document.querySelector('[data-filter]')?.value || 'all';
  const sort = document.querySelector('[data-sort]')?.value || 'newest';
  let recipes = [...catalogState.recipes];
  if (query) recipes = recipes.filter((recipe) => searchableText(recipe).includes(query));
  if (filter !== 'all') {
    recipes = recipes.filter((recipe) => {
      if (filter === 'quick') return recipe.time?.total <= 30;
      if (filter === 'vegetarian') return recipe.metadata?.vegetarian === true || (recipe.tags || []).includes('vegetarian');
      if (filter === 'main') return recipe.metadata?.meal_type === 'main';
      if (filter === 'side') return recipe.metadata?.meal_type === 'side' || (recipe.tags || []).includes('side-dish');
      return (recipe.tags || []).includes(filter);
    });
  }
  recipes.sort((a, b) => {
    if (sort === 'time') return (a.time?.total || 999) - (b.time?.total || 999);
    if (sort === 'title') return a.title.localeCompare(b.title);
    if (sort === 'health') return healthScore(b) - healthScore(a);
    return new Date(b.selected_at || 0) - new Date(a.selected_at || 0);
  });
  const grid = document.querySelector('[data-recipe-grid]');
  const empty = document.querySelector('[data-empty]');
  const count = document.querySelector('[data-count]');
  if (count) count.textContent = `${recipes.length} recipe${recipes.length === 1 ? '' : 's'}`;
  if (!grid) return;
  grid.innerHTML = recipes.map(renderCard).join('');
  if (empty) empty.style.display = recipes.length ? 'none' : 'block';
}

function healthScore(recipe) {
  const nutrition = nutritionFor(recipe);
  if (nutrition?.score) return nutrition.score;
  const health = recipe.metadata?.health || {};
  return (health.veg === 'high' ? 3 : 1) + (health.protein || 0) + (health.carb === 'low' ? 1 : 0);
}

function renderCard(recipe) {
  const photo = photoFor(recipe);
  const image = photo ? `<img src="${asset(photo.src)}" alt="${photo.alt || recipe.title}">` : '<span aria-hidden="true">🥬</span>';
  return `<a class="recipe-card" href="${recipePath(recipe)}">
    <div class="card-photo">${image}<span class="card-badge">${recipe.time?.total || '?'} min</span></div>
    <div class="card-body">
      <h3 class="card-title">${recipe.title}</h3>
      <p class="card-desc">${recipe.description}</p>
      <div class="meta">
        <span class="pill green">${recipe.servings} servings</span>
        <span class="pill">${recipe.metadata?.difficulty || 'easy'}</span>
        <span class="pill">${recipe.metadata?.main_ingredient || recipe.tags?.[0] || 'recipe'}</span>
      </div>
      ${nutritionSummary(recipe)}
      <div class="meta">${(recipe.tags || []).slice(0, 4).map((tag) => `<span class="pill">#${tag}</span>`).join('')}</div>
    </div>
  </a>`;
}

function renderRecipePage() {
  const recipe = catalogState.recipes.find((item) => item.id === catalogState.recipeId || item.slug === catalogState.recipeId);
  if (!recipe) {
    document.querySelector('main').innerHTML = '<section class="content-panel"><h1>Recipe not found</h1><p>This recipe is not in the catalog yet.</p><p><a href="../../">Back to catalog</a></p></section>';
    document.title = 'Recipe not found · Cooking Catalog';
    return;
  }
  document.title = `${recipe.title} · Cooking Catalog`;
  const main = document.querySelector('[data-recipe-page]');
  const photos = recipe.photos || [];
  main.innerHTML = `<section class="recipe-hero">
    <a class="back-link" href="${basePath}">← Back to catalog</a>
    <p class="eyebrow">${recipe.metadata?.main_ingredient || 'Selected recipe'}</p>
    <h1>${recipe.title}</h1>
    <p class="recipe-summary">${recipe.description}</p>
    <div class="meta">
      <span class="pill green">⏱ ${recipe.time?.total || '?'} min total</span>
      <span class="pill">Prep ${recipe.time?.prep || '?'} min</span>
      <span class="pill">Cook ${recipe.time?.cook || '?'} min</span>
      <span class="pill">${recipe.servings} servings</span>
      <span class="pill">${recipe.metadata?.difficulty || 'easy'}</span>
    </div>
    <section class="content-panel">
      <h2>Ingredients</h2>
      <ul class="ingredients">${recipe.ingredients.map((item) => `<li><strong>${item.name}</strong><span class="qty">${item.quantity}${item.optional ? ' · optional' : ''}</span></li>`).join('')}</ul>
    </section>
    <section class="content-panel">
      <h2>Cooking steps</h2>
      <ol class="steps">${recipe.steps.map((step) => `<li><div><div class="step-title">${step.title}</div><div>${step.description}</div>${step.visual ? `<div class="visual-cue">Look for: ${step.visual}</div>` : ''}</div></li>`).join('')}</ol>
    </section>
    ${renderNutritionPanel(recipe)}
    <section class="content-panel">
      <h2>Healthy balance</h2>
      <p>${recipe.metadata?.healthy_balance || 'Vegetable-forward, balanced where possible, and ready quickly. Add white beans, eggs, tofu, fish, or chicken if you want a more complete protein-rich dinner.'}</p>
    </section>
  </section>
  <aside class="photo-stack" aria-label="Recipe photos">
    ${photos.map((photo) => `<figure class="recipe-photo"><div class="img-wrap"><img src="${asset(photo.src)}" alt="${photo.alt || recipe.title}"></div><figcaption>${photo.caption || ''}</figcaption></figure>`).join('')}
    <section class="content-panel">
      <h2>Photo guide</h2>
      <p><strong>Prep:</strong> ${recipe.metadata?.visual_guide?.prep_shot || 'Organize ingredients before cooking.'}</p>
      <p><strong>Mid-cook:</strong> ${recipe.metadata?.visual_guide?.mid_cook || 'Watch texture and color.'}</p>
      <p><strong>Finished:</strong> ${recipe.metadata?.visual_guide?.finished || 'Plate and serve warm.'}</p>
    </section>
  </aside>`;
}

loadRecipes().catch((error) => {
  console.error(error);
  document.querySelector('main').innerHTML = `<section class="content-panel"><h1>Could not load recipes</h1><p>${error.message}</p></section>`;
});
