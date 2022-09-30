import { Alert, Box, Button, Grid, TextField, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";

const CreateMealPlan = ({ setMealPlan, setCreating, setBuilding }) => {
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const startDate = data.get("startDate");
    const length = parseInt(data.get("length"));

    // Check for form errors
    if (startDate === "") {
      setErrorMessage("Starting date is required");
      setError(true);
    } else if (!length) {
      setErrorMessage("Length must be a number");
      setError(true);
    } else {
      setError(false);
    }

    const plan = [];

    for (let i = 0; i < length; i++) {
      const day = new Date(startDate.replace(/-/g, "/"));
      day.setDate(day.getDate() + i);
      plan.push({ day: i + 1, date: day, recipe: {} });
    }
    console.log(plan);

    setMealPlan({ startDate, length, plan });
    setCreating(false);
    setBuilding(true);
  };

  return (
    <>
      {error && <Alert severity="error">{errorMessage}</Alert>}
      <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <TextField
              variant="standard"
              fullWidth
              id="startDate"
              helperText="Starting date"
              name="startDate"
              type="date"
              required
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              variant="standard"
              fullWidth
              id="length"
              helperText="Number of days in plan"
              name="length"
              type="number"
              defaultValue={7}
              required
            />
          </Grid>
        </Grid>
        <Button type="submit" variant="contained" sx={{ mt: 3, mb: 2 }}>
          Create
        </Button>
      </Box>
    </>
  );
};

export default CreateMealPlan;
