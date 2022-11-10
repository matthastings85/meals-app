import React, { useContext, useState } from "react";
import { Favorite } from "@mui/icons-material";
import {
  Avatar,
  Box,
  Button,
  Container,
  TextField,
  Typography,
} from "@mui/material";
import RecipeCard from "../components/RecipeCard";
import RecipePreviewCard from "../components/RecipePreviewCard";
import { Context } from "../context";
import { FOODAPI } from "../FOODAPI";
import Spinner from "../components/Spinner";

const ExtractRecipe = () => {
  const [user, _setUser] = useContext(Context);
  const [recipe, setRecipe] = useState(null);
  const [url, setUrl] = useState("");
  const [loading, setLoading] = useState(false);

  const extractRecipe = async () => {
    setLoading(true);
    if (url === "") return console.log("no url");
    const results = await FOODAPI.extractRecipe(url);

    console.log(results);
    setRecipe(results);
    setLoading(false);
  };

  return (
    <Container component="main" maxWidth="xs" sx={{ width: 1 }}>
      <Box
        sx={{
          mt: 2,
          mb: 1,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "primary.main" }}>
            <Favorite />
          </Avatar>
          <Typography component="h1" variant="h4">
            Extract Recipe
          </Typography>
        </Box>
      </Box>
      <Box sx={{ textAlign: "center" }}>
        <TextField
          id="url"
          label="insert url"
          variant="standard"
          fullWidth
          value={url}
          onChange={(event) => setUrl(event.target.value)}
        />
        <Button onClick={extractRecipe} sx={{ m: 2 }} variant="contained">
          Extract Recipe
        </Button>
        {recipe && (
          <Typography>
            Save this recipe by adding it to your favorites
          </Typography>
        )}
      </Box>
      {loading && <Spinner />}
      {recipe && <RecipeCard recipe={recipe} />}
    </Container>
  );
};

export default ExtractRecipe;
