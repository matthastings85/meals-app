import React, { useEffect, useState } from "react";
import { FOODAPI } from "../FOODAPI";

const useGetFavorites = (recipes) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [favorites, setFavorites] = useState([]);

  const update = [];
  const fetchRecipe = async (recipeId) => {
    const result = await FOODAPI.getRecipe(recipeId);

    const exists = update.findIndex((item) => item.id === result.id);

    console.log(exists);
    if (exists === -1) {
      update.push(result);
    }
    console.log("update: ", update);
  };

  const fetchRecipes = async (recipes) => {
    for (let recipe of recipes) {
      await fetchRecipe(recipe.recipeId);
    }
    setFavorites(update);
    setLoading(false);
  };

  useEffect(() => {
    console.log(recipes);
    fetchRecipes(recipes);
  }, [recipes]);

  return { favorites, loading, error };
};

export default useGetFavorites;
