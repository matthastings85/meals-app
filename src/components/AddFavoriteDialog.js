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

const AddFavoriteDialog = ({ addRecipe }) => {
  const [user, _setUser] = useContext(Context);
  const [open, setOpen] = useState(false);

  const toggleOpen = () => {
    setOpen(!open);
  };
  return (
    <>
      <Button size="small" onClick={toggleOpen}>
        Favorites
      </Button>
      <Dialog
        TransitionComponent={Transition}
        fullWidth
        maxWidth={"sm"}
        open={open}
        onClose={toggleOpen}
      >
        <DialogTitle>
          Favorites
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

        <DialogContent sx={{ p: 0 }}>
          <List>
            {user.favorites.length > 0 &&
              user.favorites.map((item, index) => {
                return (
                  <ListItem
                    key={index}
                    button
                    onClick={() => {
                      addRecipe(item.recipe);
                    }}
                  >
                    <ListItemAvatar>
                      <Avatar alt={item.recipe.title} src={item.recipe.image} />
                    </ListItemAvatar>
                    <ListItemText primary={item.recipe.title} />
                  </ListItem>
                );
              })}
          </List>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default AddFavoriteDialog;
