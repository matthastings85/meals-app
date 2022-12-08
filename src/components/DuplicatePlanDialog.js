import React, { forwardRef, useContext, useState } from "react";
import {
  Box,
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  Grid,
  IconButton,
  Slide,
  TextField,
} from "@mui/material";
import { Close, ContentCopyRounded } from "@mui/icons-material";
import { API } from "../API";
import { Context } from "../context";
import { useNavigate } from "react-router-dom";

const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="right" ref={ref} {...props} />;
});

const DuplicatePlanDialog = ({ mealPlan }) => {
  const [user, setUser] = useContext(Context);
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  // State for form
  const [startDate, setStartDate] = useState(
    new Date().toISOString().slice(0, 10)
  );

  const toggleOpen = () => {
    setOpen(!open);
  };

  const handleDuplicate = async (mealPlan, startDate) => {
    const { plan, length } = mealPlan;
    const userId = user.userId;

    const result = await API.newMealPlan({ plan, length, startDate }, userId);

    setUser(result.data.user);
    navigate("/mealplans/" + result.data.mealPlanId);
  };
  return (
    <>
      <Button onClick={toggleOpen} startIcon={<ContentCopyRounded />}>
        duplicate
      </Button>
      <Dialog TransitionComponent={Transition} open={open} onClose={toggleOpen}>
        <DialogTitle>
          Duplicate Plan
          <IconButton
            aria-label="close"
            onClick={toggleOpen}
            sx={{
              position: "absolute",
              right: 2,
              top: 2,
              color: (theme) => theme.palette.grey[500],
            }}
          >
            <Close />
          </IconButton>
        </DialogTitle>

        <DialogContent>
          <Box sx={{ mt: 1 }}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  variant="standard"
                  id="startDate"
                  helperText="Select New Start Date"
                  name="startDate"
                  type="date"
                  value={startDate}
                  onChange={(event) => setStartDate(event.target.value)}
                  required
                />
              </Grid>
            </Grid>
            <Button
              variant="contained"
              onClick={() => {
                handleDuplicate(mealPlan, startDate);
                toggleOpen();
              }}
              sx={{ mt: 3, mb: 2 }}
            >
              duplicate plan
            </Button>
          </Box>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default DuplicatePlanDialog;
