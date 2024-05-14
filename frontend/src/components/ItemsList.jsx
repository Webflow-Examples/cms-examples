import React, { useState } from "react";
import axiosInstance from "../utils/axiosInstance";
import {
  Alert,
  Box,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Snackbar,
  Typography,
  CircularProgress,
} from "@mui/material";

const ItemsList = ({
  selectedCollection,
  items,
  loading,
  fields,
  onItemDeleted,
}) => {
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");

  // Function to delete a list item
  const deleteItem = async (itemId) => {
    try {
      await axiosInstance.delete(
        `/collections/${selectedCollection}/items/${itemId}`
      );
      if (onItemDeleted) {
        onItemDeleted(); // Refresh the items list after successful deletion
      }
      setSnackbarMessage("Item deleted successfully");
      setSnackbarSeverity("success");
    } catch (error) {
      console.error("Error deleteing collection item:", error);
      setSnackbarMessage("Failed to delete item");
      setSnackbarSeverity("error");
    } finally {
      setSnackbarOpen(true); // Open Snackbar in both cases
    }
  };

  return (
    <Box sx={{ maxHeight: "90%", overflowY: "auto", maxWidth: "100%" }}>
      {loading ? (
        <CircularProgress size={24} />
      ) : (
        <TableContainer component={Paper} sx={{ maxWidth: "inherit" }}>
          <Typography variant="h6" component="h2" sx={{ m: 2 }}>
            Items List
          </Typography>
          <Table stickyHeader aria-label="items table">
            <TableHead>
              <TableRow>
                {fields.map((field) => (
                  <TableCell key={field.displayName}>
                    {field.displayName}
                  </TableCell>
                ))}
                <TableCell>ID</TableCell>
                <TableCell>Delete Item</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {items.map((item, index) => (
                <TableRow hover key={index}>
                  {fields.map((field) => {
                    if (field.type === "Image" && item.fieldData[field.slug]) {
                      const { url, alt } = item.fieldData[field.slug];
                      return (
                        <TableCell hover key={field.displayName}>
                          <img
                            src={url}
                            alt={alt || "image"}
                            style={{ width: "100%", height: "auto" }}
                          />
                        </TableCell>
                      );
                    } else {
                      return (
                        <TableCell
                          hover
                          role="checkbox"
                          tabIndex={-1}
                          key={field.displayName}
                        >
                          {item.fieldData[field.slug]}
                        </TableCell>
                      );
                    }
                  })}
                  <TableCell>{item.id}</TableCell>
                  <TableCell>
                    <Button
                      onClick={() => deleteItem(item.id)}
                      variant="contained"
                      color="warning"
                    >
                      Delete Item
                    </Button>{" "}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
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

export default ItemsList;
