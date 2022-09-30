import React, { useContext, useEffect, useState } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Copyright from "../components/Copyright";
import { Alert, List, ListItem, ListItemText } from "@mui/material";
import { useCookies } from "react-cookie";

// Context
import { Context } from "../context";
import { useNavigate } from "react-router-dom";
import { API } from "../API";
import { FoodBankOutlined } from "@mui/icons-material";
import IngredientForm from "../components/IngredientForm";
import RecipeDetails from "../components/RecipeDetails";
import RecipeInstructions from "../components/RecipeInstructions";
import RecipeLink from "../components/RecipeLink";

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
  const [cookies, setCookie] = useCookies("userId");
  const [user, setUser] = useContext(Context);
  const navigate = useNavigate();
  const [responseError, setResponseError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [progress, setProgress] = useState(1);
  // State for custom recipes
  const [recipeDetails, setRecipeDetails] = useState({});
  const [ingredients, setIngredients] = useState([]);
  const [instructions, setInstructions] = useState([]);
  // State for linked recipes
  const [linkRecipe, setLinkRecipe] = useState(false);
  const [linkRecipeDetails, setLinkRecipeDetails] = useState({});

  const submitToDatabase = async () => {
    const newRecipe = { recipeDetails, ingredients, instructions };
    const userId = cookies.userId;

    const result = await API.postRecipe(newRecipe, userId);
    if (result.error) {
      console.log(result);
      setResponseError(true);
      setErrorMessage(result.message);
    } else {
      console.log("result: ", result);
      // navigate("/");
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
          <FoodBankOutlined />
        </Avatar>
        <Typography component="h1" variant="h4">
          Add Recipe
        </Typography>
        {responseError && <Alert severity="error">{errorMessage}</Alert>}
        <Box sx={{ mt: 3 }}>
          {recipeDetails.recipeName && (
            <Typography component="h2" variant="h5">
              {recipeDetails.recipeName}
            </Typography>
          )}
          {linkRecipeDetails.recipeName && (
            <Typography component="h2" variant="h5">
              {linkRecipeDetails.recipeName}
            </Typography>
          )}
          {!linkRecipe && progress === 1 && (
            <>
              <Button
                onClick={() => {
                  setLinkRecipe(true);
                }}
                variant="contained"
                sx={{ m: 2 }}
              >
                Link to Recipe
              </Button>
              <Button
                onClick={() => {
                  setProgress((prevProgress) => prevProgress + 1);
                }}
                variant="contained"
                sx={{ m: 2 }}
              >
                Custom Recipe
              </Button>
            </>
          )}
          {linkRecipe && <RecipeLink />}
          {progress === 2 && (
            <RecipeDetails
              setRecipeDetails={setRecipeDetails}
              setProgress={setProgress}
            />
          )}
          {progress === 3 && (
            <IngredientForm
              ingredients={ingredients}
              setIngredients={setIngredients}
              setProgress={setProgress}
            />
          )}
          {progress === 4 && (
            <RecipeInstructions
              instructions={instructions}
              setInstructions={setInstructions}
              setProgress={setProgress}
            />
          )}
          {progress === 5 && (
            <>
              <Typography component="h2" variant="h6">
                Ingredients
              </Typography>
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
              <Typography component="h2" variant="h6">
                Instructions
              </Typography>
              {instructions.length > 0 && (
                <List>
                  {instructions.map((item) => {
                    return (
                      <ListItem key={item}>
                        <ListItemText primary={item} />
                      </ListItem>
                    );
                  })}
                </List>
              )}
              <Button
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                onClick={submitToDatabase}
              >
                Add Recipe
              </Button>
            </>
          )}
        </Box>
      </Box>
      <Copyright sx={{ mt: 5 }} />
    </Container>
  );
}

// const handleChange = (event) => {
//   setMarketing(event.target.checked);
// };

// const handleSubmit = async (event) => {
//   event.preventDefault();
//   const data = new FormData(event.currentTarget);
//   const firstName = data.get("firstName");
//   const lastName = data.get("lastName");
//   const email = data.get("email");
//   const password = data.get("password");
//   // const hashedPassword = bcrypt.hashSync(password, salt);
//   if (firstName === "") {
//     setResponseError(true);
//     return setErrorMessage("First Name is Required");
//   }
//   if (lastName === "") {
//     setResponseError(true);
//     return setErrorMessage("Last Name is Required");
//   }
//   if (email === "") {
//     setResponseError(true);
//     return setErrorMessage("Email is Required");
//   }
//   if (password === "") {
//     setResponseError(true);
//     return setErrorMessage("Password is Required");
//   }
//   const newUser = {
//     firstName,
//     lastName,
//     email,
//     password,
//     marketing,
//   };
//   console.log(newUser);
//   const result = await API.signUpUser(newUser);
//   console.log(result);
//   if (result.error) {
//     console.log(result);
//     setResponseError(true);
//     setErrorMessage(result.message);
//   } else {
//     console.log("result: ", result);
//     setUser(result.data);
//     setCookie("userId", result.data.id, { path: "/" });
//     navigate("/");
//   }
// };
