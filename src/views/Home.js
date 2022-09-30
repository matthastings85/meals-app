// import { useAuth0 } from "@auth0/auth0-react";
import { Alert, Box, Container } from "@mui/material";
import React, { useCallback, useContext, useEffect, useState } from "react";
import { API } from "../API";
import LoginButton from "../components/LoginButton";
import LogoutButton from "../components/LogoutButton";
import { useCookies } from "react-cookie";

// Context
import { Context } from "../context";
import SignUpButton from "../components/SignUpButton";
import AddRecipeButton from "../components/AddRecipeButton";

const Home = () => {
  const [cookies, setCookie] = useCookies("userId");
  const [user, setUser] = useContext(Context);
  const [responseError, setResponseError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  // const { user, isAuthenticated, isLoading } = useAuth0();

  const fetchUser = useCallback(async (id) => {
    const data = await API.getUserData(id);
    if (data.error) console.log(data.message);
    setUser(data.user);
  }, []);

  useEffect(() => {
    if (user) return console.log("user!!!");
    if (cookies.userId) {
      fetchUser(cookies.userId);
    }
  }, []);

  // if (isLoading) {
  //   return <div>Loading ...</div>;
  // }

  // isAuthenticated && console.log(user);

  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <h1>Hello World</h1>
        {user ? (
          <>
            <h2>
              {user.firstName} {user.lastName} in the house!
            </h2>
            <AddRecipeButton />
            <LogoutButton />
          </>
        ) : (
          <>
            <LoginButton />
            <SignUpButton />
          </>
        )}

        {/* {responseError && <Alert severity="error">{errorMessage}</Alert>}
      {isAuthenticated ? (
        <div>
          <img src={user.picture} alt={user.name} />
          <h2>{user.name}</h2>
          <p>{user.email}</p>
        </div>
      ) : (
        <LoginButton></LoginButton>
      )} */}
      </Box>
    </Container>
  );
};

export default Home;
