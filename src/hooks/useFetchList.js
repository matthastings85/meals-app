import React, { useEffect, useState } from "react";
import { API } from "../API";

const useFetchList = (listId) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [list, setList] = useState(null);
  const [acquired, setAcquired] = useState(null);
  const [mealPlanId, setMealPlanId] = useState(null);
  const [mealPlan, setMealPlan] = useState(null);

  const fetchList = async (listId) => {
    const result = await API.getList(listId);
    console.log(result);
    setList(result.list);
    setAcquired(result.acquired);
    setMealPlanId(result.mealPlanId);

    const plan = await API.getMealPlan(result.mealPlanId);
    console.log(plan);
    setMealPlan(plan);
    setLoading(false);
  };

  useEffect(() => {
    fetchList(listId);
  }, [listId]);

  return {
    list,
    loading,
    error,
    setList,
    acquired,
    setAcquired,
    mealPlanId,
    mealPlan,
  };
};

export default useFetchList;
