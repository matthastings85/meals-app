import { Favorite } from "@mui/icons-material";
import { Avatar, Box, Container, Typography } from "@mui/material";
import React, { useContext, useEffect } from "react";
import MealPlanCard from "../components/MealPlanCard";
import RecipeCard from "../components/RecipeCard";
import RecipePreviewCard from "../components/RecipePreviewCard";
import { Context } from "../context";

const FavoritesView = () => {
  const [user, setUser] = useContext(Context);

  return (
    <Container component="main" maxWidth="xs" sx={{ width: 1 }}>
      <Box
        sx={{
          marginTop: 4,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: "primary.main" }}>
          <Favorite />
        </Avatar>
        <Typography component="h1" variant="h4">
          Favorites
        </Typography>
      </Box>
      {user &&
        user.recipes.map((item, index) => {
          console.log(item);
          return (
            <Box key={index} sx={{ mb: 1 }}>
              <RecipePreviewCard key={index} item={item} />
            </Box>
          );
        })}
    </Container>
  );
};

export default FavoritesView;
