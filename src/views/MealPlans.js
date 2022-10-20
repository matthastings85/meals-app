import React, { useCallback, useContext, useEffect, useState } from "react";
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
import { API } from "../API";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";

const MealPlans = () => {
  const [cookies, _setCookie] = useCookies("userId");
  const navigate = useNavigate();
  const [user, _setUser] = useContext(Context);
  const [creating, setCreating] = useState(false);
  const [building, _setBuilding] = useState(false);
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

  const processDates = (startDate, length) => {
    const start = new Date(startDate.replace(/-/g, "/"));
    const end = new Date();

    end.setDate(start.getDate() + (length - 1));

    return { start, end };
  };
  return (
    <Container component="main" maxWidth="100%">
      <Box
        sx={{
          marginTop: 4,
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
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                flexWrap: "wrap",
                gap: "10px",
                width: 1,
                maxWidth: 400,
              }}
            >
              {availablePlans.length > 0 &&
                availablePlans.map((plan, index) => {
                  const { start, end } = processDates(
                    plan.startDate,
                    plan.length
                  );
                  return (
                    <Paper sx={{ mt: 1, p: 1, textAlign: "center" }}>
                      <Typography>
                        {start.toLocaleDateString("en-us", {
                          weekday: "short",
                          year: "numeric",
                          month: "short",
                          day: "numeric",
                        })}
                      </Typography>
                      <Typography>to</Typography>
                      <Typography>
                        {end.toLocaleDateString("en-us", {
                          weekday: "short",
                          year: "numeric",
                          month: "short",
                          day: "numeric",
                        })}
                      </Typography>
                      <Button
                        onClick={() => {
                          navigate("/mealplans/" + plan._id);
                        }}
                        key={index}
                      >
                        View Plan
                      </Button>
                    </Paper>
                  );
                })}
            </Box>
          </>
        )}
        {creating && <CreateMealPlan setCreating={setCreating} />}
      </Box>
    </Container>
  );
};

export default MealPlans;
