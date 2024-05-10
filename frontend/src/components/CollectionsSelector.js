import React, { useState, useEffect } from "react";
import axiosInstance from "../utils/axiosInstance";

import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  CircularProgress,
} from "@mui/material";

const CollectionsSelector = ({ siteId, onSelectCollection }) => {
  const [collections, setCollections] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCollection, setSelectedCollection] = useState("");

  useEffect(() => {
    setSelectedCollection("");
    setCollections([]);
    const fetchCollections = async () => {
      try {
        const response = await axiosInstance.get(`collections/${siteId}`);
        setCollections(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching collections:", error);
      }
    };

    if (siteId) {
      fetchCollections();
    }
  }, [siteId]);

  // Handler to updat local stat and call the onSelectCollection prop
  const handleSelectedCollecion = (event) => {
    const collectionId = event.target.value;
    setSelectedCollection(collectionId);
    onSelectCollection(collectionId);
  };

  return (
    <div>
      <FormControl fullWidth variant="outlined">
        <InputLabel id="select-collection-label">Select Collection</InputLabel>
        <Select
          labelId="select-collection-label"
          id="collection-select"
          value={selectedCollection}
          onChange={handleSelectedCollecion}
          disabled={loading}
        >
          {loading ? (
            <MenuItem>
              <CircularProgress size={24} />
            </MenuItem>
          ) : (
            collections.map((collection) => (
              <MenuItem key={collection.id} value={collection.id}>
                {collection.displayName}
              </MenuItem>
            ))
          )}
        </Select>
      </FormControl>
    </div>
  );
};

export default CollectionsSelector;
