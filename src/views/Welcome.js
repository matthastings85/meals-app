import React from "react";

// components
import { Box, Card, CardContent, Container, Typography } from "@mui/material";
import LoginButton from "../components/LoginButton";
import SignUpButton from "../components/SignUpButton";
import Image from "mui-image";
import Logo from "../images/meals-app-logo-white.png";

const Welcome = () => {
  return (
    <Container
      component="main"
      maxWidth="xs"
      sx={{
        mt: 8,
      }}
    >
      <Image
        src={Logo}
        height="100%"
        width="100%"
        fit="cover"
        duration={1000}
        easing="cubic-bezier(0.7, 0, 0.6, 1)"
        showLoading={true}
        errorIcon={true}
        shift={null}
        distance="100px"
        shiftDuration={900}
        bgColor="inherit"
      />
      <Card sx={{ maxWidth: 400, width: 1, mt: 4, textAlign: "center" }}>
        <CardContent>
          <Typography component="h2" variant="h5">
            Welcome to the Meals App!
          </Typography>
          <Typography>Sign Up or Login to get started.</Typography>
          <Typography>Happy Meal Planning!</Typography>
        </CardContent>
      </Card>
      <Box
        sx={{
          mt: 4,
          display: "flex",
          justifyContent: "space-around",
        }}
      >
        <LoginButton />
        <SignUpButton />
      </Box>
    </Container>
  );
};

export default Welcome;
