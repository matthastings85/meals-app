import React, { useCallback, useEffect, useState } from "react";
import {
  Box,
  List,
  ListItemButton,
  ListItemText,
  Typography,
} from "@mui/material";
import SearchBar from "./SearchBar";
import { FOODAPI } from "../FOODAPI";

const SearchByName = ({ callback }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  // Search for Recipes
  const handleSearch = async (query) => {
    const result = await FOODAPI.autoSearch(query);
    setSearchResults(result);
  };

  // trigger search
  useEffect(() => {
    if (searchTerm === "") return;
    handleSearch(searchTerm);
  }, [searchTerm]);

  return (
    <Box sx={{ width: "100%" }}>
      <SearchBar setSearchTerm={setSearchTerm} />
      {searchResults.length > 0 && (
        <List>
          {searchResults.map((item) => {
            return (
              <ListItemButton
                onClick={callback}
                id={item.id}
                divider
                key={item.id}
              >
                <ListItemText primary={item.title} />
              </ListItemButton>
            );
          })}
        </List>
      )}
    </Box>
  );
};

export default SearchByName;
