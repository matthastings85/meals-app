import React, { useContext, useState } from "react";
import { Avatar, Box, Button, Container, Typography } from "@mui/material";
import { Favorite } from "@mui/icons-material";
import { Context } from "../context";
import RecipePreviewCard from "../components/RecipePreviewCard";
import RecipeCard from "../components/RecipeCard";

const MyRecipes = () => {
  const [user, setUser] = useContext(Context);
  const [selected, setSelected] = useState(null);

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
            Favorites
          </Typography>
        </Box>
      </Box>
      {user &&
        !selected &&
        user.recipes.map((item, index) => {
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

export default MyRecipes;
