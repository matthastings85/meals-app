import { AppRegistration } from "@mui/icons-material";
import { Button } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";

const SignUpButton = () => {
  const navigate = useNavigate();

  return (
    <Button
      variant="contained"
      onClick={() => navigate("/signup")}
      endIcon={<AppRegistration />}
    >
      Sign Up
    </Button>
  );
};

export default SignUpButton;
