import React, { useContext, useState } from "react";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import StepContent from "@mui/material/StepContent";

import Typography from "@mui/material/Typography";
import RecipeDetails from "../components/RecipeDetails";

import IngredientForm from "../components/IngredientForm";
import RecipeInstructions from "../components/RecipeInstructions";
import ReviewRecipe from "../components/ReviewRecipe";
import { Context } from "../context";
import { API } from "../API";
import { useNavigate } from "react-router-dom";

export default function AddRecipeStepper() {
  const [user, setUser] = useContext(Context);
  const navigate = useNavigate();
  // State
  const [activeStep, setActiveStep] = useState(0);
  const [recipeDetails, setRecipeDetails] = useState({
    name: "",
    prepTime: "",
    cookTime: "",
    serves: "",
  });
  const [ingredients, setIngredients] = useState([]);
  const [instructions, setInstructions] = useState([]);

  // Button Click Handlers
  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    console.log({ recipeDetails, ingredients, instructions });
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleSubmit = async () => {
    console.log("submit", user);
    const newRecipe = {
      title: recipeDetails.name,
      sourceName: `${user.firstName} ${user.lastName} custom recipe`,
      preparationMinutes: parseFloat(recipeDetails.prepTime),
      cookingMinutes: parseFloat(recipeDetails.cookTime),
      servings: parseFloat(recipeDetails.serves),
      extendedIngredients: ingredients,
      analyzedInstructions: [{ steps: instructions }],
    };
    console.log(newRecipe);

    const result = await API.postRecipe(newRecipe, user.userId);

    setUser(result.data.user);
    navigate("/recipes");
  };

  // Define Steps
  const steps = [
    {
      label: "Recipe Details",
      description: `Give your recipe a name and fill in any helpful details.`,
      form: (
        <RecipeDetails
          recipeDetails={recipeDetails}
          setRecipeDetails={setRecipeDetails}
          handleNext={handleNext}
        />
      ),
    },
    {
      label: "Ingredients",
      description:
        "Add all the ingredients including the amount & unit of measure.",
      form: (
        <IngredientForm
          ingredients={ingredients}
          setIngredients={setIngredients}
          handleNext={handleNext}
          handleBack={handleBack}
        />
      ),
    },
    {
      label: "Instructions",
      description: `Add step by step instructions.`,
      form: (
        <RecipeInstructions
          instructions={instructions}
          setInstructions={setInstructions}
          handleNext={handleNext}
          handleBack={handleBack}
        />
      ),
    },
    {
      label: "Review",
      description: `Check recipe details before submitting to the database.`,
      form: (
        <ReviewRecipe
          instructions={instructions}
          ingredients={ingredients}
          recipeDetails={recipeDetails}
          handleBack={handleBack}
          handleSubmit={handleSubmit}
        />
      ),
    },
  ];

  return (
    <Box sx={{ width: 1 }}>
      <Stepper activeStep={activeStep} orientation="vertical">
        {steps.map((step, index) => (
          <Step key={step.label}>
            <StepLabel>{step.label}</StepLabel>
            <StepContent>
              <Typography>{step.description}</Typography>
              {step.form}
            </StepContent>
          </Step>
        ))}
      </Stepper>
    </Box>
  );
}
