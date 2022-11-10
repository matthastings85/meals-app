import { FoodBankOutlined } from "@mui/icons-material";
import {
  Avatar,
  Card,
  CardActionArea,
  CardContent,
  Typography,
} from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";

const HomeNavCard = ({ to, icon, title }) => {
  const navigate = useNavigate();
  return (
    <Card sx={{ width: 150 }}>
      <CardActionArea onClick={() => navigate("/" + to)}>
        <CardContent
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            textAlign: "center",
          }}
        >
          <Avatar
            sx={{
              width: 130,
              height: 100,
              color: "background.paper",
              bgcolor: "primary.main",
            }}
            variant="rounded"
          >
            {icon}
          </Avatar>
          <Typography
            component="h4"
            variant="subtitle1"
            sx={{ mt: 2, fontWeight: "600" }}
          >
            {title}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

export default HomeNavCard;
