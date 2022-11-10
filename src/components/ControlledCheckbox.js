import React, { useState } from "react";
import Checkbox from "@mui/material/Checkbox";
import { Typography } from "@mui/material";
import { Box } from "@mui/system";
import BasicPopover from "./BasicPopover";

export default function ControlledCheckbox({
  callback,
  index,
  label,
  content,
  defaultState,
}) {
  const [checked, setChecked] = useState(defaultState ? defaultState : false);

  const handleChange = (event) => {
    setChecked(event.target.checked);
    callback(index, event.target.checked, setChecked);
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "flex-start",
        alignItems: "center",
      }}
    >
      <Checkbox
        checked={checked}
        onChange={handleChange}
        inputProps={{ "aria-label": "controlled" }}
      />
      <Typography>{label}</Typography>
      {content && <BasicPopover content={content} />}
    </Box>
  );
}
