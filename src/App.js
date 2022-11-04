import React, { useContext, useEffect, useCallback, useState } from "react";
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
import MyRecipes from "./views/MyRecipes";
import Spinner from "./components/Spinner";

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
  const [loading, setLoading] = useState(true);

  const fetchUser = useCallback(async (id) => {
    const data = await API.getUserData(id);
    console.log(data);
    if (data.error) {
      removeCookie("userId");
      localStorage.clear();
      console.log(data.message);
    } else {
      setUser(data.user);
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (user) return console.log("user exists");
    const cookieUser = cookies.userId;
    const localStorageUser = localStorage.getItem("userId");
    if (cookieUser) {
      console.log("fetching cookie user");
      fetchUser(cookies.userId);
    } else if (localStorageUser) {
      console.log("no cookie");
      console.log("fetching local storage user");
      fetchUser(localStorageUser);
    } else {
      console.log("no user");
      setLoading(false);
    }
  }, []);

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
            <Route path="/myrecipes" element={<MyRecipes />} />
            <Route
              path="/"
              element={loading ? <Spinner /> : user ? <Home /> : <Welcome />}
            />
          </Routes>
          <Footer />
        </MenuDrawer>
      </ThemeProvider>
    </Router>
  );
}

export default App;
