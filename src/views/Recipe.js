import React, { useEffect, useState } from "react";
import { FoodBankOutlined } from "@mui/icons-material";
import { Avatar, Box, Container } from "@mui/material";
import { useParams } from "react-router-dom";

import useFetchRecipe from "../hooks/useFetchRecipe";
import Spinner from "../components/Spinner";
import RecipeCard from "../components/RecipeCard";

const Recipe = () => {
  const { recipeId } = useParams();

  const { recipe, loading, error } = useFetchRecipe(recipeId);

  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          marginTop: 2,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        {loading && <Spinner />}
        {error && <div>Something went wrong...</div>}
        {recipe && <RecipeCard recipe={recipe} />}
      </Box>
    </Container>
  );
};

export default Recipe;
