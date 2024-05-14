import React, { useEffect, useState } from "react";
import axiosInstance from "../utils/axiosInstance";
import {
  Alert,
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  FormGroup,
  TextField,
  Typography,
  Snackbar,
} from "@mui/material";

const ItemForm = ({ fields, selectedCollection, onItemCreated }) => {
  const [formData, setFormData] = useState({
    isArchived: false,
    isDraft: false,
    fieldData: {},
  });
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");

  useEffect(() => {
    initializeFormData(fields);
  }, [fields]);

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
        `/collections/${selectedCollection}/items`,
        formData
      );
      initializeFormData(fields); // Reset form data
      setSnackbarMessage("Item created successfully");
      setSnackbarSeverity("success");
      if (onItemCreated) {
        onItemCreated(); // Optionally refresh items list or perform other actions
      }
    } catch (error) {
      console.error("Error creating collection item:", error);
      setSnackbarMessage("Failed to create item");
      setSnackbarSeverity("error");
    } finally {
      setSnackbarOpen(true); // Open Snackbar in both cases
    }
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      noValidate
      sx={{
        mt: 1,
        maxHeight: "500px",
        overflowY: "auto",
        maxWidth: "90%",
      }}
    >
      <Typography variant="h6">Create Item</Typography>
      <FormGroup sx={{ maxWidth: "inherit" }}>
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
          type={field.type}
          required={field.isRequired}
          fullWidth
          sx={{ maxWidth: "inherit" }}
          variant="outlined"
          margin="normal"
          value={formData.fieldData[field.slug] || ""}
          onChange={(e) => handleChange(e, field.slug)}
        />
      ))}
      <Button
        type="submit"
        fullWidth
        variant="contained"
        sx={{ mt: 3, mb: 2, maxWdith: "inherit" }}
      >
        Submit
      </Button>
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={() => setSnackbarOpen(false)}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert
          onClose={() => setSnackbarOpen(false)}
          severity={snackbarSeverity}
          sx={{ width: "100%" }}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default ItemForm;
