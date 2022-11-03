import React from "react";
import {
  Box,
  Button,
  List,
  ListItem,
  ListItemText,
  Typography,
} from "@mui/material";

const ReviewRecipe = ({
  instructions,
  ingredients,
  recipeDetails,
  handleBack,
  handleSubmit,
}) => {
  return (
    <>
      <Box sx={{ mt: 1, mb: 1 }}>
        <Typography component="h3" variant="h6">
          Recipe Details
        </Typography>
        <Box sx={{ ml: 1 }}>
          <Typography>Title: {recipeDetails.name}</Typography>
          <Typography>Prep Time: {recipeDetails.prepTime}</Typography>
          <Typography>Cook Time: {recipeDetails.cookTime}</Typography>
          <Typography>Serves: {recipeDetails.serves}</Typography>
        </Box>
      </Box>
      <Box sx={{ mt: 1, mb: 1 }}>
        <Typography component="h3" variant="h6">
          Ingredients
        </Typography>
        <Box sx={{ ml: 1 }}>
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
        </Box>
      </Box>
      <Box sx={{ mt: 1, mb: 1 }}>
        <Typography component="h3" variant="h6">
          Instructions
        </Typography>
        <Box sx={{ ml: 1 }}>
          {instructions.length > 0 && (
            <List disablePadding>
              {instructions.map((item, index) => {
                return (
                  <ListItem disablePadding key={index}>
                    <ListItemText primary={item.step} />
                  </ListItem>
                );
              })}
            </List>
          )}
        </Box>
      </Box>
      <Button variant="contained" onClick={handleSubmit} sx={{ mt: 3, mr: 1 }}>
        Submit
      </Button>
      <Button onClick={handleBack} sx={{ mt: 3, mr: 1 }}>
        Back
      </Button>
    </>
  );
};

export default ReviewRecipe;
