import React, { useContext } from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import { CookiesProvider } from "react-cookie";
import { createTheme, CssBaseline, ThemeProvider } from "@mui/material";
import { brown, lightBlue } from "@mui/material/colors";

// Views
import SignIn from "./views/SignIn";
import SignUp from "./views/SignUp";
import Home from "./views/Home";
import AddRecipe from "./views/AddRecipe";

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
            <Route path="/addrecipe" element={<AddRecipe />}></Route>
            <Route path="/" element={<Home />}></Route>
          </Routes>
        </ThemeProvider>
      </Router>
    </CookiesProvider>
  );
}

export default App;
