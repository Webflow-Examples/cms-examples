import React, { useEffect, useState } from "react";
import axiosInstance from "../utils/axiosInstance";
import {
  Button,
  Checkbox,
  FormControlLabel,
  FormGroup,
  TextField,
  Typography,
  Box,
} from "@mui/material";

const CollectionItemForm = ({ collectionDetails, onItemCreated }) => {
  const [fields, setFields] = useState([]);
  const [formData, setFormData] = useState({
    isArchived: false,
    isDraft: false,
    fieldData: {},
  });

  useEffect(() => {
    setFields(collectionDetails.fields);
    initializeFormData(collectionDetails.fields);
  }, [collectionDetails]);

  const initializeFormData = (fields) => {
    const fieldData = {};
    fields.forEach((field) => {
      fieldData[field.slug] = "";
    });
    setFormData((prevData) => ({
      ...prevData,
      fieldData,
    }));
  };

  const handleChange = (event, slug) => {
    const { name, value, type, checked } = event.target;
    if (type === "checkbox") {
      setFormData((prevData) => ({
        ...prevData,
        [name]: checked,
      }));
    } else {
      setFormData((prevData) => ({
        ...prevData,
        fieldData: {
          ...prevData.fieldData,
          [slug]: value,
        },
      }));
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await axiosInstance.post(
        `/collections/${collectionDetails.id}/items`,
        formData
      );
      console.log("Collection item created successfully");
    } catch (error) {
      console.error("Error creating collection item:", error);
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
      <Typography variant="h6">Create Item</Typography>
      <FormGroup>
        <FormControlLabel
          control={
            <Checkbox
              checked={formData.isArchived}
              onChange={handleChange}
              name="isArchived"
            />
          }
          label="Is Archived?"
        />
        <FormControlLabel
          control={
            <Checkbox
              checked={formData.isDraft}
              onChange={handleChange}
              name="isDraft"
            />
          }
          label="Is Draft?"
        />
      </FormGroup>
      {fields.map((field) => (
        <TextField
          key={field.slug}
          label={field.displayName}
          type="text" // Adjust input type based on field.type if necessary
          fullWidth
          variant="outlined"
          margin="normal"
          value={formData.fieldData[field.slug] || ""}
          onChange={(e) => handleChange(e, field.slug)}
        />
      ))}
      <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
        Submit
      </Button>
    </Box>
  );
};

export default CollectionItemForm;
