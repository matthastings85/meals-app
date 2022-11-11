import React, { useContext, useState } from "react";
import { Button, Paper, Typography } from "@mui/material";
import {
  TimelineConnector,
  TimelineContent,
  TimelineDot,
  TimelineItem,
  TimelineSeparator,
} from "@mui/lab";
import { MoreVert } from "@mui/icons-material";

import { Box } from "@mui/system";
import { API } from "../API";

import { Context } from "../context";
import { useNavigate } from "react-router-dom";
import AddFavoriteDialog from "./AddFavoriteDialog";
import RecipePreviewCard from "./RecipePreviewCard";
import SearchDialog from "./SearchDialog";
import AddMyRecipeDialog from "./AddMyRecipeDialog";

const MealPlanCard = ({ index, item, mealPlan, setMealPlan, setSelected }) => {
  const [user, setUser] = useContext(Context);
  const navigate = useNavigate();
  const [options, setOptions] = useState(false);
  const [searching, setSearching] = useState(false);
  const [dotChecked, setDotChecked] = useState(false);

  const date = new Date(item.date).toLocaleDateString("en-us", {
    weekday: "short",
    year: "numeric",
    month: "short",
    day: "numeric",
  });

  const toggleOptions = () => {
    setOptions(!options);
  };
  const toggleSearching = () => {
    setSearching(!searching);
  };

  // Get recipe info
  const handleSelect = async (recipe) => {
    const result = await API.updateMealPlan(recipe, index, mealPlan._id);

    // console.log(result);

    // Update mealPlan state
    setMealPlan(result.data);
    toggleSearching();
    toggleOptions();
  };

  const handleRemove = async () => {
    const recipe = { title: "recipe goes here" };
    const result = await API.updateMealPlan(recipe, index, mealPlan._id);

    // console.log(result);

    // Update mealPlan state
    setMealPlan(result.data);
  };

  const handleLeftovers = async () => {
    const recipe = { title: "Leftovers" };
    const result = await API.updateMealPlan(recipe, index, mealPlan._id);

    // console.log(result);

    // Update mealPlan state
    setMealPlan(result.data);
    toggleOptions();
  };

  const addRecipe = async (recipe) => {
    const result = await API.updateMealPlan(recipe, index, mealPlan._id);

    // console.log(result);

    // Update mealPlan state
    setMealPlan(result.data);
    toggleOptions();
  };

  const toggleDot = () => {
    setDotChecked(!dotChecked);
  };

  return (
    <TimelineItem sx={{ width: "100%" }}>
      <TimelineSeparator>
        <TimelineConnector />
        <TimelineDot
          onClick={toggleDot}
          color="primary"
          variant={dotChecked ? "filled" : "outlined"}
        />
        <TimelineConnector />
      </TimelineSeparator>
      <TimelineContent sx={{ pl: 1, pr: 0 }}>
        <Box sx={{ mb: 2 }}>
          <Typography>{date}</Typography>
          <Paper
            sx={{
              width: 1,
              display: "flex",
              flexDirection: "column",
              minHeight: "70px",
              justifyContent: "center",
            }}
          >
            {!options &&
              !searching &&
              item.recipe.title === "recipe goes here" && (
                <Button onClick={toggleOptions}>Add Meal</Button>
              )}
            {options && (
              <Box
                sx={{
                  display: "flex",
                  flexWrap: "wrap",
                  justifyContent: "center",
                }}
              >
                <SearchDialog
                  toggleSearching={toggleSearching}
                  callback={handleSelect}
                />
                <AddMyRecipeDialog addRecipe={addRecipe} />
                <AddFavoriteDialog addRecipe={addRecipe} />
                <Button size="small" onClick={handleLeftovers}>
                  Leftovers
                </Button>
              </Box>
            )}
            {item.recipe.title !== "recipe goes here" && (
              <RecipePreviewCard
                item={item.recipe}
                enableRemove
                callback={handleRemove}
                setSelected={setSelected}
              />
            )}
          </Paper>
        </Box>
      </TimelineContent>
    </TimelineItem>
  );
};

export default MealPlanCard;
