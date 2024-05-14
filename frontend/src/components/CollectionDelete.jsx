import React from "react";
import axiosInstance from "../utils/axiosInstance";
import { Button } from "@mui/material";

const CollectionDelete = ({ selectedCollection, onDeleteCollection }) => {
  const deleteCollection = async (selectedCollection) => {
    try {
      const response = await axiosInstance.delete(
        `collections/${selectedCollection}`
      );
      onDeleteCollection();
      console.log("Collection Deleted:", response.data);
    } catch (error) {}
  };

  return (
    <Button
      variant="contained"
      color="warning"
      onClick={() => deleteCollection(selectedCollection)}
    >
      Delete
    </Button>
  );
};

export default CollectionDelete;
