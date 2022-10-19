import { ExpandMore, ListRounded } from "@mui/icons-material";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Avatar,
  Box,
  Container,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { API } from "../API";
import ControlledCheckbox from "../components/ControlledCheckbox";
import Spinner from "../components/Spinner";
import useFetchList from "../hooks/useFetchList";

const ListView = () => {
  const { listId } = useParams();
  const { list, loading, error, setList, acquired, setAcquired } =
    useFetchList(listId);

  const updateDatabase = async (acquiredList, listList) => {
    const result = await API.updateList(acquiredList, listList, listId);
    console.log(result);
  };

  const handleCheck = (index, checked, itemId, setChecked) => {
    console.log(index, checked, itemId);
    if (checked) {
      const checkedItem = list.filter((item) => item.id === itemId);
      const stagedList = list.filter((item) => item.id !== itemId);
      setAcquired([...acquired, ...checkedItem]);
      setList([...stagedList]);
      setChecked(false);
      updateDatabase([...acquired, ...checkedItem], [...stagedList]);
    }
    if (!checked) {
      const checkedItem = acquired.filter((item) => item.id === itemId);
      const stagedList = acquired.filter((item) => item.id !== itemId);
      setList([...list, ...checkedItem]);
      setAcquired([...stagedList]);
      setChecked(true);
      updateDatabase([...stagedList], [...list, ...checkedItem]);
    }
  };

  return (
    <Container component="main" maxWidth="100%" sx={{ mb: 8, width: 400 }}>
      <Box
        sx={{
          mt: 1,
          mb: 3,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: "primary.main" }}>
          <ListRounded />
        </Avatar>
        <Typography component="h1" variant="h4">
          Shopping Lists
        </Typography>
        {loading && <Spinner />}
      </Box>
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
    </Container>
  );
};

export default ListView;
