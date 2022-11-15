import { useEffect, useState } from "react";
import { API } from "../API";

const useGetMealPlans = (mealPlansArray, archievedMealPlansArray) => {
  const [plansArray, setPlansArray] = useState([]);
  const [archivedArray, setArchivedArray] = useState([]);
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

  const fetchArchivedMealPlans = async (archivedPlans) => {
    const stagingArray = [];
    for (let id of archivedPlans) {
      const result = await API.getMealPlan(id);
      stagingArray.push(result);
    }
    setArchivedArray(stagingArray);
    setLoading(false);
  };

  useEffect(() => {
    fetchMealPlans(mealPlansArray);
  }, [mealPlansArray]);

  useEffect(() => {
    // console.log(archievedMealPlansArray);
    fetchArchivedMealPlans(archievedMealPlansArray);
  }, [archievedMealPlansArray]);

  return { plansArray, loading, archivedArray };
};

export default useGetMealPlans;
