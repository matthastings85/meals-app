import React, { useContext, useState } from "react";
import {
  Button,
  Card,
  CardActions,
  CardHeader,
  IconButton,
  Popover,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { Archive, Delete, MoreVert } from "@mui/icons-material";
import { Box } from "@mui/system";
import { Context } from "../context";
import { API } from "../API";

const MealPlanOverviewCard = ({ plan }) => {
  const [user, setUser] = useContext(Context);
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  const processDates = (startDate, length) => {
    const start = new Date(startDate.replace(/-/g, "/"));
    const end = new Date();

    end.setDate(start.getDate() + (length - 1));

    return { start, end };
  };
  const { start, end } = processDates(plan.startDate, plan.length);

  const handleArchive = async () => {
    console.log("archive", plan._id);
    const result = await API.archiveMealPlan(plan._id);
    console.log(result);
  };

  const handleDelete = async () => {
    console.log("delete: ", plan._id, user.userId);
    const result = await API.deleteMealPlan(plan._id, user.userId);
    console.log(result);
    setUser(result.data.user);
  };

  return (
    <Card sx={{ width: 1, maxWidth: "sm", mt: 1 }}>
      <CardHeader
        action={
          <IconButton onClick={handleClick} aria-label="settings">
            <MoreVert />
          </IconButton>
        }
        title={`${plan.length} Day Meal Plan`}
        subheader={`${start.toLocaleDateString("en-us", {
          weekday: "short",
          year: "numeric",
          month: "short",
          day: "numeric",
        })}
        to
        ${end.toLocaleDateString("en-us", {
          weekday: "short",
          year: "numeric",
          month: "short",
          day: "numeric",
        })}`}
      />
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
            gap: "5px",
            p: 1,
          }}
        >
          <Button onClick={handleArchive} startIcon={<Archive />}>
            archive
          </Button>
          <Button onClick={handleDelete} startIcon={<Delete />}>
            delete
          </Button>
        </Box>
      </Popover>

      <CardActions sx={{ display: "flex", justifyContent: "center" }}>
        <Button
          onClick={() => {
            navigate("/mealplans/" + plan._id);
          }}
        >
          View Plan
        </Button>
      </CardActions>
    </Card>
  );
};

export default MealPlanOverviewCard;
