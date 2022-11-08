import { Search, SearchRounded } from "@mui/icons-material";
import { Avatar, Button, Typography } from "@mui/material";
import { Box, Container } from "@mui/system";
import React, { useEffect, useState } from "react";
import RecipeCard from "../components/RecipeCard";
import RecipePreviewCard from "../components/RecipePreviewCard";
import { FOODAPI } from "../FOODAPI";

const ExploreRecipes = () => {
  const [recipes, setRecipes] = useState([]);
  const [selected, setSelected] = useState(null);

  const fetchRandom = async () => {
    const random = await FOODAPI.getRandom();
    setRecipes(random.recipes);
  };

  useEffect(() => {
    fetchRandom();
  }, []);
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
            <SearchRounded />
          </Avatar>
          <Typography component="h1" variant="h4">
            Explore Recipes
          </Typography>
        </Box>
      </Box>
      {recipes.length > 0 &&
        !selected &&
        recipes.map((item, index) => {
          return (
            <Box key={index} sx={{ mb: 1 }}>
              <RecipePreviewCard
                key={index}
                item={item}
                setSelected={setSelected}
              />
            </Box>
          );
        })}
      {selected && (
        <>
          <Button
            sx={{ alignSelf: "flex-start" }}
            onClick={() => setSelected(null)}
          >
            back
          </Button>
          <RecipeCard recipe={selected} />
        </>
      )}
    </Container>
  );
};

export default ExploreRecipes;
