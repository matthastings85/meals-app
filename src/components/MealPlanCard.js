import React, { useContext, useEffect, useState } from "react";
import {
  Button,
  Card,
  CardContent,
  CardHeader,
  CardMedia,
  IconButton,
  Typography,
} from "@mui/material";
import {
  CancelPresentation,
  MoreVert,
  RemoveCircleOutline,
} from "@mui/icons-material";
import SearchByName from "./SearchByName";
import { FOODAPI } from "../FOODAPI";
import { Box } from "@mui/system";
import { API } from "../API";

import { Context } from "../context";
import { useNavigate } from "react-router-dom";
import AddFavoriteDialog from "./AddFavoriteDialog";
import RecipePreviewCard from "./RecipePreviewCard";
import SearchDialog from "./SearchDialog";

const MealPlanCard = ({ index, item, mealPlan, setMealPlan }) => {
  const [user, setUser] = useContext(Context);
  const navigate = useNavigate();
  const [options, setOptions] = useState(false);
  const [searching, setSearching] = useState(false);

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

    console.log(result);

    // Update mealPlan state
    setMealPlan(result.data);
    toggleSearching();
    toggleOptions();
  };
  // const handleSelect = async (event) => {
  //   const recipe = await FOODAPI.getRecipe(event.currentTarget.id);

  //   const result = await API.updateMealPlan(recipe, index, mealPlan._id);

  //   console.log(result);

  //   // Update mealPlan state
  //   setMealPlan(result.data);
  //   toggleSearching();
  // };

  const handleRemove = async () => {
    const recipe = { title: "recipe goes here" };
    const result = await API.updateMealPlan(recipe, index, mealPlan._id);

    console.log(result);

    // Update mealPlan state
    setMealPlan(result.data);
  };

  const handleLeftovers = async () => {
    const recipe = { title: "Leftovers" };
    const result = await API.updateMealPlan(recipe, index, mealPlan._id);

    console.log(result);

    // Update mealPlan state
    setMealPlan(result.data);
    toggleOptions();
  };
  const addFavorite = async (recipe) => {
    const result = await API.updateMealPlan(recipe, index, mealPlan._id);

    console.log(result);

    // Update mealPlan state
    setMealPlan(result.data);
    toggleOptions();
  };

  // There is an issue when you favorite a recipe. The user.recipes array is being updated incorrectly.
  useEffect(() => {
    // console.log(item.recipe);
    // console.log("USER: ", user);
  }, []);

  return (
    <Card sx={{ width: 1, maxWidth: "sm", mt: 1 }}>
      <CardHeader
        action={
          <IconButton aria-label="settings">
            <MoreVert />
          </IconButton>
        }
        subheader={date}
      />
      <CardContent sx={{ width: 1 }}>
        <Box sx={{ width: 1, display: "flex", flexDirection: "column" }}>
          {!options &&
            !searching &&
            item.recipe.title === "recipe goes here" && (
              <Button onClick={toggleOptions}>Add Meal</Button>
            )}
          {options && (
            <Box sx={{ display: "flex", justifyContent: "center" }}>
              {/* <Button
                sx={{ mt: 1 }}
                onClick={() => {
                  toggleOptions();
                  toggleSearching();
                }}
              >
                Search
              </Button> */}
              <SearchDialog
                toggleSearching={toggleSearching}
                callback={handleSelect}
              />
              <AddFavoriteDialog addFavorite={addFavorite} />
              <Button onClick={handleLeftovers}>Leftovers</Button>
            </Box>
          )}
          {/* {searching && (
            <Box sx={{ display: "flex" }}>
              <SearchByName callback={handleSelect} />
              <IconButton
                sx={{ flexBasis: "15%", alignSelf: "flex-start" }}
                onClick={toggleSearching}
                aria-label="back"
              >
                <CancelPresentation />
              </IconButton>
            </Box>
          )} */}
          {item.recipe.title !== "recipe goes here" && (
            <RecipePreviewCard
              item={item.recipe}
              enableRemove
              callback={handleRemove}
            />
          )}
        </Box>
      </CardContent>
    </Card>
  );
};

export default MealPlanCard;
