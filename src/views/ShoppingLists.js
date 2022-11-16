import { ListRounded } from "@mui/icons-material";
import { Avatar, Box, Container, Typography } from "@mui/material";
import React, { useContext } from "react";
import CreateListFromMealPlan from "../components/CreateListFromMealPlan";
import Spinner from "../components/Spinner";
import { Context } from "../context";
import handleCreateList from "../helpers/createList";
import useGetLists from "../hooks/useGetLists";
import useGetMealPlans from "../hooks/useGetMealPlans";

const ShoppingLists = () => {
  const [user, setUser] = useContext(Context);
  const mealPlansArray = user ? user.mealPlans : [];
  const archievedMealPlansArray = user ? user.archivedMealPlans : [];
  const { plansArray, loading, archivedArray } = useGetMealPlans(
    mealPlansArray,
    archievedMealPlansArray
  );
  const userLists = user ? user.lists : [];
  const { listArray, listLoading } = useGetLists(userLists);

  const callback = (e) => {
    const index = e.target.id;
    handleCreateList(index, plansArray, user, setUser);
  };

  if (!user) {
    return <Spinner />;
  }

  return (
    <Container component="main" maxWidth="xs" sx={{ width: 1 }}>
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
            <ListRounded />
          </Avatar>
          <Typography component="h1" variant="h4">
            Shopping Lists
          </Typography>
        </Box>
        <Box sx={{ width: 1, mt: 3 }}>
          {loading && <Spinner />}
          {listLoading && <Spinner />}
          {plansArray.length === 0 && !loading && (
            <Typography>
              You haven't created any meal plans. Lists are generated from meal
              plans. Create a meal plan, then come back to generate a list.
            </Typography>
          )}
          {plansArray.length > 0 && !loading && (
            <CreateListFromMealPlan
              array={plansArray}
              callback={callback}
              listArray={listArray}
            />
          )}
        </Box>
      </Box>
    </Container>
  );
};

export default ShoppingLists;
