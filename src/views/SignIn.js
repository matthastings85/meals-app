import React, { useContext, useEffect, useState } from "react";

// MUI Components
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { Alert } from "@mui/material";

// Utilities
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import { API } from "../API";

// Context
import { Context } from "../context";

export default function SignIn() {
  const [cookies, setCookie] = useCookies("userId");
  const [_user, setUser] = useContext(Context);
  const [responseError, setResponseError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [rememberMe, setRememberMe] = useState(true);
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const email = data.get("email");
    const password = data.get("password");
    const user = { email, password };

    const result = await API.signInUser(user);
    if (result.error) {
      console.log("result: ", result);
      setResponseError(true);
      setErrorMessage(result.message);
    } else {
      setResponseError(false);
      console.log("result: ", result);
      setUser(result.data);
      setCookie("userId", result.data.userId, { path: "/" });
      if (rememberMe) {
        localStorage.setItem("userId", result.data.userId);
      }
      navigate("/");
    }
  };

  const handleChange = (event) => {
    setRememberMe(event.target.checked);
  };

  useEffect(() => {
    const cookieUser = cookies.userId;
    const localStorageUser = localStorage.getItem("userId");
    if (cookieUser || localStorageUser) return navigate("/");
  }, []);

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
        <Avatar sx={{ m: 1, bgcolor: "primary.main" }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        {responseError && <Alert severity="error">{errorMessage}</Alert>}
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
          />
          <FormControlLabel
            control={
              <Checkbox
                defaultChecked
                onChange={handleChange}
                color="primary"
              />
            }
            label="Remember me"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Sign In
          </Button>
          <Grid container justifyContent="flex-end">
            {/* <Grid item xs>
              <Link href="#" variant="body2">
                Forgot password?
              </Link>
            </Grid> */}
            <Grid item>
              <Link onClick={() => navigate("/signup")} variant="body2">
                {"Don't have an account? Sign Up"}
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
}
