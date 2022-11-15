import React, { forwardRef, useContext, useState } from "react";
import {
  AppBar,
  Avatar,
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Slide,
  Toolbar,
  Typography,
} from "@mui/material";
import { Close } from "@mui/icons-material";
import { Context } from "../context";
import ExtractRecipe from "../views/ExtractRecipe";

const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const AddFromUrlDialog = ({ addRecipe }) => {
  const [user, _setUser] = useContext(Context);
  const [open, setOpen] = useState(false);
  const [urlRecipe, setUrlRecipe] = useState(null);

  const toggleOpen = () => {
    setOpen(!open);
  };

  return (
    <>
      <Button size="small" onClick={toggleOpen}>
        Add url
      </Button>
      <Dialog
        TransitionComponent={Transition}
        fullScreen
        maxWidth="sm"
        open={open}
        onClose={toggleOpen}
      >
        <AppBar sx={{ position: "relative" }}>
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              onClick={toggleOpen}
              aria-label="close"
            >
              <Close />
            </IconButton>
            <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
              Add URL Recipe
            </Typography>
            {urlRecipe && (
              <>
                <Button
                  autoFocus
                  onClick={() => {
                    addRecipe(urlRecipe);
                  }}
                >
                  add
                </Button>
              </>
            )}
          </Toolbar>
        </AppBar>
        <DialogContent sx={{ p: 0 }}>
          <ExtractRecipe callback={setUrlRecipe} />
        </DialogContent>
      </Dialog>
    </>
  );
};

export default AddFromUrlDialog;
