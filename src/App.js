import React from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import { createTheme, CssBaseline, ThemeProvider } from "@mui/material";
import SignIn from "./components/SignIn";
import { brown, lightBlue } from "@mui/material/colors";
import SignUp from "./components/SignUp";

const theme = createTheme({
  palette: {
    primary: {
      main: lightBlue[300],
    },
    secondary: {
      main: brown[700],
    },
  },
});

function App() {
  return (
    <Router>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Routes>
          <Route path="/signin" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />}></Route>
          <Route path="/" element={<div>Hello World</div>}></Route>
        </Routes>
      </ThemeProvider>
    </Router>
  );
}

export default App;
