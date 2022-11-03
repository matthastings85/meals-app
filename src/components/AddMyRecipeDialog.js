import React, { forwardRef, useContext, useState } from "react";
import {
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
} from "@mui/material";
import { Close } from "@mui/icons-material";
import { Context } from "../context";

const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="right" ref={ref} {...props} />;
});

const AddMyRecipeDialog = ({ addRecipe }) => {
  const [user, _setUser] = useContext(Context);
  const [open, setOpen] = useState(false);

  const toggleOpen = () => {
    setOpen(!open);
  };
  return (
    <>
      <Button onClick={toggleOpen}>My Recipes</Button>
      <Dialog
        TransitionComponent={Transition}
        fullWidth
        maxWidth={"sm"}
        open={open}
        onClose={toggleOpen}
      >
        <DialogTitle>
          My Recipes
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
          <List>
            {user.recipes.length > 0 &&
              user.recipes.map((item, index) => {
                return (
                  <ListItem
                    key={index}
                    button
                    onClick={() => {
                      addRecipe(item);
                    }}
                  >
                    <ListItemAvatar>
                      <Avatar alt={item.title} src={item.image} />
                    </ListItemAvatar>
                    <ListItemText primary={item.title} />
                  </ListItem>
                );
              })}
          </List>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default AddMyRecipeDialog;
