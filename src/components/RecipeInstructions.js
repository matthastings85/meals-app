import { Box, Button, Grid, List, ListItem, ListItemText } from "@mui/material";
import React, { useState } from "react";
import AddInstructionDialog from "./AddInstructionDialog";

const RecipeInstructions = ({
  instructions,
  setInstructions,
  handleNext,
  handleBack,
}) => {
  const addInstruction = (instruction) => {
    console.log(instruction);
    const newInstruction = {
      number: instructions.length + 1,
      step: instruction,
    };
    setInstructions((prev) => [...prev, newInstruction]);
  };

  return (
    <>
      {instructions.length > 0 && (
        <List>
          {instructions.map((item, index) => {
            return (
              <ListItem disablePadding key={index}>
                <ListItemText primary={item.step} />
              </ListItem>
            );
          })}
        </List>
      )}
      <AddInstructionDialog addInstruction={addInstruction} />
      <Box sx={{ mt: 1 }}>
        <Button onClick={handleNext} variant="contained" sx={{ mt: 3, mr: 1 }}>
          Continue
        </Button>
        <Button onClick={handleBack} sx={{ mt: 3, mr: 1 }}>
          Back
        </Button>
      </Box>
    </>
  );
};

export default RecipeInstructions;
