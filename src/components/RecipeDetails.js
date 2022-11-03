import React, { useEffect, useState } from "react";
import { Alert, Box, Button, Grid, TextField } from "@mui/material";

const RecipeDetails = ({ recipeDetails, setRecipeDetails, handleNext }) => {
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [name, setName] = useState(recipeDetails.name);
  const [prepTime, setPrepTime] = useState(recipeDetails.prepTime);
  const [cookTime, setCookTime] = useState(recipeDetails.cookTime);
  const [serves, setServes] = useState(recipeDetails.serves);

  const next = () => {
    if (name === "") {
      setError(true);
      setErrorMessage("A recipe name is required");
      return;
    } else {
      handleNext();
    }
  };

  useEffect(() => {
    setRecipeDetails({ name, prepTime, cookTime, serves });
  }, [name, prepTime, cookTime, serves]);

  return (
    <>
      {error && <Alert severity="error">{errorMessage}</Alert>}
      {/* <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}> */}
      <Box sx={{ mt: 1 }}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              required
              fullWidth
              id="recipeName"
              label="Recipe Name"
              autoFocus
              variant="standard"
              value={name}
              onChange={(event) => setName(event.target.value)}
            />
          </Grid>
          <Grid item xs={4}>
            <TextField
              variant="standard"
              fullWidth
              id="prepTime"
              label="Prep Time"
              type="number"
              value={prepTime}
              onChange={(event) => setPrepTime(event.target.value)}
            />
          </Grid>
          <Grid item xs={4}>
            <TextField
              variant="standard"
              fullWidth
              id="cookTime"
              label="Cook Time"
              type="number"
              value={cookTime}
              onChange={(event) => setCookTime(event.target.value)}
            />
          </Grid>
          <Grid item xs={4}>
            <TextField
              variant="standard"
              fullWidth
              id="serves"
              label="Serves"
              type="number"
              value={serves}
              onChange={(event) => setServes(event.target.value)}
            />
          </Grid>
        </Grid>
        <Button variant="contained" onClick={next} sx={{ mt: 3, mb: 2 }}>
          Continue
        </Button>
      </Box>
    </>
  );
};

export default RecipeDetails;
