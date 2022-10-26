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

const MealPlans = () => {
  const [user, _setUser] = useContext(Context);
  const navigate = useNavigate();
  const [creating, setCreating] = useState(false);

  const mealPlansArray = user ? user.mealPlans : [];
  const { plansArray, loading } = useGetMealPlans(mealPlansArray);

  const createPlan = () => {
    setCreating(true);
  };

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
            <Typography component="h2" variant="h6">
              Plans
            </Typography>
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
                  maxWidth: 400,
                }}
              >
                {plansArray.length > 0 &&
                  plansArray.map((plan, index) => {
                    const { start, end } = processDates(
                      plan.startDate,
                      plan.length
                    );
                    return (
                      <Paper
                        key={index}
                        sx={{ mt: 1, p: 1, textAlign: "center" }}
                      >
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
            )}
          </>
        )}
        {creating && <CreateMealPlan setCreating={setCreating} />}
      </Box>
    </Container>
  );
};

export default MealPlans;
