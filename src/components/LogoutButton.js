import { Logout } from "@mui/icons-material";
import { Button } from "@mui/material";
import React, { useContext } from "react";
import { useCookies } from "react-cookie";

import { Context } from "../context";

const LogoutButton = () => {
  const [_cookies, _setCookie, removeCookie] = useCookies("userId");
  const [_user, setUser] = useContext(Context);

  const logoutUser = () => {
    setUser(null);
    removeCookie("userId");
  };

  return (
    <Button
      variant="contained"
      onClick={() => logoutUser()}
      endIcon={<Logout />}
    >
      Log Out
    </Button>
  );
};

export default LogoutButton;
