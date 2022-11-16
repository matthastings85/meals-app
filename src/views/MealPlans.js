import React, { useContext, useState } from "react";
import { Avatar, Box, Button, Container, Typography } from "@mui/material";
import NavBtn from "../components/NavBtn";
import { Create, FoodBankOutlined } from "@mui/icons-material";
import CreateMealPlan from "../components/CreateMealPlan";

// Context
import { Context } from "../context";
import useGetMealPlans from "../hooks/useGetMealPlans";
import Spinner from "../components/Spinner";
import MealPlanOverviewCard from "../components/MealPlanOverviewCard";

const MealPlans = () => {
  const [user, _setUser] = useContext(Context);
  const [creating, setCreating] = useState(false);
  const [viewArchived, setViewArchived] = useState(false);

  const mealPlansArray = user ? user.mealPlans : [];
  const archievedMealPlansArray = user ? user.archivedMealPlans : [];
  const { plansArray, loading, archivedArray } = useGetMealPlans(
    mealPlansArray,
    archievedMealPlansArray
  );

  const createPlan = () => {
    setCreating(true);
  };

  const toggleViewArchived = () => {
    setViewArchived(!viewArchived);
  };

  if (!user) {
    return <Spinner />;
  }

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
            Meal Plans
          </Typography>
        </Box>
        {/* create new plan */}
        {!creating && (
          <>
            <NavBtn
              callback={createPlan}
              text="Create Plan"
              icon={<Create />}
            />
            {loading ? (
              <Spinner />
            ) : (
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  flexWrap: "wrap",
                  gap: "10px",
                  width: 1,
                  maxWidth: "sm",
                  mt: 2,
                }}
              >
                {plansArray.length > 0 &&
                  plansArray.map((plan, index) => {
                    return <MealPlanOverviewCard key={index} plan={plan} />;
                  })}
              </Box>
            )}
            {archivedArray.length > 0 && (
              <Button onClick={toggleViewArchived} sx={{ m: 2 }}>
                {viewArchived ? "hide archived" : "view archived"}
              </Button>
            )}
            {viewArchived && (
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  flexWrap: "wrap",
                  gap: "10px",
                  width: 1,
                  maxWidth: "sm",
                  mt: 2,
                }}
              >
                {archivedArray.map((plan, index) => {
                  return (
                    <MealPlanOverviewCard archived key={index} plan={plan} />
                  );
                })}
              </Box>
            )}
          </>
        )}
        {creating && <CreateMealPlan setCreating={setCreating} />}
      </Box>
    </Container>
  );
};

export default MealPlans;
