import React, { useContext, useState } from "react";
import { Favorite } from "@mui/icons-material";
import { Avatar, Box, Button, Container, Typography } from "@mui/material";
import RecipeCard from "../components/RecipeCard";
import RecipePreviewCard from "../components/RecipePreviewCard";
import { Context } from "../context";
import Spinner from "../components/Spinner";

const FavoritesView = () => {
  const [user, _setUser] = useContext(Context);
  const [selected, setSelected] = useState(null);

  if (!user) {
    return <Spinner />;
  }

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
      {user.favorites.length === 0 && !selected && (
        <Typography>
          You haven't added any favorites yet. Click the heart at the top right
          corner of a recipe card to add it to your favorites.
        </Typography>
      )}
      {user &&
        !selected &&
        user.favorites.map((item, index) => {
          return (
            <Box key={index} sx={{ mb: 1 }}>
              <RecipePreviewCard
                key={index}
                item={item.recipe}
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

export default FavoritesView;
