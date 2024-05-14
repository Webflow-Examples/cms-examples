import React, { useState } from "react";
import axiosInstance from "../utils/axiosInstance";
import collectionPresets from "../utils/CollectionPresets";
import FieldTable from "./FIeldTable";

import {
  Alert,
  Button,
  Box,
  Grid,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Paper,
  Snackbar,
  Typography,
} from "@mui/material";

const CollectionCreator = ({ siteId, onCreateCollection }) => {
  const [selectedPreset, setSelectedPreset] = useState(collectionPresets[0]);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");

  const sendCollectionPreset = async (selectedPreset) => {
    try {
      await axiosInstance.post(`collections/${siteId}`, selectedPreset);
      if (onCreateCollection) {
        onCreateCollection();
      }

      setSnackbarMessage("Collection created successfully");
      setSnackbarSeverity("success");
    } catch (error) {
      console.error("Error creating collection:", error);
      setSnackbarMessage("Failed to create collection");
      setSnackbarSeverity("error");
    } finally {
      setSnackbarOpen(true); // Open Snackbar in both cases
    }
  };

  return (
    <Paper
      sx={{
        padding: 2,
        maxHeight: "500px",
      }}
    >
      <Typography variant="h6">Create a Collection</Typography>
      <Grid
        container
        spacing={0}
        sx={{
          width: "100%",
          maxHeight: "90%",
          p: 2,
        }}
      >
        <Grid item xs={4}>
          {/* Scrollable Box for the List of Presets */}

          <Box
            sx={{
              maxHeight: "350px",
              overflowY: "auto",
            }}
          >
            <List>
              {collectionPresets.map((preset) => (
                <ListItem key={preset.title} disablePadding>
                  <ListItemButton onClick={() => setSelectedPreset(preset)}>
                    <ListItemText primary={preset.title} />
                  </ListItemButton>
                </ListItem>
              ))}
            </List>
          </Box>
        </Grid>
        <Grid item xs={7}>
          <Box
            sx={{
              width: "100%",
              maxHeight: "350px",
              overflowY: "auto",
              p: 2,
            }}
          >
            {/* Detail Section */}
            <Typography variant="h5" padding={2}>
              {selectedPreset.title}
            </Typography>
            <Button
              onClick={() => sendCollectionPreset(selectedPreset)}
              variant="contained"
            >
              Create Collection
            </Button>
            <FieldTable selectedPreset={selectedPreset} />
          </Box>
        </Grid>
      </Grid>
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
    </Paper>
  );

  // return (
  //   <div>
  //     <h1>Select a Collection Preset</h1>

  //     <ul>
  //       {collectionPresets.map((preset, index) => (
  //         <li key={index} onClick={() => setSelectedPreset(preset)}>
  //           {preset.title}
  //         </li>
  //       ))}
  //     </ul>

  //     {selectedPreset && (
  //       <>
  //         <h2>Fields in {selectedPreset.collection.name}</h2>
  //         <ul>
  //           {selectedPreset.collection.fields.map((field, index) => (
  //             <li key={index}>
  //               {field.displayName} ({field.type})
  //             </li>
  //           ))}
  //         </ul>
  //         <button onClick={() => sendCollectionPreset(selectedPreset)}>Create Collection</button>
  //       </>
  //     )}
  //   </div>
  // );
};

export default CollectionCreator;
