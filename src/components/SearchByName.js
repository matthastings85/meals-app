import React, { useCallback, useEffect, useState } from "react";
import {
  Avatar,
  Box,
  List,
  ListItem,
  ListItemAvatar,
  ListItemButton,
  ListItemText,
  Typography,
} from "@mui/material";
import SearchBar from "./SearchBar";
import { FOODAPI } from "../FOODAPI";
import RecipePreviewCard from "./RecipePreviewCard";
import Spinner from "./Spinner";

const SearchByName = ({ callback, setPreview }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(false);

  // Search for Recipes
  const handleSearch = async (query) => {
    const result = await FOODAPI.searchRecipes(query);
    // console.log(result);
    setSearchResults(result);
    setLoading(false);
  };

  // trigger search
  useEffect(() => {
    if (searchTerm === "") {
      setSearchResults([]);
      return;
    }
    setLoading(true);
    handleSearch(searchTerm);
  }, [searchTerm]);

  return (
    <Box sx={{ width: 1 }}>
      <SearchBar setSearchTerm={setSearchTerm} />
      {loading && <Spinner />}
      {searchResults.length > 0 && (
        <Box>
          {searchResults.map((item, index) => {
            return (
              <Box key={index} sx={{ mt: 1 }}>
                <RecipePreviewCard
                  setPreview={setPreview}
                  enablePreview
                  item={item}
                />
              </Box>
            );
          })}
        </Box>
      )}
    </Box>
  );
};

export default SearchByName;
