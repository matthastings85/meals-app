import React, { useContext, useState } from "react";
import { styled, useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import CssBaseline from "@mui/material/CssBaseline";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import {
  AccountCircle,
  CalendarMonthRounded,
  Favorite,
  FoodBankRounded,
  ListRounded,
  MenuBook,
} from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { Button, Link } from "@mui/material";
import BasicPopover from "./BasicPopover";
import AccountPopover from "./AccountPopover";
import Image from "mui-image";
import Logo from "../images/meals-app-logo-white.png";
import { Context } from "../context";

const drawerWidth = 240;

const Main = styled("main", { shouldForwardProp: (prop) => prop !== "open" })(
  ({ theme, open }) => ({
    flexGrow: 1,
    // padding: theme.spacing(1),
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    // marginLeft: `-${drawerWidth}px`,
    // ...(open && {
    //   transition: theme.transitions.create("margin", {
    //     easing: theme.transitions.easing.easeOut,
    //     duration: theme.transitions.duration.enteringScreen,
    //   }),
    //   marginLeft: 0,
    // }),
  })
);

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  transition: theme.transitions.create(["margin", "width"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  // ...(open && {
  //   width: `calc(100% - ${drawerWidth}px)`,
  //   marginLeft: `${drawerWidth}px`,
  //   transition: theme.transitions.create(["margin", "width"], {
  //     easing: theme.transitions.easing.easeOut,
  //     duration: theme.transitions.duration.enteringScreen,
  //   }),
  // }),
}));

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: "flex-end",
}));

const navMenu = [
  { name: "Meal Plans", nav: "mealplans", icon: <CalendarMonthRounded /> },
  { name: "Favorites", nav: "favorites", icon: <Favorite /> },
  { name: "Recipes", nav: "recipes", icon: <FoodBankRounded /> },
  { name: "Shopping Lists", nav: "lists", icon: <ListRounded /> },
];

const MenuDrawer = ({ children }) => {
  const [user, setUser] = useContext(Context);
  const theme = useTheme();
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar position="fixed" open={open}>
        <Toolbar>
          {/* Desktop Menu */}
          <Box
            sx={{
              display: { xs: "none", md: "flex" },
              justifyContent: "flex-start",
              alignItems: "center",
              flexGrow: 1,
              mt: 0.5,
              mb: 0.5,
            }}
            onClick={() => navigate("/")}
          >
            <Image
              src={Logo}
              width="100px"
              fit="cover"
              duration={1000}
              easing="cubic-bezier(0.7, 0, 0.6, 1)"
              showLoading={true}
              errorIcon={true}
              shift={null}
              distance="100px"
              shiftDuration={900}
              bgColor="inherit"
              style={{ cursor: "pointer" }}
            />
          </Box>
          <Box
            sx={{
              flexGrow: 2,
              display: { xs: "none", md: "flex" },
              justifyContent: "center",
              gap: "20px",
            }}
          >
            {navMenu.map((item) => (
              <Button
                key={item.name}
                onClick={() => navigate(`/${item.nav}`)}
                sx={{ my: 2, color: "white" }}
                startIcon={item.icon}
              >
                {item.name}
              </Button>
            ))}
          </Box>
          <Box
            sx={{
              flexGrow: 1,
              display: { xs: "none", md: "flex" },
              justifyContent: "flex-end",
            }}
          >
            <AccountPopover />
          </Box>
          {/* Mobile Menu */}
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{
              mr: 2,
              display: { xs: "block", md: "none" },
            }}
          >
            <MenuIcon />
          </IconButton>
          <Box
            sx={{
              width: "100%",
              display: { xs: "flex", md: "none" },
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                flexGrow: 1,
                mt: 0.5,
                mb: 0.5,
              }}
              onClick={() => navigate("/")}
            >
              <Image
                src={Logo}
                width="100px"
                fit="cover"
                duration={1000}
                easing="cubic-bezier(0.7, 0, 0.6, 1)"
                showLoading={true}
                errorIcon={true}
                shift={null}
                distance="100px"
                shiftDuration={900}
                bgColor="inherit"
                style={{ cursor: "pointer" }}
              />
            </Box>
            <Box
              sx={{
                display: { xs: "flex", md: "none" },
                justifyContent: "flex-end",
              }}
            >
              <AccountPopover />
            </Box>
          </Box>
        </Toolbar>
      </AppBar>
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            boxSizing: "border-box",

            color: "primary.main",
          },
        }}
        anchor="left"
        open={open}
      >
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === "ltr" ? (
              <ChevronLeftIcon />
            ) : (
              <ChevronRightIcon />
            )}
          </IconButton>
        </DrawerHeader>
        <Divider />
        <List>
          {navMenu.map((item, index) => (
            <ListItem key={item.nav} disablePadding>
              <ListItemButton
                onClick={() => {
                  handleDrawerClose();
                  navigate(`/${item.nav}`);
                }}
              >
                <ListItemIcon sx={{ color: "primary.main" }}>
                  {item.icon}
                </ListItemIcon>
                <ListItemText primary={item.name} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Drawer>
      <Main open={open}>
        <DrawerHeader />
        {children}
      </Main>
    </Box>
  );
};

export default MenuDrawer;
