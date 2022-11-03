import { TextField } from "@mui/material";
import React, { useState, useRef, useEffect } from "react";

const SearchBar = ({ setSearchTerm }) => {
  const [state, setState] = useState("");
  const initial = useRef(true);

  useEffect(() => {
    if (initial.current) {
      initial.current = false;
      return;
    }

    const timer = setTimeout(() => {
      setSearchTerm(state);
    }, 500);

    return () => clearTimeout(timer);
  }, [setSearchTerm, state]);

  return (
    <TextField
      fullWidth
      label="Search"
      name="search"
      onChange={(e) => setState(e.currentTarget.value)}
      value={state}
    />
  );
};

export default SearchBar;
