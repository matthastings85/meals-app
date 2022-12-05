import React, { forwardRef, useState } from "react";
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
import { Close } from "@mui/icons-material";

const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="right" ref={ref} {...props} />;
});

const WriteInDialog = ({ handleAdd }) => {
  const [open, setOpen] = useState(false);

  // State for form
  const [name, setName] = useState("");

  const toggleOpen = () => {
    setOpen(!open);
  };
  return (
    <>
      <Button onClick={toggleOpen}>Write in</Button>
      <Dialog
        TransitionComponent={Transition}
        fullWidth
        maxWidth={"sm"}
        open={open}
        onClose={toggleOpen}
      >
        <DialogTitle>
          Meal w/o Recipe
          <IconButton
            aria-label="close"
            onClick={toggleOpen}
            sx={{
              position: "absolute",
              right: 8,
              top: 8,
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
                  required
                  fullWidth
                  id="itemName"
                  label="Meal Name"
                  autoFocus
                  variant="standard"
                  value={name}
                  onChange={(event) => setName(event.target.value)}
                />
              </Grid>
            </Grid>
            <Button
              variant="contained"
              onClick={() => {
                handleAdd(name);
                toggleOpen();
                setName("");
              }}
              sx={{ mt: 3, mb: 2 }}
            >
              Add
            </Button>
          </Box>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default WriteInDialog;
