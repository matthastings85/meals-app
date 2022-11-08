import React from "react";
import { Box, Button, Card, CardMedia, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { RemoveCircleOutline } from "@mui/icons-material";
import placeholder from "../images/placeholder-square.jpg";

const RecipePreviewCard = ({
  item,
  enableRemove,
  callback,
  enablePreview,
  setPreview,
  setSelected,
}) => {
  const navigate = useNavigate();
  return (
    <Card sx={{ width: 1, display: "flex" }}>
      {item.title !== "Leftovers" && (
        <CardMedia
          component="img"
          height="125"
          sx={{ width: 125, borderRadius: "2 0 0 2" }}
          image={item.image ? item.image : placeholder}
          alt={item.title + " image"}
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
            {item.title}
          </Typography>
          <Typography
            variant="subtitle2"
            color="text.secondary"
            component="div"
          >
            {item.sourceName}
          </Typography>
        </Box>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-around",
          }}
        >
          {item.title !== "Leftovers" && !enablePreview && (
            <Button
              onClick={() => {
                setSelected(item);
              }}
              size="small"
            >
              View Recipe
            </Button>
          )}
          {enablePreview && (
            <Button
              onClick={() => {
                setPreview(item);
              }}
            >
              Preview
            </Button>
          )}
          {enableRemove && (
            <Button size="small" onClick={callback}>
              <RemoveCircleOutline />
            </Button>
          )}
        </Box>
      </Box>
    </Card>
  );
};

export default RecipePreviewCard;
