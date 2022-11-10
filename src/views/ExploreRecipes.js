import { ExpandMore, Search, SearchRounded } from "@mui/icons-material";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Avatar,
  Button,
  Typography,
} from "@mui/material";
import { Box, Container } from "@mui/system";
import React, { useEffect, useState } from "react";
import ControlledCheckbox from "../components/ControlledCheckbox";
import RecipeCard from "../components/RecipeCard";
import RecipePreviewCard from "../components/RecipePreviewCard";
import Spinner from "../components/Spinner";
import { FOODAPI } from "../FOODAPI";

const ExploreRecipes = () => {
  const [recipes, setRecipes] = useState([]);
  const [selected, setSelected] = useState(null);
  const [loading, setLoading] = useState(true);
  const [tags, setTags] = useState([]);
  const [activeTags, setActiveTags] = useState([]);

  const cuisine = [
    "african",
    "chinese",
    "japanese",
    "korean",
    "vietnamese",
    "thai",
    "indian",
    "british",
    "irish",
    "french",
    "italian",
    "mexican",
    "spanish",
    "middle eastern",
    "jewish",
    "american",
    "cajun",
    "southern",
    "greek",
    "german",
    "nordic",
    "eastern european",
    "caribbean",
    "latin american",
  ];

  const diet = [
    "pescetarian",
    "lacto vegetarian",
    "ovo vegetarian",
    "vegan",
    "paleo",
    "primal",
    "vegetarian",
  ];

  const intolerances = [
    "dairy",
    "egg",
    "gluten",
    "peanut",
    "sesame",
    "seafood",
    "shellfish",
    "soy",
    "sulfite",
    "tree nut",
    "wheat",
  ];

  const type = [
    "main course",
    "side dish",
    "dessert",
    "appetizer",
    "salad",
    "bread",
    "breakfast",
    "soup",
    "beverage",
    "sauce",
    "drink",
  ];

  const fetchRandom = async (tags) => {
    const random = await FOODAPI.getRandom(tags);
    setRecipes(random.recipes);
    setLoading(false);
  };

  // const updateTags = (checked, index, array) => {
  //   if (checked) {
  //     console.log(checked, array[index]);
  //     setTags([...tags, array[index]]);
  //   }
  //   if (!checked) {
  //     console.log(checked, array[index]);
  //     const filtered = tags.filter((item) => item !== array[index]);
  //     setTags(filtered);
  //   }
  // };

  // const handleCuisineCheck = (index, checked) => {
  //   updateTags(checked, index, cuisine);
  // };

  // const updateRecipes = () => {
  //   setActiveTags(tags);
  //   fetchRandom(tags.join());
  // };

  useEffect(() => {
    fetchRandom();
  }, []);

  return (
    <Container component="main" maxWidth="xs" sx={{ width: 1 }}>
      <Box
        sx={{
          mt: 2,
          mb: 1,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "primary.main" }}>
            <SearchRounded />
          </Avatar>
          <Typography component="h1" variant="h4">
            Explore Recipes
          </Typography>
        </Box>
        {/* <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMore />}
            aria-controls="panel-content"
            id="panel-header"
          >
            <Typography>Filter by cuisine</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Box
              sx={{
                display: "flex",
                flexWrap: "wrap",
              }}
            >
              {cuisine.map((item, index) => {
                return (
                  <ControlledCheckbox
                    key={index}
                    callback={handleCuisineCheck}
                    index={index}
                    label={item}
                    defaultState={false}
                  />
                );
              })}
            </Box>
          </AccordionDetails>
        </Accordion>
        {tags.length > 0 && (
          <Button onClick={updateRecipes}>Update Recipes</Button>
        )} */}
      </Box>
      {loading && <Spinner />}
      {recipes.length > 0 &&
        !selected &&
        recipes.map((item, index) => {
          return (
            <Box key={index} sx={{ mb: 1 }}>
              <RecipePreviewCard
                key={index}
                item={item}
                setSelected={setSelected}
              />
            </Box>
          );
        })}
      {selected && (
        <>
          <Button
            sx={{ alignSelf: "flex-start" }}
            onClick={() => setSelected(null)}
          >
            back
          </Button>
          <RecipeCard recipe={selected} />
        </>
      )}
    </Container>
  );
};

export default ExploreRecipes;
