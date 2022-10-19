import { useEffect, useState } from "react";
import { API } from "../API";

const useGetLists = (lists) => {
  const [listArray, setListArray] = useState([]);
  const [listLoading, setListLoading] = useState(true);
  const fetchLists = async (lists) => {
    const stagingArray = [];
    for (let id of lists) {
      const result = await API.getList(id);
      // console.log(result);
      stagingArray.push(result);
    }
    setListArray(stagingArray);
    setListLoading(false);
  };

  useEffect(() => {
    fetchLists(lists);
  }, [lists]);

  return { listArray, listLoading };
};

export default useGetLists;
