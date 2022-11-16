import React, { useContext, useState } from "react";

// Components
import { AccountCircle } from "@mui/icons-material";
import {
  Alert,
  Avatar,
  Box,
  Button,
  Container,
  Typography,
} from "@mui/material";

// Context
import { Context } from "../context";
import { API } from "../API";
import Spinner from "../components/Spinner";

const Account = () => {
  const [user, setUser] = useContext(Context);
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const unsubscribe = async () => {
    const result = await API.unsubscribe(user.userId);
    if (!result.error) setUser(result.data);
  };
  const subscribe = async () => {
    const result = await API.subscribe(user.userId);
    if (!result.error) {
      setUser(result.data);
    } else {
      setError(true);
      setErrorMessage(result.message);
    }
  };

  if (!user) {
    return <Spinner />;
  }

  return (
    <Container component="main" maxWidth="xs" sx={{ width: 1 }}>
      <Box
        sx={{
          mt: 2,
          mb: 1,
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
            mb: 3,
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "primary.main" }}>
            <AccountCircle />
          </Avatar>
          <Typography component="h1" variant="h4">
            Account
          </Typography>
        </Box>
        <Typography component="h3" variant="h6">
          Welcome {user.firstName}!
        </Typography>
        <Box sx={{ w: 1, alignSelf: "flex-start", mt: 3, mb: 3 }}>
          <Typography>First Name: {user.firstName}</Typography>
          <Typography>Last Name: {user.lastName}</Typography>
          <Typography>Email: {user.email}</Typography>
          <Typography>
            Marketing Status: {user.marketing ? "subscribed" : "not subscribed"}
          </Typography>
          <Typography>Meal Plans: {user.mealPlans.length}</Typography>
          <Typography>Lists: {user.lists.length}</Typography>
          <Typography>Recipes: {user.recipes.length}</Typography>
          <Typography>Favorites: {user.favorites.length}</Typography>
        </Box>
        {error && <Alert severity="error">{errorMessage}</Alert>}

        {user.marketing ? (
          <Button onClick={unsubscribe}>unsubscribe from emails</Button>
        ) : (
          <Button onClick={subscribe}>subscribe to emails</Button>
        )}
      </Box>
    </Container>
  );
};

export default Account;
