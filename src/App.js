import React, { useContext, useEffect, useCallback, useState } from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import { useCookies } from "react-cookie";
import { API } from "./API";

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
import Account from "./views/Account";
import MyRecipes from "./views/MyRecipes";
import FavoritesView from "./views/FavoritesView";
import ListView from "./views/ListView";

// Context
import { Context } from "./context";

// Components
import MenuDrawer from "./components/MenuDrawer";
import Footer from "./components/Footer";
import Spinner from "./components/Spinner";
import {
  Container,
  createTheme,
  CssBaseline,
  ThemeProvider,
} from "@mui/material";

// Colors
import { brown, deepOrange, lightBlue, pink } from "@mui/material/colors";
import ExploreRecipes from "./views/ExploreRecipes";

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
  const [cookies, _setCookie, removeCookie] = useCookies("userId");
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

  // Check to see if a cookie is present or the userId is stored in local storage, and automatically fetch the user from the database.
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
          <Container sx={{ p: 0, minHeight: "calc(100vh - 220px)" }}>
            <Routes>
              <Route path="/signin" element={<SignIn />} />
              <Route path="/signup" element={<SignUp />} />
              <Route path="/account" element={<Account />} />
              <Route path="/addrecipe" element={<AddRecipe />} />
              <Route path="/recipes" element={<Recipes />} />
              <Route path="/recipes/:recipeId" element={<Recipe />} />
              <Route path="/mealplans" element={<MealPlans />} />
              <Route path="/mealplans/:mealPlanId" element={<MealPlan />} />
              <Route path="/lists" element={<ShoppingLists />} />
              <Route path="/lists/:listId" element={<ListView />} />
              <Route path="/favorites" element={<FavoritesView />} />
              <Route path="/myrecipes" element={<MyRecipes />} />
              <Route path="/explorerecipes" element={<ExploreRecipes />} />
              <Route
                path="/"
                element={loading ? <Spinner /> : user ? <Home /> : <Welcome />}
              />
            </Routes>
          </Container>
          <Footer />
        </MenuDrawer>
      </ThemeProvider>
    </Router>
  );
}

export default App;
