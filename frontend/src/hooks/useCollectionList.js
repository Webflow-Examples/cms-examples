import { useState, useEffect } from "react";
import axios from "../utils/axiosInstance";

const useCollectionList = (selectedSiteId, fetchTrigger) => {
  const [collections, setCollections] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (selectedSiteId) {
      setLoading(true);
      axios
        .get(`/collections/${selectedSiteId}`)
        .then((response) => {
          setCollections(response.data);
        })
        .catch((error) => {
          setError(error);
        })
        .finally(() => {
          setLoading(false);
        });
    }
  }, [selectedSiteId, fetchTrigger]); // Ensure fetch is triggered on these dependencies

  return { collections, loading, error };
};

export default useCollectionList;
