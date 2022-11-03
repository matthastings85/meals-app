import { Button, List, ListItem, ListItemText } from "@mui/material";
import React, { useState } from "react";
import AddIngredientDialog from "./AddIngredientDialog";

const IngredientForm = ({
  ingredients,
  setIngredients,
  handleNext,
  handleBack,
}) => {
  const addIngredient = (ingredient) => {
    console.log(ingredient);
    setIngredients((prev) => [...prev, ingredient]);
  };

  return (
    <>
      {ingredients.length > 0 && (
        <List disablePadding>
          {ingredients.map((item) => {
            return (
              <ListItem disablePadding key={item.name}>
                <ListItemText
                  primary={item.name}
                  secondary={item.amount + " " + item.unit}
                />
              </ListItem>
            );
          })}
        </List>
      )}
      <AddIngredientDialog addIngredient={addIngredient} />
      <Button variant="contained" onClick={handleNext} sx={{ mt: 3, mr: 1 }}>
        Continue
      </Button>
      <Button onClick={handleBack} sx={{ mt: 3, mr: 1 }}>
        Back
      </Button>
    </>
  );
};

export default IngredientForm;

const recipe = {
  id: 0,
  title: "",
  sourceName: "",
  image: "url",
  preparationMinutes: 0,
  cookingMinutes: 0,
  servings: 0,
  aggregateLikes: 0,
  extendedIngredients: [{ amount: "", unit: "", name: "", id: "" }],
  analyzedInstructions: [{ steps: [{ number: 1, step: "" }] }],
};
