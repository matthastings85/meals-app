import React, { useState } from "react";
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
import { red } from "@mui/material/colors";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShareIcon from "@mui/icons-material/Share";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { API } from "../API";
import { useCookies } from "react-cookie";
import { Add } from "@mui/icons-material";

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

export default function RecipeCard({
  recipe,
  planRecipes,
  setPlanRecipes,
  setSearching,
  setSelectedRecipe,
}) {
  const [cookies, setCookie] = useCookies("userId");

  const [expanded, setExpanded] = useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const favoriteRecipe = async (event) => {
    const recipeId = event.currentTarget.id;
    const source = "spoonacular";
    const userId = cookies.userId;
    const result = await API.favoriteRecipe(recipeId, source, userId);
    console.log(result);
  };

  const handleAdd = () => {
    console.log("adddddd");
    setPlanRecipes([...planRecipes, recipe]);
    setSearching(false);
    setSelectedRecipe(null);
  };

  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: "primary.main" }} aria-label="recipe">
            R
          </Avatar>
        }
        action={
          <IconButton onClick={handleAdd} aria-label="settings">
            <Add />
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
          Prep Time: {recipe.preparationMinutes} Cook Time:
          {recipe.cookingMinutes} Serves: {recipe.servings} Likes:{" "}
          {recipe.aggregateLikes}
        </Typography>
        <Typography component="h3" variant="h6">
          Ingredients
        </Typography>
        {recipe.extendedIngredients.map((item, index) => {
          return (
            <Typography key={index} variant="body1" color="text.secondary">
              {item.measures.metric.amount} {item.measures.metric.unitShort}{" "}
              {item.name}
            </Typography>
          );
        })}
      </CardContent>
      <CardActions disableSpacing>
        <IconButton
          onClick={favoriteRecipe}
          id={recipe.id}
          aria-label="add to favorites"
        >
          <FavoriteIcon />
        </IconButton>
        <IconButton aria-label="share">
          <ShareIcon />
        </IconButton>
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
