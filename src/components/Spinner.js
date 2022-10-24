import { Box, CircularProgress } from "@mui/material";
import React from "react";

const Spinner = () => {
  const divStyle = {
    border: "5px solid lightgray",
    borderTop: "5px solid gray",
    borderRadius: "50%",
    width: "50px",
    height: "50px",
    animation: "spin 0.8s linear infinite",
    margin: "20px auto",
  };
  return (
    <Box sx={{ display: "flex", justifyContent: "center", m: 2 }}>
      <CircularProgress color="primary" />
    </Box>
  );
};

export default Spinner;
