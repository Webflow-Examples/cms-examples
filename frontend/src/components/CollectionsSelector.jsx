import React, { useState } from "react";

import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  CircularProgress,
} from "@mui/material";

const CollectionsSelector = ({ collections, loading, onSelectCollection }) => {
  const [selectedCollection, setSelectedCollection] = useState("");

  // Handler to update local state and call the onSelectCollection prop
  const handleSelectedCollection = (event) => {
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
          onChange={handleSelectedCollection}
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
