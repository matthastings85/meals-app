import React, { useEffect, useState } from "react";
import { API } from "../API";

const useFetchList = (listId) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [list, setList] = useState(null);
  const [acquired, setAcquired] = useState(null);
  const [mealPlanId, setMealPlanId] = useState(null);

  const fetchList = async (listId) => {
    const result = await API.getList(listId);
    console.log(result);
    setList(result.list);
    setAcquired(result.acquired);
    setLoading(false);
    setMealPlanId(result.mealPlanId);
  };

  useEffect(() => {
    fetchList(listId);
  }, [listId]);

  return { list, loading, error, setList, acquired, setAcquired, mealPlanId };
};

export default useFetchList;
