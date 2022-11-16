import React, { useContext } from "react";
import { Box, Card, CardContent, Container, Typography } from "@mui/material";
import HomeNavCard from "../components/HomeNavCard";
import {
  CalendarMonthRounded,
  Favorite,
  FoodBankOutlined,
  ListRounded,
} from "@mui/icons-material";
import Spinner from "../components/Spinner";

// Context
import { Context } from "../context";

const Home = () => {
  const [user, _setUser] = useContext(Context);

  if (!user) {
    return <Spinner />;
  }

  return (
    <Container component="main" maxWidth="xs">
      <Card sx={{ maxWidth: 400, width: 1, mt: 2 }}>
        <CardContent>
          <Typography component="h2" variant="h6">
            Welcome {user.firstName}!
          </Typography>
          <Typography>Happy Meal Planning!</Typography>
        </CardContent>
      </Card>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-around",
          flexWrap: "wrap",
          gap: "20px",
          mt: 2,
        }}
      >
        <HomeNavCard
          to="mealplans"
          title="Meal Plans"
          icon={<CalendarMonthRounded sx={{ fontSize: 80 }} />}
        />
        <HomeNavCard
          to="recipes"
          title="Recipes"
          icon={<FoodBankOutlined sx={{ fontSize: 80 }} />}
        />
        <HomeNavCard
          to="favorites"
          title="Favorites"
          icon={<Favorite sx={{ fontSize: 80 }} />}
        />
        <HomeNavCard
          to="lists"
          title="Shopping Lists"
          icon={<ListRounded sx={{ fontSize: 80 }} />}
        />
      </Box>
    </Container>
  );
};

export default Home;
