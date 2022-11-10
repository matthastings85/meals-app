import React from "react";
import {
  CreateRounded,
  FoodBankOutlined,
  LinkRounded,
  MenuBookRounded,
  SearchRounded,
} from "@mui/icons-material";
import { Avatar, Box, Container, Typography } from "@mui/material";
import HomeNavCard from "../components/HomeNavCard";

const Recipes = () => {
  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          marginTop: 2,
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
            <FoodBankOutlined />
          </Avatar>
          <Typography component="h1" variant="h4">
            Recipes
          </Typography>
        </Box>

        <Box
          sx={{
            display: "flex",
            justifyContent: "space-around",
            flexWrap: "wrap",
            gap: "20px",
            mt: 2,
          }}
        >
          <HomeNavCard
            to="myrecipes"
            title="My Recipes"
            icon={<MenuBookRounded sx={{ fontSize: 80 }} />}
          />
          <HomeNavCard
            to="explorerecipes"
            title="Random"
            icon={<SearchRounded sx={{ fontSize: 80 }} />}
          />
          <HomeNavCard
            to="addrecipe"
            title="Add Recipe"
            icon={<CreateRounded sx={{ fontSize: 80 }} />}
          />
          <HomeNavCard
            to="extractrecipe"
            title="Extract"
            icon={<LinkRounded sx={{ fontSize: 80 }} />}
          />
        </Box>
      </Box>
    </Container>
  );
};

export default Recipes;
