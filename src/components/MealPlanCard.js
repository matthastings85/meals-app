import React, { useEffect, useState } from "react";
import {
  Button,
  Card,
  CardContent,
  CardHeader,
  CardMedia,
  IconButton,
  Typography,
} from "@mui/material";
import { CancelPresentation, MoreVert } from "@mui/icons-material";
import SearchByName from "./SearchByName";
import { FOODAPI } from "../FOODAPI";
import { Box } from "@mui/system";

const MealPlanCard = ({ index, item, mealPlan, setMealPlan }) => {
  const [options, setOptions] = useState(false);
  const [searching, setSearching] = useState(false);

  const date = item.date.toLocaleDateString("en-us", {
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
  const handleSelect = async (event) => {
    const result = await FOODAPI.getRecipe(event.currentTarget.id);

    const newPlan = { ...mealPlan };
    newPlan.plan[index].recipe = result;

    // Update mealPlan state
    setMealPlan(newPlan);
    toggleSearching();
  };

  useEffect(() => {
    console.log(Object.keys(item.recipe).length > 0);
  }, [mealPlan]);

  return (
    <Card sx={{ maxWidth: "100%", width: 350 }}>
      <CardHeader
        action={
          <IconButton aria-label="settings">
            <MoreVert />
          </IconButton>
        }
        subheader={date}
      />
      <CardContent>
        <Box sx={{ display: "flex" }}>
          {!options && !searching && Object.keys(item.recipe).length === 0 && (
            <Button onClick={toggleOptions} variant="contained">
              Add Meal
            </Button>
          )}
          {options && (
            <>
              <Button variant="contained">Add Favorite</Button>
              <Button
                onClick={() => {
                  toggleOptions();
                  toggleSearching();
                }}
                variant="contained"
              >
                Search
              </Button>
            </>
          )}
          {searching && (
            <>
              <IconButton onClick={toggleSearching} aria-label="back">
                <CancelPresentation />
              </IconButton>
              <SearchByName callback={handleSelect} />
            </>
          )}
          {Object.keys(item.recipe).length > 0 && (
            <>
              <CardMedia
                component="img"
                height="100"
                sx={{ width: 100, borderRadius: 2 }}
                image={item.recipe.image}
                alt={item.recipe.title + " image"}
              />
              <Box sx={{ p: 1 }}>
                <Typography component="div" variant="h7">
                  {item.recipe.title}
                </Typography>
                <Typography
                  variant="subtitle2"
                  color="text.secondary"
                  component="div"
                >
                  {item.recipe.sourceName}
                </Typography>
                <Button>View Recipe</Button>
              </Box>
            </>
          )}
        </Box>
      </CardContent>
    </Card>
  );
};

export default MealPlanCard;
