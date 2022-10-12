import { Box, Container } from "@mui/material";
import React from "react";

import LoginButton from "../components/LoginButton";
import SignUpButton from "../components/SignUpButton";

const Welcome = () => {
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
        <LoginButton />
        <SignUpButton />
      </Box>
    </Container>
  );
};

export default Welcome;
