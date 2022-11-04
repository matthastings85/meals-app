import { Alert, Box, Button, Grid, TextField, Typography } from "@mui/material";
import React, { useContext, useState } from "react";
import { API } from "../API";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";

import { Context } from "../context";

const RecipeLink = () => {
  const [cookies, setCookie] = useCookies("userId");
  const [user, setUser] = useContext(Context);

  const navigate = useNavigate();

  const [responseError, setResponseError] = useState(false);
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  // const [equipmentArray, setEquipmentArray] = useState([1]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const recipeName = data.get("recipeName");
    const recipeLink = data.get("recipeLink");

    if (recipeName === "") {
      setErrorMessage("Recipe Name is required");
      setError(true);
    }
    if (recipeLink === "") {
      setErrorMessage("Recipe Link is required");
      setError(true);
    }

    const newRecipe = { recipeName, recipeLink };
    const userId = user.userId;

    console.log(newRecipe, userId);

    const result = await API.postLinkRecipe(newRecipe, userId);
    if (result.error) {
      console.log(result);
      setResponseError(true);
      setErrorMessage(result.message);
    } else {
      setResponseError(false);
      console.log("result: ", result.data.recipes);
      console.log(user);

      setUser((user.recipes = result.data.recipes));

      // Save Recipes
      navigate("/");
    }
  };

  return (
    <>
      {error && <Alert severity="error">{errorMessage}</Alert>}
      {responseError && <Alert severity="error">{errorMessage}</Alert>}
      <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              name="recipeName"
              required
              fullWidth
              id="recipeName"
              label="Recipe Name"
              autoFocus
              variant="standard"
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              name="recipeLink"
              required
              fullWidth
              id="recipeLink"
              label="Recipe Link"
              variant="standard"
            />
          </Grid>
        </Grid>
        <Button type="submit" variant="contained" sx={{ mt: 3, mb: 2 }}>
          Next
        </Button>
      </Box>
    </>
  );
};

export default RecipeLink;
