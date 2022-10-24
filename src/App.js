import React, { useContext, useEffect, useCallback } from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import { useCookies } from "react-cookie";
import { API } from "./API";

import { createTheme, CssBaseline, ThemeProvider } from "@mui/material";
import { brown, deepOrange, lightBlue, pink } from "@mui/material/colors";

// Views
import SignIn from "./views/SignIn";
import SignUp from "./views/SignUp";
import Home from "./views/Home";
import AddRecipe from "./views/AddRecipe";
import Recipes from "./views/Recipes";
import MealPlans from "./views/MealPlans";
import Welcome from "./views/Welcome";
import Recipe from "./views/Recipe";
import MealPlan from "./views/MealPlan";
import ShoppingLists from "./views/ShoppingLists";

// Context
import { Context } from "./context";

// Components
import MenuDrawer from "./components/MenuDrawer";
import ListView from "./views/ListView";
import FavoritesView from "./views/FavoritesView";
import Footer from "./components/Footer";

const theme = createTheme({
  palette: {
    primary: {
      main: lightBlue[300],
      favorite: pink[500],
    },
    secondary: {
      main: brown[700],
    },
  },
});
const darkTheme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: deepOrange["A400"],
      favorite: pink[500],
    },
    background: {
      default: "#141313",
    },
  },
});

function App() {
  const [cookies, setCookie, removeCookie] = useCookies("userId");
  const [user, setUser] = useContext(Context);

  const fetchUser = useCallback(async (id) => {
    const data = await API.getUserData(id);
    console.log(data);
    if (data.error) {
      removeCookie("userId");
      console.log(data.message);
    } else {
      setUser(data.user);
    }
  }, []);

  useEffect(() => {
    if (user) return console.log("user!!!");
    if (cookies.userId) {
      console.log("fetching!!!");
      fetchUser(cookies.userId);
    } else {
      console.log("no user");
    }
  }, [cookies]);

  return (
    <Router>
      <ThemeProvider theme={darkTheme}>
        <CssBaseline />
        <MenuDrawer>
          <Routes>
            <Route path="/signin" element={<SignIn />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/addrecipe" element={<AddRecipe />} />
            <Route path="/recipes" element={<Recipes />} />
            <Route path="/recipes/:recipeId" element={<Recipe />} />
            <Route path="/mealplans" element={<MealPlans />} />
            <Route path="/mealplans/:mealPlanId" element={<MealPlan />} />
            <Route path="/lists" element={<ShoppingLists />} />
            <Route path="/lists/:listId" element={<ListView />} />
            <Route path="/favorites" element={<FavoritesView />} />
            <Route path="/" element={user ? <Home /> : <Welcome />} />
          </Routes>
          <Footer />
        </MenuDrawer>
      </ThemeProvider>
    </Router>
  );
}

export default App;
