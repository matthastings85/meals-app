import React from "react";

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
};
