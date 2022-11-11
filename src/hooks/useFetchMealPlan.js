import { useCallback, useEffect, useState } from "react";
import { API } from "../API";

const useFetchMealPlan = (mealPlanId) => {
  const [mpLoading, setMpLoading] = useState(true);
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [mealPlan, setMealPlan] = useState(null);
  const [startDate, setStartDate] = useState(null);

  const fetchMealPlan = useCallback(async (mealPlanId) => {
    const result = await API.getMealPlan(mealPlanId);

    setMealPlan(result);
    setStartDate(
      new Date(result.startDate.replace(/-/g, "/")).toLocaleDateString(
        "en-us",
        {
          weekday: "short",
          year: "numeric",
          month: "short",
          day: "numeric",
        }
      )
    );
    setMpLoading(false);
  });

  useEffect(() => {
    fetchMealPlan(mealPlanId);
  }, []);

  return {
    mpLoading,
    error,
    errorMessage,
    mealPlan,
    startDate,
    setMealPlan,
  };
};

export default useFetchMealPlan;
