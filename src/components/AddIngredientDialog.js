import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import InputLabel from "@mui/material/InputLabel";
import OutlinedInput from "@mui/material/OutlinedInput";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import {
  Alert,
  Grid,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  TextField,
  Typography,
} from "@mui/material";
import SearchBar from "./SearchBar";
import { FOODAPI } from "../FOODAPI";
import Spinner from "./Spinner";

export default function AddIngredientDialog({ addIngredient }) {
  const [open, setOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [amount, setAmount] = useState("");
  const [unit, setUnit] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [ingredient, setIngredient] = useState(null);
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  // Search for Recipes
  const handleSearch = async (query) => {
    const result = await FOODAPI.searchIngredients(query);
    console.log(result);
    setSearchResults(result);
    setLoading(false);
  };

  // trigger search
  useEffect(() => {
    if (searchTerm === "") {
      setSearchResults([]);
      return;
    }
    setLoading(true);
    handleSearch(searchTerm);
  }, [searchTerm]);

  // const handleChange = (event) => {
  //   setAge(Number(event.target.value) || "");
  // };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const resetDialog = () => {
    setSearchTerm("");
    setAmount("");
    setUnit("");
    setSearchResults([]);
    setIngredient(null);
    setError(false);
    setErrorMessage("");
  };

  const handleClose = (event, reason) => {
    if (reason !== "backdropClick") {
      setOpen(false);
      resetDialog();
    }
  };

  const handleOk = () => {
    if (!ingredient) {
      setErrorMessage("You must select an ingredient.");
      setError(true);
      return;
    } else {
      setError(false);
      setErrorMessage("");
    }

    if (amount === "" || amount === 0) {
      setErrorMessage("You must add a valid amount.");
      setError(true);
      return;
    } else {
      setError(false);
      setErrorMessage("");
    }
    if (unit === "") {
      setErrorMessage("You must add a valid unit.");
      setError(true);
      return;
    } else {
      setError(false);
      setErrorMessage("");
    }

    addIngredient({
      name: ingredient.name,
      id: ingredient.id,
      amount: parseFloat(amount),
      unit,
      image: ingredient.image,
    });
    setOpen(false);
    resetDialog();
  };

  return (
    <Box>
      <Button onClick={handleClickOpen}>Add Ingredient</Button>
      <Dialog fullWidth disableEscapeKeyDown open={open} onClose={handleClose}>
        <DialogTitle>Add Ingredient</DialogTitle>
        <DialogContent>
          {!ingredient && (
            <Box sx={{ width: 1, pt: 1 }}>
              <SearchBar setSearchTerm={setSearchTerm} />
            </Box>
          )}
          {loading && <Spinner />}
          {searchResults.length > 0 && !ingredient && (
            <List>
              {searchResults.map((item, index) => {
                return (
                  <ListItem disableGutters disablePadding key={index}>
                    <ListItemButton onClick={() => setIngredient(item)}>
                      <ListItemText primary={item.name} />
                    </ListItemButton>
                  </ListItem>
                );
              })}
            </List>
          )}
          {ingredient && (
            <>
              <Box>
                <Typography>Ingredient: {ingredient.name}</Typography>
              </Box>
              <Box component="form" sx={{ mt: 1 }}>
                <Grid container spacing={2}>
                  <Grid item xs={4}>
                    <TextField
                      required
                      variant="standard"
                      fullWidth
                      id="amount"
                      label="Amount"
                      value={amount}
                      onChange={(event) => setAmount(event.target.value)}
                    />
                  </Grid>
                  <Grid item xs={8}>
                    <FormControl variant="standard" sx={{ width: 1 }}>
                      <InputLabel id="demo-dialog-select-label">
                        Unit
                      </InputLabel>
                      <Select
                        labelId="demo-dialog-select-label"
                        id="demo-dialog-select"
                        value={unit}
                        onChange={(event) => setUnit(event.target.value)}
                      >
                        {ingredient.possibleUnits.map((unit, index) => {
                          return (
                            <MenuItem key={index} value={unit}>
                              {unit}
                            </MenuItem>
                          );
                        })}
                      </Select>
                    </FormControl>
                  </Grid>
                </Grid>
              </Box>
            </>
          )}
          {/* <Box component="form" sx={{ display: "flex", flexWrap: "wrap" }}>
            <FormControl sx={{ m: 1, minWidth: 120 }}>
              <InputLabel htmlFor="demo-dialog-native">Age</InputLabel>
              <Select
                native
                value={age}
                onChange={handleChange}
                input={<OutlinedInput label="Age" id="demo-dialog-native" />}
              >
                <option aria-label="None" value="" />
                <option value={10}>Ten</option>
                <option value={20}>Twenty</option>
                <option value={30}>Thirty</option>
              </Select>
            </FormControl>
            <FormControl sx={{ m: 1, minWidth: 120 }}>
              <InputLabel id="demo-dialog-select-label">Age</InputLabel>
              <Select
                labelId="demo-dialog-select-label"
                id="demo-dialog-select"
                value={age}
                onChange={handleChange}
                input={<OutlinedInput label="Age" />}
              >
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                <MenuItem value={10}>Ten</MenuItem>
                <MenuItem value={20}>Twenty</MenuItem>
                <MenuItem value={30}>Thirty</MenuItem>
              </Select>
            </FormControl>
          </Box> */}
          {error && <Alert severity="error">{errorMessage}</Alert>}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleOk}>Ok</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
