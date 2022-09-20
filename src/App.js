import React, { useContext } from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import { createTheme, CssBaseline, ThemeProvider } from "@mui/material";
import SignIn from "./components/SignIn";
import { brown, lightBlue } from "@mui/material/colors";
import SignUp from "./components/SignUp";
import Home from "./views/Home";
import { CookiesProvider } from "react-cookie";

// Context
import { Context } from "./context";

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
  const [user, setUser] = useContext(Context);
  return (
    <CookiesProvider>
      <Router>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Routes>
            <Route path="/signin" element={<SignIn />} />
            <Route path="/signup" element={<SignUp />}></Route>
            <Route path="/" element={<Home />}></Route>
          </Routes>
        </ThemeProvider>
      </Router>
    </CookiesProvider>
  );
}

export default App;
