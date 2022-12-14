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
import {
  Archive,
  ContentCopyOutlined,
  Delete,
  MoreVert,
} from "@mui/icons-material";
import { Box } from "@mui/system";
import { Context } from "../context";
import { API } from "../API";
import DuplicatePlanDialog from "./DuplicatePlanDialog";

const MealPlanOverviewCard = ({ plan, archived }) => {
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
    handleClose();
    // console.log("archive", plan._id);
    const result = await API.archiveMealPlan(plan._id, user.userId);
    // console.log(result);
    const mealPlans = [...result.data.mealPlans];
    const archivedMealPlans = [...result.data.archivedMealPlans];
    setUser({
      ...user,
      mealPlans: mealPlans,
      archivedMealPlans: archivedMealPlans,
    });
  };

  const handleDelete = async () => {
    handleClose();
    // console.log("delete: ", plan._id, user.userId);
    const result = await API.deleteMealPlan(plan._id, user.userId);
    // console.log(result);
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
        title={`${start.toLocaleDateString("en-us", {
          weekday: "short",
          year: "numeric",
          month: "short",
          day: "numeric",
        })}`}
        subheader={`${plan.length} Day Meal Plan`}
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
          {!archived && (
            <Button onClick={handleArchive} startIcon={<Archive />}>
              archive
            </Button>
          )}
          <DuplicatePlanDialog mealPlan={plan} />
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
