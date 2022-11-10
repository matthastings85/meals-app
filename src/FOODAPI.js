import axios from "axios";

export const FOODAPI = {
  autoSearch: async (query) => {
    const options = {
      method: "GET",
      headers: {
        "X-RapidAPI-Key": process.env.REACT_APP_SPOONACULAR_KEY,
        "X-RapidAPI-Host":
          "spoonacular-recipe-food-nutrition-v1.p.rapidapi.com",
      },
    };

    const url =
      "https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/autocomplete?query=" +
      query;

    return await (await fetch(url, options))
      .json()
      .catch((err) => console.error(err));
  },
  searchRecipes: async (query) => {
    const options = {
      method: "GET",
      url: "https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/complexSearch",
      params: {
        query: query,
        instructionsRequired: "true",
        addRecipeInformation: "true",
        fillIngredients: "true",
        number: "25",
        ranking: "2",
      },
      headers: {
        "X-RapidAPI-Key": process.env.REACT_APP_SPOONACULAR_KEY,
        "X-RapidAPI-Host":
          "spoonacular-recipe-food-nutrition-v1.p.rapidapi.com",
      },
    };

    let results;

    await axios
      .request(options)
      .then(function (response) {
        console.log(response.data);
        results = response.data.results;
      })
      .catch(function (error) {
        console.error(error);
      });

    return results;
  },
  searchIngredients: async (query) => {
    const options = {
      method: "GET",
      url: "https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/food/ingredients/autocomplete",
      params: {
        query: query,
        number: 10,
        metaInformation: true,
      },
      headers: {
        "X-RapidAPI-Key": process.env.REACT_APP_SPOONACULAR_KEY,
        "X-RapidAPI-Host":
          "spoonacular-recipe-food-nutrition-v1.p.rapidapi.com",
      },
    };

    let results;

    await axios
      .request(options)
      .then(function (response) {
        console.log(response.data);
        results = response.data;
      })
      .catch(function (error) {
        console.error(error);
      });

    return results;
  },
  getRecipe: async (id) => {
    const options = {
      method: "GET",
      headers: {
        "X-RapidAPI-Key": process.env.REACT_APP_SPOONACULAR_KEY,
        "X-RapidAPI-Host":
          "spoonacular-recipe-food-nutrition-v1.p.rapidapi.com",
      },
    };

    const url = `https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/${id}/information`;

    return await (await fetch(url, options))
      .json()
      .catch((err) => console.error(err));
  },
  getRandom: async (tags) => {
    console.log(tags);
    const options = {
      method: "GET",
      url: "https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/random",
      params: { tags: "dinner", number: "10" },
      headers: {
        "X-RapidAPI-Key": process.env.REACT_APP_SPOONACULAR_KEY,
        "X-RapidAPI-Host":
          "spoonacular-recipe-food-nutrition-v1.p.rapidapi.com",
      },
    };

    let results;

    await axios
      .request(options)
      .then(function (response) {
        console.log(response.data);
        results = response.data;
      })
      .catch(function (error) {
        console.error(error);
      });
    return results;
  },
  extractRecipe: async (url) => {
    const options = {
      method: "GET",
      url: "https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/extract",
      params: {
        url: url,
      },
      headers: {
        "X-RapidAPI-Key": process.env.REACT_APP_SPOONACULAR_KEY,
        "X-RapidAPI-Host":
          "spoonacular-recipe-food-nutrition-v1.p.rapidapi.com",
      },
    };

    let results;
    await axios
      .request(options)
      .then(function (response) {
        console.log(response.data);
        results = response.data;
      })
      .catch(function (error) {
        console.error(error);
      });
    return results;
  },
};
