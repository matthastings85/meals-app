import {
  Box,
  Button,
  FormControl,
  Grid,
  InputLabel,
  List,
  ListItem,
  ListItemText,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import React, { useState } from "react";

const IngredientForm = ({ ingredients, setIngredients, setProgress }) => {
  const [ingredientName, setIngredientName] = useState("");
  const [measure, setMeasure] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const ingredientName = data.get("ingredientName");
    const measure = data.get("measure");

    setIngredients([...ingredients, { ingredientName, measure }]);
    setIngredientName("");
    setMeasure("");
  };

  const handleNext = () => {
    console.log("next");
    console.log(ingredients);
    setProgress((prevProgress) => prevProgress + 1);
  };
  const handleBack = () => {
    console.log("back");
    setProgress((prevProgress) => prevProgress - 1);
  };

  return (
    <>
      {ingredients.length > 0 && (
        <List>
          {ingredients.map((item) => {
            return (
              <ListItem key={item.ingredientName}>
                <ListItemText
                  primary={item.ingredientName}
                  secondary={item.measure}
                />
              </ListItem>
            );
          })}
        </List>
      )}
      <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Typography component="h2" variant="h6" sx={{ mt: 3 }}>
              Ingredients
            </Typography>
          </Grid>
          <Grid item xs={4}>
            <TextField
              required
              variant="standard"
              fullWidth
              id="measure"
              label="Measure"
              name="measure"
              value={measure}
              onChange={(event) => setMeasure(event.target.value)}
            />
          </Grid>
          <Grid item xs={8}>
            <TextField
              name="ingredientName"
              required
              fullWidth
              id="ingredientName"
              label="Ingredient Name"
              autoFocus
              variant="standard"
              value={ingredientName}
              onChange={(event) => setIngredientName(event.target.value)}
            />
          </Grid>
          <Grid item xs={6}>
            <Button type="submit">Add Ingredient</Button>
          </Grid>
        </Grid>
      </Box>
      <Button onClick={handleBack} variant="contained" sx={{ mt: 3, mb: 2 }}>
        Back
      </Button>
      <Button onClick={handleNext} variant="contained" sx={{ mt: 3, mb: 2 }}>
        Next
      </Button>
    </>
  );
};

export default IngredientForm;
