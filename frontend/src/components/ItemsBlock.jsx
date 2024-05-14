import React, { useEffect, useState } from "react";
import axiosInstance from "../utils/axiosInstance";
import { Grid, Paper } from "@mui/material";

import useItemList from "../hooks/useItemList";

import ItemsList from "./ItemsList";
import ItemForm from "./ItemForm";

const ItemsBlock = ({ selectedCollection }) => {
  const [fields, setFields] = useState([]);
  const [fetchTrigger, setFetchTrigger] = useState(false);

  const { items, loading } = useItemList(selectedCollection, fetchTrigger);

  const fetchItems = () => {
    setFetchTrigger((prev) => !prev);
  };

  useEffect(() => {
    const fetchSchema = async () => {
      try {
        const response = await axiosInstance.get(
          `/collections/${selectedCollection}/details`
        );
        setFields(response.data.fields);
      } catch (error) {
        console.error("Error fetching schema:", error);
      }
    };

    fetchItems();
    fetchSchema();
  }, [selectedCollection]);

  return (
    <Paper
      sx={{
        padding: 4,
        margin: 4,
        maxHeight: "600px",
        maxWidth: "inherit",
      }}
    >
      <Grid
        container
        spacing={6}
        sx={{
          maxHeight: "inherit",
          maxWidth: "70vw",
          marginRight: "auto",
          overflow: "auto",
        }}
      >
        <Grid item xs={8} sx={{ maxHeight: "inherit", maxWidth: "inherit" }}>
          <ItemsList
            items={items}
            loading={loading}
            fields={fields}
            selectedCollection={selectedCollection}
            onItemDeleted={fetchItems}
          />
        </Grid>
        <Grid item xs={4} sx={{}}>
          {fields.length > 0 && (
            <ItemForm
              fields={fields}
              selectedCollection={selectedCollection}
              onItemCreated={fetchItems}
            />
          )}
        </Grid>
      </Grid>
    </Paper>
  );
};

export default ItemsBlock;
