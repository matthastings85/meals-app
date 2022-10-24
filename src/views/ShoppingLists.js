import { ListRounded } from "@mui/icons-material";
import { Avatar, Box, Container, Typography } from "@mui/material";
import React, { useContext } from "react";
import { useCookies } from "react-cookie";
import { API } from "../API";
import CreateListFromMealPlan from "../components/CreateListFromMealPlan";
import Spinner from "../components/Spinner";
import { Context } from "../context";
import createList from "../helpers/createList";
import useGetLists from "../hooks/useGetLists";
import useGetMealPlans from "../hooks/useGetMealPlans";

const ShoppingLists = () => {
  const [cookies] = useCookies("userId");
  const [user, setUser] = useContext(Context);
  const mealPlansArray = user ? user.mealPlans : [];
  const { plansArray, loading } = useGetMealPlans(mealPlansArray);
  const userLists = user ? user.lists : [];
  const { listArray, listLoading } = useGetLists(userLists);

  const handleCreateList = async (e) => {
    const list = createList(plansArray[e.target.id]);
    const mealPlanId = plansArray[e.target.id]._id;
    const userId = cookies.userId;

    console.log("list:", list, mealPlanId, userId);

    const result = await API.newList(list, userId, mealPlanId);
    console.log(result);
    setUser(result.data.user);
  };

  return (
    <Container component="main" maxWidth="xs" sx={{ width: 1 }}>
      <Box
        sx={{
          marginTop: 1,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: "primary.main" }}>
          <ListRounded />
        </Avatar>
        <Typography component="h1" variant="h4">
          Shopping Lists
        </Typography>
        <Box sx={{ width: 1, mt: 3 }}>
          {loading && <Spinner />}
          {plansArray.length > 0 && !loading && (
            <CreateListFromMealPlan
              array={plansArray}
              callback={handleCreateList}
              listArray={listArray}
            />
          )}
        </Box>
      </Box>
    </Container>
  );
};

export default ShoppingLists;
