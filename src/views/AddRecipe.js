import React from "react";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { MenuBookOutlined } from "@mui/icons-material";
import AddRecipeStepper from "./AddRecipeStepper";

const defaultInstructions = [
  "Heat the oven to 400 degrees F.",
  "Pat the chicken breasts dry and place them in a 9 x 13 baking dish.",
  "In a small bowl, mix the olive oil, oregano, thyme, garlic powder, 1 teaspoon salt and pepper to create a thick marinade/paste. Coat the chicken breast with seasoning paste.",
  "Using the same bowl mix together the white wine, garlic, lemon zest, lemon juice, brown sugar and remaining 1 teaspoon salt. Pour over chicken breast.",
  "If using, nestle the lemon slices between the chicken bake for 15 minutes, baste the chicken with the pan juice, bake for another 15 minutes or until the internal temperature of the chicken reads 165 F.",
];

const defaultIngredients = [
  { ingredientName: "chicken breasts", measure: "4" },
  { ingredientName: "olive oil", measure: "1/4 cup" },
  { ingredientName: "oregano", measure: "2 tsp" },
  { ingredientName: "thyme", measure: "2 tsp" },
  { ingredientName: "garlic powder", measure: "2 tsp" },
  { ingredientName: "salt", measure: "2 tsp" },
  { ingredientName: "black pepper", measure: "1/2 tsp" },
  { ingredientName: "dry white wine", measure: "1/2 cup" },
  { ingredientName: "minced garlic", measure: "2 tbsp" },
  { ingredientName: "lemon zest", measure: "1 tbsp" },
  { ingredientName: "lemon juice", measure: "2 tbsp" },
  { ingredientName: "brown sugar", measure: "1 tbsp" },
  { ingredientName: "lemon (sliced)", measure: "1" },
];

const defaultDetails = {
  recipeName: "Lemon Chicken",
  prepTime: 5,
  cookTime: 30,
  serves: 6,
};

export default function AddRecipe() {
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
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "primary.main" }}>
            <MenuBookOutlined />
          </Avatar>
          <Typography component="h1" variant="h4">
            Add Recipe
          </Typography>
        </Box>
        <AddRecipeStepper />
      </Box>
    </Container>
  );
}
