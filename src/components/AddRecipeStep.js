import {
  Button,
  Step,
  StepContent,
  StepLabel,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import React from "react";

const AddRecipeStep = ({
  label,
  description,
  form,
  nextLabel,
  backLabel,
  handleNext,
  handleBack,
}) => {
  return (
    <Step>
      <StepLabel>{label}</StepLabel>
      <StepContent>
        <Typography>{description}</Typography>
        {form}
        <Box sx={{ mb: 2 }}>
          <div>
            <Button
              variant="contained"
              onClick={handleNext}
              sx={{ mt: 1, mr: 1 }}
            >
              {nextLabel}
            </Button>

            <Button
              disabled={backLabel !== ""}
              onClick={handleBack}
              sx={{ mt: 1, mr: 1 }}
            >
              {backLabel}
            </Button>
          </div>
        </Box>
      </StepContent>
    </Step>
  );
};

export default AddRecipeStep;
