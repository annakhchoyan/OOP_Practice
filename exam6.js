class Recipe {
  #name;
  #ingredients;
  #instructions;

  constructor(name, ingredients, instructions) {
    this.#name = name;
    this.#ingredients = ingredients;
    this.#instructions = instructions;
  }

  get name() {
    return this.#name;
  }

  get ingredients() {
    return this.#ingredients;
  }

  get instructions() {
    return this.#instructions;
  }
}

class RecipeFinder {
   #recipes;

   constructor() {
    this.#recipes = [];
   }

   get recipes() {
    return this.#recipes;
   }

   addRecipe(name, ingredients, instructions) {
    const recipe = new Recipe(name, ingredients, instructions);
    this.#recipes.push(recipe);
   }

   searchRecipesByIngredients(ingredients) {
    const matchingRecipes = this.#recipes.filter(recipe => {
      const recipeIngredients = recipe.ingredients;
      return ingredients.every(ingredient => recipeIngredients.includes(ingredient));
    });
    return matchingRecipes;
   }

   viewRecipeDetails(recipe) {
    console.log(`Recipe: ${recipe.name}`);
    console.log('Ingredients:');
    recipe.ingredients.forEach(ingredient => console.log(`- ${ingredient}`));
    console.log('Instructions:');
    recipe.instructions.forEach((instruction, index) => console.log(`${index + 1}. ${instruction}`));
   }
}

const recipeFinder = new RecipeFinder();

recipeFinder.addRecipe(
  'Pasta with Tomato Sauce',
  ['pasta', 'tomatoes', 'olive oil', 'garlic', 'salt', 'pepper'],
  ['Boil pasta according to package instructions.', 'Sauté garlic in olive oil.', 'Add tomatoes and cook for 10 minutes.', 'Season with salt and pepper.', 'Toss pasta in the sauce and serve.']
);
recipeFinder.addRecipe(
  'Chicken Stir-Fry',
  ['chicken breast', 'vegetables', 'soy sauce', 'sesame oil', 'garlic', 'ginger'],
  ['Slice chicken into strips.', 'Sauté garlic and ginger in sesame oil.', 'Add chicken and cook until browned.', 'Add vegetables and stir-fry until cooked.', 'Season with soy sauce.', 'Serve hot.']
);
recipeFinder.addRecipe(
  'Omelette',
  ['eggs', 'milk', 'salt', 'pepper', 'cheese', 'vegetables'],
  ['Beat eggs with milk, salt, and pepper.', 'Pour mixture into a heated pan.', 'Add cheese and vegetables.', 'Cook until the omelette is set.', 'Fold in half and serve.']
);

const userIngredients = ['eggs', 'cheese', 'milk'];
const matchingRecipes = recipeFinder.searchRecipesByIngredients(userIngredients);

if (matchingRecipes.length > 0) {
  console.log(console.log(`Recipes that can be made with ingredients: ${userIngredients.join(', ')}\n`));
  matchingRecipes.forEach((recipe, index) => {
    console.log(`${index + 1}. ${recipe.name}`);
  });
} else {
  console.log(`No recipes found with ingredients.`);
}

if (matchingRecipes.length > 0) {
  const recipeIndex = 0;
  const selectedRecipe = matchingRecipes[recipeIndex];
  console.log(`\nViewing recipe details for "${selectedRecipe.name}"\n`);
  recipeFinder.viewRecipeDetails(selectedRecipe);
}

const newRecipeName = 'Chocolate Chip Cookies';
const newRecipeIngredients = ['flour', 'butter', 'sugar', 'chocolate chips', 'vanilla extract', 'baking soda', 'salt', 'eggs'];
const newRecipeInstructions = [
  'Preheat oven to 375°F (190°C).',
  'In a bowl, cream together butter and sugar.',
  'Beat in eggs and vanilla extract.',
  'In a separate bowl, combine flour, baking soda, and salt.',
  'Gradually add the dry ingredients to the butter mixture.',
  'Stir in chocolate chips.',
  'Drop spoonfuls of dough onto a baking sheet.',
  'Bake for 8-10 minutes or until golden brown.',
  'Allow cookies to cool on the baking sheet for a few minutes before transferring to a wire rack to cool completely.',
];

recipeFinder.addRecipe(newRecipeName, newRecipeIngredients, newRecipeInstructions);

console.log('\nAll Recipes:');
recipeFinder.recipes.forEach((recipe, index) => {
  console.log(`\nRecipe ${index + 1}: ${recipe.name}`);
  console.log('Ingredients:');
  recipe.ingredients.forEach(ingredient => console.log(`- ${ingredient}`));
  console.log('Instructions:');
  recipe.instructions.forEach((instruction, index) => console.log(`${index + 1}. ${instruction}`));
});