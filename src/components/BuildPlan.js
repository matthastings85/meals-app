import React, { useEffect, useState } from "react";

// Components
import { Alert, Button, Typography } from "@mui/material";
import SearchByName from "./SearchByName";
import RecipeCard from "./RecipeCard";

import MealPlanCard from "./MealPlanCard";

const BuildPlan = ({ mealPlan, setMealPlan }) => {
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [searching, setSearching] = useState(false);
  const [selectedRecipe, setSelectedRecipe] = useState(null);
  const [planRecipes, setPlanRecipes] = useState([]);

  const startDate = new Date(
    mealPlan.startDate.replace(/-/g, "/")
  ).toLocaleDateString("en-us", {
    weekday: "short",
    year: "numeric",
    month: "short",
    day: "numeric",
  });

  // Add Recipe to plan
  const addRecipe = () => {
    console.log(mealPlan);
    setSearching(true);
  };

  useEffect(() => {
    console.log(mealPlan);
  }, [mealPlan]);

  return (
    <>
      {error && <Alert severity="error">{errorMessage}</Alert>}
      <Typography sx={{ mt: 2 }} component="h1" variant="h6">
        Meal Plan for {startDate}
      </Typography>
      {mealPlan.plan.length > 0 &&
        mealPlan.plan.map((item, index) => {
          return (
            <MealPlanCard
              index={index}
              key={index}
              item={item}
              mealPlan={mealPlan}
              setMealPlan={setMealPlan}
            />
          );
        })}
      {/* {!searching && (
        <Button onClick={addRecipe} variant="contained" sx={{ mt: 3, mb: 2 }}>
          Add Meal
        </Button>
      )}
      {searching && (
        <SearchByName
          setSelectedRecipe={setSelectedRecipe}
          setSearching={setSearching}
        />
      )}
      {selectedRecipe && !searching && (
        <RecipeCard
          recipe={selectedRecipe}
          planRecipes={planRecipes}
          setPlanRecipes={setPlanRecipes}
          setSearching={setSearching}
          setSelectedRecipe={setSelectedRecipe}
        />
      )} */}
    </>
  );
};

export default BuildPlan;
