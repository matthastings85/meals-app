import React, { useContext, useEffect, useState } from "react";

// Utilities
import { useNavigate, useParams } from "react-router-dom";
import handleCreateList from "../helpers/createList";

// Components
import { Alert, Avatar, Button, Typography } from "@mui/material";
import MealPlanCard from "../components/MealPlanCard";
import { Box, Container } from "@mui/system";
import { FoodBankOutlined } from "@mui/icons-material";
import RecipeCard from "../components/RecipeCard";
import { LoadingButton, Timeline, timelineItemClasses } from "@mui/lab";
import Spinner from "../components/Spinner";

// Context
import { Context } from "../context";

// Hooks
import useGetMealPlans from "../hooks/useGetMealPlans";
import useGetLists from "../hooks/useGetLists";
import useFetchMealPlan from "../hooks/useFetchMealPlan";

const MealPlan = () => {
  const navigate = useNavigate();
  const { mealPlanId } = useParams();
  const [selected, setSelected] = useState(null);
  const [list, setList] = useState(null);
  const [planIndex, setPlanIndex] = useState(null);
  const { mpLoading, error, errorMessage, mealPlan, startDate, setMealPlan } =
    useFetchMealPlan(mealPlanId);

  // Items need to check for list and create list
  const [user, setUser] = useContext(Context);
  const mealPlansArray = user ? user.mealPlans : [];
  const archievedMealPlansArray = user ? user.archivedMealPlans : [];
  const { plansArray } = useGetMealPlans(
    mealPlansArray,
    archievedMealPlansArray
  );
  const userLists = user ? user.lists : [];
  const { listArray, listLoading } = useGetLists(userLists);

  const findList = (array, id) => {
    const targetList = array.filter((item) => item.mealPlanId === id);

    setList(targetList[0]);
  };

  const findIndex = (array, id) => {
    const index = array.findIndex((item) => item._id === id);

    setPlanIndex(index);
  };

  useEffect(() => {
    if (listArray.length > 0) findList(listArray, mealPlanId);
  }, [listArray]);

  useEffect(() => {
    if (plansArray.length > 0) findIndex(plansArray, mealPlanId);
  }, [plansArray]);

  return (
    <Container component="main" maxWidth="sm">
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

        {/* Button to navigate to list associated with meal plan */}
        {list && !selected && (
          <LoadingButton
            onClick={() => navigate("/lists/" + list._id)}
            loading={listLoading}
            sx={{ mt: 2 }}
          >
            View List
          </LoadingButton>
        )}

        {/* Button to create list from meal plan */}
        {!list && !selected && (
          <LoadingButton
            onClick={() => {
              handleCreateList(planIndex, plansArray, user, setUser);
            }}
            sx={{ mt: 2 }}
            loading={listLoading}
          >
            Create list
          </LoadingButton>
        )}

        {/* Back button when recipe is selected */}
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

        {/* loading spinner */}
        {mpLoading && <Spinner />}

        {/* main meal plan timeline */}
        <Box sx={{ width: 1 }}>
          <Timeline
            sx={{
              p: 0,
              [`& .${timelineItemClasses.root}:before`]: {
                flex: 0,
                padding: 0,
              },
            }}
          >
            {mealPlan &&
              !selected &&
              mealPlan.plan.length > 0 &&
              mealPlan.plan.map((item, index) => {
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
          </Timeline>
        </Box>
      </Box>
    </Container>
  );
};

export default MealPlan;
