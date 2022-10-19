import React, { useCallback, useEffect, useState } from "react";

// Utilities
import { useParams } from "react-router-dom";
import { API } from "../API";

// Components
import { Alert, Avatar, Typography } from "@mui/material";
import MealPlanCard from "../components/MealPlanCard";
import { Box, Container } from "@mui/system";
import { FoodBankOutlined } from "@mui/icons-material";

const MealPlan = () => {
  const { mealPlanId } = useParams();
  const [mealPlan, setMealPlan] = useState(null);
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [startDate, setStartDate] = useState(null);

  const getMealPlan = useCallback(async (mealPlanId) => {
    const result = await API.getMealPlan(mealPlanId);
    console.log(result);
    setMealPlan(result);
    setStartDate(
      new Date(result.startDate.replace(/-/g, "/")).toLocaleDateString(
        "en-us",
        {
          weekday: "short",
          year: "numeric",
          month: "short",
          day: "numeric",
        }
      )
    );
  });

  useEffect(() => {
    if (!mealPlan) {
      getMealPlan(mealPlanId);
    }
  }, []);

  useEffect(() => {
    console.log(mealPlanId, mealPlan);
  }, [mealPlan]);

  return (
    <Container component="main" maxWidth="100%">
      <Box
        sx={{
          mt: 1,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: "primary.main" }}>
          <FoodBankOutlined />
        </Avatar>
        <Typography component="h1" variant="h4">
          Meal Plans
        </Typography>
        {error && <Alert severity="error">{errorMessage}</Alert>}
        {startDate && (
          <Typography sx={{ mt: 2 }} component="h1" variant="h6">
            Meal Plan for {startDate}
          </Typography>
        )}
        {mealPlan &&
          mealPlan.plan.length > 0 &&
          mealPlan.plan.map((item, index) => {
            // console.log(item);
            return (
              <MealPlanCard
                index={index}
                key={index}
                item={item}
                mealPlan={mealPlan}
                setMealPlan={setMealPlan}
              />
            );
          })}
      </Box>
    </Container>
  );
};

export default MealPlan;
