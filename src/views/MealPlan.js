import React, { useCallback, useContext, useEffect, useState } from "react";

// Utilities
import { useParams } from "react-router-dom";
import { API } from "../API";
import handleCreateList from "../helpers/createList";

// Components
import { Alert, Avatar, Button, Typography } from "@mui/material";
import MealPlanCard from "../components/MealPlanCard";
import { Box, Container } from "@mui/system";
import { FoodBankOutlined } from "@mui/icons-material";
import RecipeCard from "../components/RecipeCard";

// Context
import { Context } from "../context";

// Hooks
import useGetMealPlans from "../hooks/useGetMealPlans";
import useGetLists from "../hooks/useGetLists";

const MealPlan = () => {
  const { mealPlanId } = useParams();
  const [mealPlan, setMealPlan] = useState(null);
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [startDate, setStartDate] = useState(null);
  const [selected, setSelected] = useState(null);

  // Items need to check for list and create list
  // const [user, setUser] = useContext(Context);
  // const mealPlansArray = user ? user.mealPlans : [];
  // const { plansArray, loading } = useGetMealPlans(mealPlansArray);
  // const userLists = user ? user.lists : [];
  // const { listArray, listLoading } = useGetLists(userLists);

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

  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          mt: 2,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        {!selected && (
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
              Meal Plan
            </Typography>
          </Box>
        )}
        {error && <Alert severity="error">{errorMessage}</Alert>}
        {startDate && !selected && (
          <Typography sx={{ mt: 2 }} component="h1" variant="h6">
            Meal Plan for {startDate}
          </Typography>
        )}
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
        {mealPlan &&
          !selected &&
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
                setSelected={setSelected}
              />
            );
          })}
        {/* {list ? (
          <Button id={index} onClick={() => navigate("/lists/" + list._id)}>
            View List
          </Button>
        ) : (
          <Button
            onClick={(e) => {
              handleCreateList(e);
            }}
            sx={{ mt: 2 }}
            variant="contained"
          >
            Create list from meal plan
          </Button>
        )} */}
      </Box>
    </Container>
  );
};

export default MealPlan;
