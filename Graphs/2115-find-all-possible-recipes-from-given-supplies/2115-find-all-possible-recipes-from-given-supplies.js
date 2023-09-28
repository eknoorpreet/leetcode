/**
 * @param {string[]} recipes - An array of recipe names.
 * @param {string[][]} ingredients - A 2D array of ingredient lists for each recipe.
 * @param {string[]} supplies - An array of initially available ingredients.
 * @return {string[]} - An array of recipes that can be created from the supplies.
 */
function findAllRecipes(recipes, ingredients, supplies) {
  // Initialize an array to store the result.
  const result = [];

  // Put all supplies into a Set for efficient lookups.
  const available = new Set(supplies);

  // Create a map to associate ingredients with the recipes that need them.
  const ingredientToRecipes = new Map();

  // Create a map to store the in-degree (number of unsatisfied dependencies) for each recipe (recipe => numbe of ingredients are not available for it).
  const inDegree = new Map();

  // Iterate through the list of recipes and their ingredients.
  for (let i = 0; i < recipes.length; i++) {
    const recipe = recipes[i];
    let unvailable = 0; // Counter for non-available ingredients in a recipe.

    // Iterate through the ingredients of the current recipe.
    for (const ing of ingredients[i]) {
      if (!available.has(ing)) {
        //we only add those ingredients to the map which we don't have to the
        //recipes that require them: {ingUnavailable => [dependentRecipes]}

        // ingredientToRecipes.set(ing, (ingredientToRecipes.get(ing) || new Set()).add(recipes[i]));
        ingredientToRecipes.set(
          ing,
          ingredientToRecipes.get(ing)
            ? [...ingredientToRecipes.get(ing), recipe]
            : [recipe]
        );

        // Increment the nonAvailable counter for this recipe.
        unvailable++;
      }
    }

    // Check if all ingredients for this recipe are available.
    if (unvailable === 0) {
      // If all ingredients are available, add the recipe to the result.
      result.push(recipe);
    } else {
      // If some ingredients are not available, set the in-degree for this recipe.
      // inDegree: {recipe => countOfIngUnavailable}
      // when the count becomes 0, we can make the recipe!
      inDegree.set(recipe, unvailable);
    }
  }

  // Topological Sort: Start with recipes that have no unsatisfied dependencies.
  // We have already made a few recipes that we could (whose inDegree (nonAvailable)
  //was 0). Time to use them as supplies from the result array
  for (let i = 0; i < result.length; i++) {
    const recipe = result[i];
    //is the (now available) recipe a (prev) unavailable ing required by other recipes
    if (ingredientToRecipes.has(recipe)) {
      // For each dependent recipe, decrement its in-degree.
      for (const rcp of ingredientToRecipes.get(recipe)) {
        inDegree.set(rcp, inDegree.get(rcp) - 1);
        //if the recipe has 0 unavailable ingredients, you can make it
        if (inDegree.get(rcp) === 0) {
          // If the in-degree becomes 0, add the dependent recipe to the result.
          result.push(rcp);
        }
      }
    }
  }

  // Return the result array, which contains all the recipes that can be created.
  return result;
}

//Traditional Topological Sort (BFS with a queue)
function findAllRecipesQueue(recipes, ingredients, supplies) {
  const result = [];
  const available = new Set(supplies);
  const ingToRecipes = new Map();
  const inDegree = new Map();

  for (let i = 0; i < recipes.length; i++) {
    const recipe = recipes[i];
    for (let ing of ingredients[i]) {
      ingToRecipes.set(ing, []);
    }
    inDegree.set(recipe, 0);
  }

  for (let i = 0; i < recipes.length; i++) {
    const recipe = recipes[i];
    for (let ing of ingredients[i]) {
      if (!available.has(ing)) {
        ingToRecipes.set(
          ing,
          ingToRecipes.get(ing) ? [...ingToRecipes.get(ing), recipe] : [recipe]
        );
        inDegree.set(recipe, inDegree.get(recipe) + 1);
      }
    }
  }

  const queue = [];

  for (let i = 0; i < recipes.length; i++) {
    if (inDegree.get(recipes[i]) === 0) queue.push(recipes[i]);
  }

  while (queue.length) {
    const recipe = queue.shift();
    result.push(recipe);
    if (ingToRecipes.has(recipe)) {
      for (let rcp of ingToRecipes.get(recipe)) {
        inDegree.set(rcp, inDegree.get(rcp) - 1);
        if (inDegree.get(rcp) === 0) queue.push(rcp);
      }
    }
  }
  return result;
}

/*

Time Complexity:

Iterating Through Recipes and Ingredients: The primary loop iterates through all recipes and their ingredients.
In the worst case, it iterates through all recipes and all ingredients, leading to a time complexity of O(R * I), where R is the number of recipes and I is the maximum number of ingredients in a single recipe.

Topological Sort: The topological sorting step also takes O(R * I) time in the worst case, as it processes each recipe and its dependencies.
Overall, the time complexity of the code is O(R * I), where R is the number of recipes, and I is the maximum number of ingredients in a single recipe.

Space Complexity:

Data Structures: The primary space-consuming data structures are result, available, ingredientToRecipes, and inDegree.
The space used by these data structures is directly related to the number of recipes and ingredients.

Result Array: The result array can contain up to R recipe names, where R is the number of recipes.

Available Set: The available Set contains the initial supplies, so its size is proportional to the number of initial supplies, which can be at most S, where S is the number of supplies.

ingredientToRecipes Map: The ingredientToRecipes Map stores mappings for ingredients to recipes that require them.
Its size is determined by the number of ingredients that are not initially available. In the worst case, it can contain information about all ingredients, resulting in a space complexity of O(I).

inDegree Map: The inDegree Map stores the in-degrees of recipes. Its size is determined by the number of recipes that have unsatisfied dependencies. In the worst case, it can contain information about all recipes, resulting in a space complexity of O(R).

Overall, the space complexity of the code is determined by the largest of these space-consuming factors, which is O(I) or O(R), depending on whether the number of ingredients or the number of recipes is larger.

*/
