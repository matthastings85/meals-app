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
import useGetFavorites from "../hooks/useGetFavorites";
import Spinner from "./Spinner";

const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="right" ref={ref} {...props} />;
});

const AddFavoriteDialog = ({ addFavorite }) => {
  const [user, setUser] = useContext(Context);
  const [open, setOpen] = useState(false);
  // const { favorites, loading, error } = useGetFavorites(user.recipes);

  const toggleOpen = () => {
    setOpen(!open);
  };
  return (
    <>
      <Button onClick={toggleOpen} sx={{ mt: 1 }}>
        Add Favorite
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

        <DialogContent>
          <List>
            {user.recipes.length > 0 &&
              user.recipes.map((item) => {
                return (
                  <ListItem
                    key={item.recipe.id}
                    button
                    onClick={() => {
                      addFavorite(item.recipe);
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
