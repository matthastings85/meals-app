import React, { useContext, useEffect, useState } from "react";
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
import Copyright from "../components/Copyright";
import { Alert } from "@mui/material";
import { useCookies } from "react-cookie";

// Hashing Password
// import bcrypt from "bcryptjs-react";
// const salt = bcrypt.genSaltSync(10);

// Context
import { Context } from "../context";
import { useNavigate } from "react-router-dom";
import { API } from "../API";

export default function SignUp() {
  const [cookies, setCookie] = useCookies("userId");
  const [user, setUser] = useContext(Context);
  const navigate = useNavigate();
  const [responseError, setResponseError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [marketing, setMarketing] = useState(true);

  const handleChange = (event) => {
    setMarketing(event.target.checked);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const firstName = data.get("firstName");
    const lastName = data.get("lastName");
    const email = data.get("email");
    const password = data.get("password");
    // const hashedPassword = bcrypt.hashSync(password, salt);

    if (firstName === "") {
      setResponseError(true);
      return setErrorMessage("First Name is Required");
    }
    if (lastName === "") {
      setResponseError(true);
      return setErrorMessage("Last Name is Required");
    }
    if (email === "") {
      setResponseError(true);
      return setErrorMessage("Email is Required");
    }
    if (password === "") {
      setResponseError(true);
      return setErrorMessage("Password is Required");
    }

    const newUser = {
      firstName,
      lastName,
      email,
      password,
      marketing,
    };
    console.log(newUser);

    const result = await API.signUpUser(newUser);
    console.log(result);
    if (result.error) {
      console.log(result);
      setResponseError(true);
      setErrorMessage(result.message);
    } else {
      console.log("result: ", result);
      setUser(result.data);
      setCookie("userId", result.data.id, { path: "/" });
      navigate("/");
    }
  };

  useEffect(() => {
    if (cookies.userId) return navigate("/");
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
          Sign up
        </Typography>
        {responseError && <Alert severity="error">{errorMessage}</Alert>}
        <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                autoComplete="given-name"
                name="firstName"
                required
                fullWidth
                id="firstName"
                label="First Name"
                autoFocus
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                fullWidth
                id="lastName"
                label="Last Name"
                name="lastName"
                autoComplete="family-name"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="new-password"
              />
            </Grid>
            <Grid item xs={12}>
              <FormControlLabel
                control={
                  <Checkbox
                    onChange={handleChange}
                    defaultChecked
                    value="allowExtraEmails"
                    color="secondary"
                  />
                }
                label="I want to receive inspiration, marketing promotions and updates via email."
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Sign Up
          </Button>
          <Grid container justifyContent="flex-end">
            <Grid item>
              <Link href="/signin" variant="body2">
                Already have an account? Sign in
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
      <Copyright sx={{ mt: 5 }} />
    </Container>
  );
}
