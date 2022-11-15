import React, { useContext, useEffect, useState } from "react";
import { styled } from "@mui/material/styles";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Collapse from "@mui/material/Collapse";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { API } from "../API";
import { RestaurantMenu } from "@mui/icons-material";
import { Box, Chip, List, ListItem, ListItemText } from "@mui/material";
import placeholder from "../images/placeholder-square.jpg";

// Context
import { Context } from "../context";

const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? "rotate(0deg)" : "rotate(180deg)",
  marginLeft: "auto",
  transition: theme.transitions.create("transform", {
    duration: theme.transitions.duration.shortest,
  }),
}));

export default function RecipeCard({ recipe }) {
  const [user, setUser] = useContext(Context);
  const [favoriteColor, setFavoriteColor] = useState("primary");
  const [favoriteId, setFavoriteId] = useState(null);

  const [expanded, setExpanded] = useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const checkCustom = () => {
    if (recipe.sourceName.includes(user.firstName + " " + user.lastName)) {
      return true;
    } else {
      return false;
    }
  };

  const favoriteRecipe = async () => {
    const alreadyFavorite = checkFavorites(recipe);
    const userId = user.userId;

    if (!alreadyFavorite) {
      const custom = checkCustom();

      const source = custom ? "custom" : "spoonacular";

      const result = await API.favoriteRecipe(recipe, source, userId);
      console.log(result);
      const favoriteRecipes = [...result.data.favorites];
      setUser({ ...user, favorites: favoriteRecipes });
      setFavoriteColor("primary.favorite");
    } else {
      // remove favorite
      const result = await API.removeFavorite(favoriteId, userId);
      console.log(result);
      const favoriteRecipes = [...result.data.user.favorites];
      setUser({ ...user, favorites: favoriteRecipes });
      setFavoriteColor("primary");
    }
  };

  const checkFavorites = (recipe) => {
    const recipeId = recipe.id;
    const sourceName = recipe.sourceName;
    const sourceUrl = recipe.sourceUrl;
    const recipeTitle = recipe.title;

    for (let favorite of user.favorites) {
      if (recipeId !== -1) {
        if (recipeId === favorite.recipe.id) {
          setFavoriteId(favorite._id);
          return true;
        }
      } else {
        if (
          sourceName === favorite.recipe.sourceName &&
          sourceUrl === favorite.recipe.sourceUrl &&
          recipeTitle === favorite.recipe.title
        ) {
          setFavoriteId(favorite._id);
          return true;
        }
      }
    }
    return false;
  };

  useEffect(() => {
    const favorite = checkFavorites(recipe);
    console.log("already favorite", favorite);
    if (favorite) {
      setFavoriteColor("primary.favorite");
    }
  }, []);

  return (
    <Card sx={{ width: "100%" }}>
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: "primary.main" }} aria-label="recipe">
            <RestaurantMenu />
          </Avatar>
        }
        action={
          <IconButton
            onClick={favoriteRecipe}
            id={recipe.id}
            aria-label="add to favorites"
          >
            <FavoriteIcon sx={{ color: favoriteColor }} />
          </IconButton>
        }
        title={recipe.title}
        subheader={recipe.sourceName}
      />
      <CardMedia
        component="img"
        height="194"
        image={recipe.image ? recipe.image : placeholder}
        alt={recipe.title + " image"}
      />
      <CardContent>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-around",
            flexWrap: "wrap",
            gap: "10px",
            mb: 2,
          }}
        >
          <Chip
            label={`Prep Time: ${recipe.preparationMinutes} mins`}
            variant="outlined"
          />
          <Chip
            label={`Cook Time: ${recipe.cookingMinutes} mins`}
            variant="outlined"
          />
          <Chip label={`Serves: ${recipe.servings}`} variant="outlined" />
          <Chip label={`Likes: ${recipe.aggregateLikes}`} variant="outlined" />
        </Box>
        <Typography component="h3" variant="h6">
          Ingredients
        </Typography>
        <List>
          {recipe.extendedIngredients.map((item, index) => {
            return (
              <ListItem disablePadding key={index}>
                <ListItemText
                  primary={item.amount + " " + item.unit + " " + item.name}
                />
              </ListItem>
            );
          })}
        </List>
      </CardContent>
      <CardActions>
        <Typography component="h3" variant="h6">
          Instructions
        </Typography>
        <ExpandMore
          expand={expanded}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
        >
          <ExpandMoreIcon />
        </ExpandMore>
      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          {recipe.analyzedInstructions.length > 0 ? (
            <>
              <Typography paragraph>Method:</Typography>
              {recipe.analyzedInstructions[0].steps.map((item) => {
                return (
                  <Typography key={item.number} paragraph>
                    Step {item.number}: {item.step}
                  </Typography>
                );
              })}
            </>
          ) : (
            <Typography paragraph>No Instructions</Typography>
          )}
        </CardContent>
      </Collapse>
    </Card>
  );
}
