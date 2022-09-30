import { Button } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";

const NavBtn = ({ callback, icon, text }) => {
  const navigate = useNavigate();

  return (
    <Button sx={{ m: 1 }} variant="contained" onClick={callback} endIcon={icon}>
      {text}
    </Button>
  );
};

export default NavBtn;
