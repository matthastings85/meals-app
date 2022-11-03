import React, { useContext, useState } from "react";
import {
  Avatar,
  Box,
  Button,
  Container,
  Paper,
  Typography,
} from "@mui/material";
import NavBtn from "../components/NavBtn";
import { Create, FoodBankOutlined } from "@mui/icons-material";
import CreateMealPlan from "../components/CreateMealPlan";

// Context
import { Context } from "../context";
import { useNavigate } from "react-router-dom";
import useGetMealPlans from "../hooks/useGetMealPlans";
import Spinner from "../components/Spinner";
import MealPlanOverviewCard from "../components/MealPlanOverviewCard";

const MealPlans = () => {
  const [user, _setUser] = useContext(Context);
  const navigate = useNavigate();
  const [creating, setCreating] = useState(false);

  const mealPlansArray = user ? user.mealPlans : [];
  const { plansArray, loading } = useGetMealPlans(mealPlansArray);

  const createPlan = () => {
    setCreating(true);
  };

  return (
    <Container component="main" maxWidth="100%">
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
                }}
              >
                {plansArray.length > 0 &&
                  plansArray.map((plan, index) => {
                    return <MealPlanOverviewCard key={index} plan={plan} />;
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
