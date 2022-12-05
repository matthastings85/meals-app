import { ExpandMore, ListRounded } from "@mui/icons-material";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Avatar,
  Box,
  Button,
  Container,
  Typography,
} from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { API } from "../API";
import AddToListDialog from "../components/AddToLIstDialog";
import ControlledCheckbox from "../components/ControlledCheckbox";
import Spinner from "../components/Spinner";
import { Context } from "../context";
import { createList } from "../helpers/createList";
import useFetchList from "../hooks/useFetchList";

const ListView = () => {
  const [user, setUser] = useContext(Context);
  const { listId } = useParams();
  const navigate = useNavigate();
  const {
    list,
    loading,
    error,
    setList,
    acquired,
    setAcquired,
    mealPlanId,
    mealPlan,
  } = useFetchList(listId);

  const updateDatabase = async (acquiredList, listList) => {
    const result = await API.updateList(acquiredList, listList, listId);
    // console.log(result);
  };

  const handleCheck = (index, checked, setChecked) => {
    if (checked) {
      const checkedItem = list[index];
      const stagedList = [...list];
      stagedList.splice(index, 1);
      setAcquired([...acquired, checkedItem]);
      setList([...stagedList]);
      setChecked(false);
      updateDatabase([...acquired, checkedItem], [...stagedList]);
    }
    if (!checked) {
      const checkedItem = acquired[index];
      const stagedList = [...acquired];
      stagedList.splice(index, 1);
      setList([...list, checkedItem]);
      setAcquired([...stagedList]);
      setChecked(true);
      updateDatabase([...stagedList], [...list, checkedItem]);
    }
  };

  const addToList = (name) => {
    const newItem = {
      name,
      amount: "",
      unit: "",
      id: "",
      recipeTitle: "manually added",
    };
    updateDatabase(acquired, [newItem, ...list]);
    setList([newItem, ...list]);
  };

  const refreshList = async () => {
    const createdList = createList(mealPlan);

    const newAcquired = [];
    const newList = [];

    createdList.map((item) => {
      if (acquired.findIndex((a) => a.name === item.name) !== -1) {
        newAcquired.push(item);
      } else {
        newList.push(item);
      }
    });
    const manualAndAquired = acquired.filter(
      (item) => item.recipeTitle === "manually added"
    );
    const manualItems = list.filter(
      (item) => item.recipeTitle === "manually added"
    );

    newAcquired.push(...manualAndAquired);
    newList.push(...manualItems);
    updateDatabase(newAcquired, newList);
    setAcquired(newAcquired);
    setList(newList);
  };

  useEffect(() => {
    if (mealPlan) refreshList();
  }, [mealPlan]);

  return (
    <Container component="main" maxWidth="xs" sx={{ mb: 8, width: 1 }}>
      <Box
        sx={{
          mt: 2,
          mb: 2,
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
            <ListRounded />
          </Avatar>
          <Typography component="h1" variant="h4">
            Shopping List
          </Typography>
        </Box>
        {mealPlan && (
          <Typography>For Meal Plan Starting: {mealPlan.startDate}</Typography>
        )}
        <Box>
          <AddToListDialog addToList={addToList} />
          <Button onClick={refreshList}>refresh list</Button>
          <Button onClick={() => navigate(`/mealplans/${mealPlanId}`)}>
            go to meal plan
          </Button>
        </Box>
      </Box>
      {loading ? (
        <Spinner />
      ) : (
        <>
          <Accordion defaultExpanded>
            <AccordionSummary
              expandIcon={<ExpandMore />}
              aria-controls="panel-content"
              id="panel-header"
            >
              <Typography>Need To Acquire</Typography>
            </AccordionSummary>
            <AccordionDetails>
              {list && list.length > 0 ? (
                list.map((item, index) => {
                  return (
                    <ControlledCheckbox
                      key={index}
                      callback={handleCheck}
                      index={index}
                      label={item.name}
                      content={item}
                      defaultState={false}
                    />
                  );
                })
              ) : (
                <Typography>
                  You have everything you need! Happy cooking!
                </Typography>
              )}
            </AccordionDetails>
          </Accordion>
          <Accordion>
            <AccordionSummary
              expandIcon={<ExpandMore />}
              aria-controls="panel-content"
              id="panel-header"
            >
              <Typography>Already Acquired</Typography>
            </AccordionSummary>
            <AccordionDetails>
              {acquired && acquired.length > 0 ? (
                acquired.map((item, index) => {
                  return (
                    <ControlledCheckbox
                      key={index}
                      callback={handleCheck}
                      index={index}
                      label={item.name}
                      content={item}
                      defaultState={true}
                    />
                  );
                })
              ) : (
                <Typography>Start grabbing what you need...</Typography>
              )}
            </AccordionDetails>
          </Accordion>
        </>
      )}
    </Container>
  );
};

export default ListView;
