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

export default function AddInstructionDialog({ addInstruction }) {
  const [open, setOpen] = useState(false);
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [instruction, setInstruction] = useState("");

  const handleClickOpen = () => {
    setOpen(true);
  };

  const resetDialog = () => {
    setError(false);
    setErrorMessage("");
    setInstruction("");
  };

  const handleClose = (event, reason) => {
    if (reason !== "backdropClick") {
      setOpen(false);
      resetDialog();
    }
  };

  const handleOk = () => {
    if (!instruction) {
      setErrorMessage("You must add a valid instruction.");
      setError(true);
      return;
    } else {
      setError(false);
      setErrorMessage("");
    }

    addInstruction(instruction);
    setOpen(false);
    resetDialog();
  };

  return (
    <Box>
      <Button onClick={handleClickOpen}>Add Instruction</Button>
      <Dialog fullWidth disableEscapeKeyDown open={open} onClose={handleClose}>
        <DialogTitle>Add Instruction</DialogTitle>
        <DialogContent>
          <Box component="form" sx={{ mt: 1 }}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  required
                  multiline
                  variant="standard"
                  fullWidth
                  id="instruction"
                  label="Step"
                  value={instruction}
                  onChange={(event) => setInstruction(event.target.value)}
                />
              </Grid>
            </Grid>
          </Box>

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
