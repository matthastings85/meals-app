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
import { useCookies } from "react-cookie";
import { RestaurantMenu } from "@mui/icons-material";
import { List, ListItem, ListItemText } from "@mui/material";

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
  const [cookies, setCookie] = useCookies("userId");
  const [user, setUser] = useContext(Context);
  const [favoriteColor, setFavoriteColor] = useState("primary");

  const [expanded, setExpanded] = useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const favoriteRecipe = async () => {
    const source = "spoonacular";
    const userId = cookies.userId;
    console.log(userId);
    const result = await API.favoriteRecipe(recipe, source, userId);
    const favoriteRecipes = [...result.data.recipes];
    setUser({ ...user, recipes: favoriteRecipes });
    setFavoriteColor("primary.favorite");
  };

  const checkFavorites = () => {
    if (user.recipes.findIndex((item) => item.recipe.id == recipe.id) !== -1) {
      setFavoriteColor("primary.favorite");
    }
  };

  useEffect(() => {
    checkFavorites();
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
        image={recipe.image}
        alt={recipe.title + " image"}
      />
      <CardContent>
        <Typography variant="body2" color="text.secondary">
          Prep Time: {recipe.preparationMinutes} mins
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Cook Time: {recipe.cookingMinutes} mins
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Serves: {recipe.servings}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Likes: {recipe.aggregateLikes}
        </Typography>
        <Typography component="h3" variant="h6">
          Ingredients
        </Typography>
        <List>
          {recipe.extendedIngredients.map((item, index) => {
            return (
              <ListItem disablePadding key={index}>
                <ListItemText
                  primary={
                    item.measures.metric.amount +
                    " " +
                    item.measures.metric.unitShort +
                    " " +
                    item.name
                  }
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
