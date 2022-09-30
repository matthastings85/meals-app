import React, { useState } from "react";
import { Avatar, Box, Container, Typography } from "@mui/material";
import NavBtn from "../components/NavBtn";
import { Create, FoodBankOutlined, Troubleshoot } from "@mui/icons-material";
import CreateMealPlan from "../components/CreateMealPlan";
import BuildPlan from "../components/BuildPlan";

const MealPlan = () => {
  const [creating, setCreating] = useState(false);
  const [mealPlan, setMealPlan] = useState(null);
  const [building, setBuilding] = useState(false);

  const createPlan = () => {
    setCreating(true);
  };
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
        <Typography component="h1" variant="h4">
          Meal Plans
        </Typography>
        {/* create new plan */}
        {!creating && !building && (
          <NavBtn callback={createPlan} text="Create Plan" icon={<Create />} />
        )}
        {creating && (
          <CreateMealPlan
            setMealPlan={setMealPlan}
            setCreating={setCreating}
            setBuilding={setBuilding}
          />
        )}
        {/* Build plan */}
        {building && (
          <BuildPlan mealPlan={mealPlan} setMealPlan={setMealPlan} />
        )}
      </Box>
    </Container>
  );
};

export default MealPlan;
