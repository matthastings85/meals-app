import { Login } from "@mui/icons-material";
import { Button } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";

const LoginButton = () => {
  const navigate = useNavigate();

  return (
    <Button
      variant="contained"
      onClick={() => navigate("/signin")}
      endIcon={<Login />}
    >
      Log In
    </Button>
  );
};

export default LoginButton;
