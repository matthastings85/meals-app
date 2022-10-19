import React from "react";
import { Box, Button, Card, CardMedia, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { RemoveCircleOutline } from "@mui/icons-material";

const RecipePreviewCard = ({ item, enableRemove, callback }) => {
  const navigate = useNavigate();
  return (
    <Card sx={{ width: "100%", display: "flex" }}>
      {item.recipe.title !== "Leftovers" && (
        <CardMedia
          component="img"
          height="150"
          sx={{ width: 150, borderRadius: "2 0 0 2" }}
          image={item.recipe.image}
          alt={item.recipe.title + " image"}
        />
      )}
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          width: "100%",
          p: 1,
        }}
      >
        <Box>
          <Typography component="h3" variant="subtitle2">
            {item.recipe.title}
          </Typography>
          <Typography
            variant="subtitle2"
            color="text.secondary"
            component="div"
          >
            {item.recipe.sourceName}
          </Typography>
        </Box>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-around",
          }}
        >
          {item.recipe.title !== "Leftovers" && (
            <Button
              onClick={() => {
                navigate("/recipes/" + item.recipe.id);
              }}
            >
              View Recipe
            </Button>
          )}
          {enableRemove && (
            <Button onClick={callback}>
              <RemoveCircleOutline />
            </Button>
          )}
        </Box>
      </Box>
    </Card>
  );
};

export default RecipePreviewCard;
