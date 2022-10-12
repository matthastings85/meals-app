import React, { useState } from "react";
import Popover from "@mui/material/Popover";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { IconButton } from "@mui/material";
import { Info } from "@mui/icons-material";

export default function BasicPopover({ content }) {
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  const { amount, unit, recipeTitle, amount2, unit2, recipeTitle2 } = content;

  return (
    <div>
      <IconButton
        aria-describedby={id}
        variant="contained"
        onClick={handleClick}
      >
        <Info />
      </IconButton>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
      >
        <Typography sx={{ p: 2 }}>
          Amount: {amount} {unit}
        </Typography>
        <Typography sx={{ p: 2 }}>From: {recipeTitle} </Typography>
        {amount2 && unit2 && recipeTitle2 && (
          <>
            <Typography sx={{ p: 2 }}>
              Amount: {amount2} {unit2}
            </Typography>
            <Typography sx={{ p: 2 }}>From: {recipeTitle2} </Typography>
          </>
        )}
      </Popover>
    </div>
  );
}
