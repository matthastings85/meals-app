import React, { useEffect, useState } from "react";
import { FOODAPI } from "../FOODAPI";

const useFetchRecipe = (recipeId) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [recipe, setRecipe] = useState(null);

  const fetchRecipe = async (recipeId) => {
    const result = await FOODAPI.getRecipe(recipeId);
    console.log(result);
    setRecipe(result);
    setLoading(false);
  };

  useEffect(() => {
    console.log(recipeId);
    fetchRecipe(recipeId);
  }, [recipeId]);

  return { recipe, loading, error };
};

export default useFetchRecipe;
