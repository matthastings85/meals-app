import { useEffect, useState } from "react";
import { API } from "../API";

const useGetMealPlans = (mealPlans) => {
  const [plansArray, setPlansArray] = useState([]);
  const [loading, setLoading] = useState(true);
  const fetchMealPlans = async (mealPlans) => {
    const stagingArray = [];
    for (let id of mealPlans) {
      const result = await API.getMealPlan(id);
      stagingArray.push(result);
    }
    setPlansArray(stagingArray);
    setLoading(false);
  };

  useEffect(() => {
    fetchMealPlans(mealPlans);
  }, [mealPlans]);

  return { plansArray, loading };
};

export default useGetMealPlans;
