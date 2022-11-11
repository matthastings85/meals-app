import React, { forwardRef, useState } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import ListItemText from "@mui/material/ListItemText";
import ListItem from "@mui/material/ListItem";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import CloseIcon from "@mui/icons-material/Close";
import Slide from "@mui/material/Slide";
import { Box } from "@mui/material";
import SearchByName from "./SearchByName";
import RecipeCard from "./RecipeCard";

const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function SearchDialog({ toggleSearching, callback }) {
  // callback = handleSelect -> adds recipe to mean plan
  const [open, setOpen] = useState(false);
  const [preview, setPreview] = useState(null);

  const handleClickOpen = () => {
    setOpen(true);
    toggleSearching();
  };

  const handleClose = () => {
    setOpen(false);
    toggleSearching();
  };
  const handleAdd = () => {
    callback(preview);
    setOpen(false);
  };

  return (
    <>
      <Button size="small" onClick={handleClickOpen}>
        Search
      </Button>
      <Dialog
        fullScreen
        open={open}
        onClose={handleClose}
        TransitionComponent={Transition}
      >
        <AppBar sx={{ position: "relative" }}>
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              onClick={handleClose}
              aria-label="close"
            >
              <CloseIcon />
            </IconButton>
            <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
              Search Recipes
            </Typography>
            {preview && (
              <>
                <Button onClick={() => setPreview(null)}>close preview</Button>
                <Button autoFocus onClick={handleAdd}>
                  add
                </Button>
              </>
            )}
          </Toolbar>
        </AppBar>
        <Box
          sx={{
            m: 2,
            display: "flex",
            justifyContent: "center",
          }}
        >
          <Box
            sx={{
              width: 1,
              maxWidth: "sm",
            }}
          >
            {!preview ? (
              <SearchByName setPreview={setPreview} callback={callback} />
            ) : (
              <RecipeCard recipe={preview} />
            )}
          </Box>
        </Box>
      </Dialog>
    </>
  );
}
