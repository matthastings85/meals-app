import { CheckBoxOutlineBlank, ListRounded } from "@mui/icons-material";
import {
  Avatar,
  Box,
  Button,
  Container,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Popover,
  Typography,
} from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { API } from "../API";
import BasicPopover from "../components/BasicPopover";
import Spinner from "../components/Spinner";
import { Context } from "../context";
import createList from "../helpers/createList";
import useCreateList from "../hooks/useCreateList";
import useGetMealPlans from "../hooks/useGetMealPlans";

const ShoppingLists = () => {
  const [cookies] = useCookies("userId");
  const [user, setUser] = useContext(Context);
  // const { ingredients } = useCreateList(user.mealPlans);
  const { array, loading } = useGetMealPlans(user.mealPlans);

  const handleCreateList = async (e) => {
    const list = createList(array[e.target.id]);
    const mealPlanId = array[e.target.id]._id;
    const userId = cookies.userId;
    console.log(mealPlanId);
    const result = await API.newList(list, userId, mealPlanId);
    console.log(result);
    setUser(result.user);
  };

  useEffect(() => {
    console.log(user);
  }, [user]);

  return (
    <Container component="main" maxWidth="100%">
      <Box
        sx={{
          marginTop: 1,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
          <ListRounded sx={{ color: "primary.main" }} />
        </Avatar>
        <Typography component="h1" variant="h4">
          Shopping Lists
        </Typography>
        <Typography sx={{ mt: 5 }} component="h3" variant="h6">
          Create List from Meal Plan
        </Typography>
        <Box sx={{ width: 1, mt: 3 }}>
          {loading && <Spinner />}
          {array.length > 0 &&
            !loading &&
            array.map((item, index) => {
              return (
                <Box
                  key={"mealPlan" + index}
                  sx={{
                    mt: 1,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                  }}
                >
                  <Typography component="h3" variant="h6">
                    Meal Plan: {item.startDate}
                  </Typography>
                  <Button
                    id={index}
                    onClick={handleCreateList}
                    variant="contained"
                  >
                    Create List
                  </Button>
                </Box>
              );
            })}
          {/* {ingredients.length > 0 &&
            ingredients.map((item, index) => {
              return (
                <>
                  <Typography key={index} component="h3" variant="h6">
                    Meal Plan: {item.mealPlan}
                  </Typography>
                  {item.ingredients.map((ingredient, index) => {
                    return (
                      <ListItem
                        key={index}
                        sx={{ width: 1, maxWidth: "400px", p: 0 }}
                      >
                        <ListItemIcon>
                          <CheckBoxOutlineBlank />
                        </ListItemIcon>
                        <ListItemText primary={ingredient.name} />
                        <BasicPopover content={ingredient} />
                      </ListItem>
                    );
                  })}
                </>
              );
            })} */}
        </Box>
      </Box>
    </Container>
  );
};

export default ShoppingLists;
