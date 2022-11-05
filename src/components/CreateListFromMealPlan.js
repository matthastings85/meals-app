import { Box, Button, Typography } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";
import { checkForList } from "../helpers/createList";

const CreateListFromMealPlan = ({ array, callback, listArray }) => {
  const navigate = useNavigate();

  return (
    <>
      {array.map((item, index) => {
        const list = checkForList(item, listArray);

        return (
          <Box
            key={"mealPlan" + index}
            sx={{
              mt: 1,
              width: 1,
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <Typography component="h3" variant="h6">
              Meal Plan: {item.startDate}
            </Typography>
            {list ? (
              <Button id={index} onClick={() => navigate("/lists/" + list._id)}>
                View List
              </Button>
            ) : (
              <Button id={index} onClick={callback}>
                Create List
              </Button>
            )}
          </Box>
        );
      })}
    </>
  );
};

export default CreateListFromMealPlan;
