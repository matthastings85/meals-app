import { Box, Button, Typography } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";

const CreateListFromMealPlan = ({ array, callback, listArray }) => {
  const navigate = useNavigate();
  const checkForList = (item) => {
    const index = listArray.findIndex(
      (element) => element.mealPlanId === item._id
    );
    if (index !== -1) return listArray[index];
    return null;
  };

  return (
    <>
      {array.map((item, index) => {
        const list = checkForList(item);

        return (
          <Box
            key={"mealPlan" + index}
            sx={{
              mt: 1,
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
