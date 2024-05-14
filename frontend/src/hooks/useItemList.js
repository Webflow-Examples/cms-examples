import { useState, useEffect } from "react";
import axiosInstance from "../utils/axiosInstance";

const useItemList = (selectedCollection, fetchTrigger) => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (selectedCollection) {
      setLoading(true);
      axiosInstance
        .get(`/collections/${selectedCollection}/items`)
        .then((response) => {
          setItems(response.data);
        })
        .catch((error) => {
          setError(error);
        })
        .finally(() => {
          setLoading(false);
        });
    }
  }, [selectedCollection, fetchTrigger]); // Ensure fetch is triggered on these dependencies

  return { items, loading, error };
};

export default useItemList;
