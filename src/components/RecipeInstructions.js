import {
  Box,
  Button,
  Grid,
  List,
  ListItem,
  ListItemText,
  TextField,
  Typography,
} from "@mui/material";
import React, { useState } from "react";

const RecipeInstructions = ({ instructions, setInstructions, setProgress }) => {
  const [instruction, setInstruction] = useState("");
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const instruction = data.get("instruction");

    setInstructions([...instructions, instruction]);
    setInstruction("");
  };

  const handleNext = () => {
    console.log("next");
    console.log(instructions);
    setProgress((prevProgress) => prevProgress + 1);
  };
  const handleBack = () => {
    console.log("back");
    setProgress((prevProgress) => prevProgress - 1);
  };
  return (
    <>
      {instructions.length > 0 && (
        <List>
          {instructions.map((item) => {
            return (
              <ListItem key={item}>
                <ListItemText primary={item} />
              </ListItem>
            );
          })}
        </List>
      )}
      <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Typography component="h2" variant="h6" sx={{ mt: 3 }}>
              Instructions
            </Typography>
          </Grid>

          <Grid item xs={12}>
            <TextField
              required
              variant="standard"
              fullWidth
              multiline={true}
              id="instruction"
              label="Instruction"
              name="instruction"
              value={instruction}
              onChange={(event) => setInstruction(event.target.value)}
            />
          </Grid>
          <Grid item xs={6}>
            <Button type="submit">Add Instruction</Button>
          </Grid>
        </Grid>
        <Button onClick={handleBack} variant="contained" sx={{ mt: 3, mb: 2 }}>
          Back
        </Button>
        <Button onClick={handleNext} variant="contained" sx={{ mt: 3, mb: 2 }}>
          Next
        </Button>
      </Box>
    </>
  );
};

export default RecipeInstructions;
