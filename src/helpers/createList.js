const isolateRecipes = (plan) => {
  const recipes = [];
  for (let day of plan) {
    recipes.push(day.recipe);
  }
  return recipes;
};

const isolateIngredients = (recipes) => {
  let ingredients = [];
  for (let recipe of recipes) {
    if (recipe.extendedIngredients) {
      const object = {
        title: recipe.title,
        ingredients: recipe.extendedIngredients,
      };
      ingredients.push(object);
    }
  }
  return ingredients;
};

const parseIngredients = (ingredientsLists) => {
  let parsedIngredients = [];
  for (let recipe of ingredientsLists) {
    const { title, ingredients } = recipe;
    for (let ingredient of ingredients) {
      const newIngredient = { ...ingredient, recipeTitle: title };
      parsedIngredients = [...parsedIngredients, newIngredient];
    }
  }
  return parsedIngredients;
};

const sortIngredients = (parsedIngredients) => {
  return parsedIngredients.sort((a, b) => a.id - b.id);
};

const consolidateIngredients = (list) => {
  const newList = [];

  for (let item of list) {
    // console.log(item.id);
    const index = newList.findIndex((element) => element.id === item.id);
    const { id, name, amount, unit, recipeTitle } = item;
    if (index !== -1) {
      const target = newList[index];
      newList[index] = {
        ...target,
        amount2: amount,
        unit2: unit,
        recipeTitle2: recipeTitle,
      };
    } else {
      const newItem = { id, name, amount, unit, recipeTitle };
      newList.push(newItem);
    }
  }

  return newList;
};

const createList = (mealPlan) => {
  const recipes = isolateRecipes(mealPlan.plan);
  const ingredients = isolateIngredients(recipes);
  const parsedIngredients = parseIngredients(ingredients);
  const sortedIngredients = sortIngredients(parsedIngredients);
  const consolidatedIngredients = consolidateIngredients(sortedIngredients);
  return consolidatedIngredients;
};

export default createList;
