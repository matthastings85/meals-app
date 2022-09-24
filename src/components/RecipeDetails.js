import { Alert, Box, Button, Grid, TextField, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";

const RecipeDetails = ({ setRecipeDetails, setProgress }) => {
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  // const [equipmentArray, setEquipmentArray] = useState([1]);

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const recipeName = data.get("recipeName");
    const prepTime = parseInt(data.get("prepTime"));
    const cookTime = parseInt(data.get("cookTime"));
    const serves = parseInt(data.get("serves"));
    console.log({ recipeName, prepTime, cookTime, serves });

    if (recipeName === "") {
      setErrorMessage("Recipe Name is required");
      setError(true);
    }

    setRecipeDetails({ recipeName, prepTime, cookTime, serves });
    setProgress((prevProgress) => prevProgress + 1);
  };

  // const handleAdd = () => {
  //   console.log("add");
  //   setEquipmentArray([...equipmentArray, 1]);
  // };

  // const Equipment = ({ index }) => {
  //   return (
  //     <Grid item xs={12} sx={{ mt: 0 }}>
  //       <TextField
  //         variant="standard"
  //         fullWidth
  //         id={"equipment" + index}
  //         label="Equipment Name"
  //         name={"equipment" + index}
  //       />
  //     </Grid>
  //   );
  // };

  // useEffect(() => {}, [equipmentArray]);

  return (
    <>
      {error && <Alert severity="error">{errorMessage}</Alert>}
      <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              name="recipeName"
              required
              fullWidth
              id="recipeName"
              label="Recipe Name"
              autoFocus
              variant="standard"
            />
          </Grid>
          <Grid item xs={4}>
            <TextField
              variant="standard"
              fullWidth
              id="prepTime"
              label="Prep Time"
              name="prepTime"
              type="number"
            />
          </Grid>
          <Grid item xs={4}>
            <TextField
              variant="standard"
              fullWidth
              id="cookTime"
              label="Cook Time"
              name="cookTime"
              type="number"
            />
          </Grid>
          <Grid item xs={4}>
            <TextField
              variant="standard"
              fullWidth
              id="serves"
              label="Serves"
              name="serves"
              type="number"
            />
          </Grid>
          {/* <Grid item xs={12}>
          <Typography component="h2" variant="h6" sx={{ mt: 3, mb: 0 }}>
            Tools & Equipment Needed
          </Typography>
        </Grid>
        {equipmentArray.map((item, index) => {
          return <Equipment index={index} />;
        })}
        <Grid item xs={6}>
          <Button onClick={handleAdd}>Add Equipment</Button>
        </Grid> */}
        </Grid>

        <Button type="submit" variant="contained" sx={{ mt: 3, mb: 2 }}>
          Next
        </Button>
      </Box>
    </>
  );
};

export default RecipeDetails;
