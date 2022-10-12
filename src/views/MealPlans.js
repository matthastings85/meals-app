import React, { useCallback, useContext, useEffect, useState } from "react";
import { Avatar, Box, Button, Container, Typography } from "@mui/material";
import NavBtn from "../components/NavBtn";
import { Create, FoodBankOutlined, Troubleshoot } from "@mui/icons-material";
import CreateMealPlan from "../components/CreateMealPlan";

// Context
import { Context } from "../context";
import { API } from "../API";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";

const MealPlans = () => {
  const [cookies, setCookie] = useCookies("userId");
  const navigate = useNavigate();
  const [user, setUser] = useContext(Context);
  const [creating, setCreating] = useState(false);
  const [mealPlan, setMealPlan] = useState(null);
  const [building, setBuilding] = useState(false);
  const [availablePlans, setAvailablePlans] = useState([]);

  const createPlan = () => {
    setCreating(true);
  };

  const prepAvailable = useCallback(async (plans) => {
    const prepPlans = plans.map(async (plan) => {
      const result = await API.getMealPlan(plan);
      return result;
    });
    const preppedPlans = await Promise.all(prepPlans);
    setAvailablePlans(preppedPlans);
  });

  useEffect(() => {
    if (!cookies.userId) return navigate("/");
    if (!user) return;
    console.log(user);
    if (user.mealPlans.length > 0) {
      prepAvailable(user.mealPlans);
    }
  }, [user]);
  return (
    <Container component="main" maxWidth="100%">
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
          <>
            <NavBtn
              callback={createPlan}
              text="Create Plan"
              icon={<Create />}
            />
            <Typography component="h2" variant="h6">
              Plans
            </Typography>
            {availablePlans.length > 0 &&
              availablePlans.map((plan, index) => {
                return (
                  <Button
                    onClick={() => {
                      navigate("/mealplans/" + plan._id);

                      // setMealPlan(plan);
                      // setBuilding(true);
                    }}
                    key={index}
                  >
                    {plan.startDate}
                  </Button>
                );
              })}
          </>
        )}
        {creating && <CreateMealPlan setCreating={setCreating} />}
      </Box>
    </Container>
  );
};

export default MealPlans;
