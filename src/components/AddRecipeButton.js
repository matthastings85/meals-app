import { Add, Login } from "@mui/icons-material";
import { Button } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";

const AddRecipeButton = () => {
  const navigate = useNavigate();

  return (
    <Button
      variant="contained"
      onClick={() => navigate("/addrecipe")}
      endIcon={<Add />}
    >
      Add Recipe
    </Button>
  );
};

export default AddRecipeButton;
