import { FoodBankOutlined } from "@mui/icons-material";
import {
  Avatar,
  Box,
  Container,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import RecipeCard from "../components/RecipeCard";
import SearchByName from "../components/SearchByName";
import { FOODAPI } from "../FOODAPI";

const Recipes = () => {
  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
          <FoodBankOutlined />
        </Avatar>
        <SearchByName />
      </Box>
    </Container>
  );
};

export default Recipes;
