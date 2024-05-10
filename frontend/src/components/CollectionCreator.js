import React, { useState } from "react";
import axiosInstance from "../utils/axiosInstance";
import collectionPresets from "../utils/CollectionPresets";
import FieldTable from "./FIeldTable";

import {
  Container,
  Button,
  Box,
  Grid,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Typography,
} from "@mui/material";

const CollectionCreator = ({ siteId }) => {
  const [selectedPreset, setSelectedPreset] = useState(collectionPresets[0]);

  const sendCollectionPreset = async (selectedPreset) => {
    try {
      const response = await axiosInstance.post(
        `collections/${siteId}`,
        selectedPreset
      );
      console.log("Collection Created:", response.data);
    } catch (error) {
      console.error("Error creating collection:", error);
    }
  };

  return (
    <Container maxWidth="lg">
      <Grid container spacing={0}>
        <Grid item xs={4}>
          {/* Scrollable Box for the List of Presets */}
          <Box
            sx={{
              width: "100%",
              maxWidth: "200px",
              maxHeight: "300px",
              overflowY: "auto",
              p: 2,
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
              maxHeight: "300px",
              overflowY: "auto",
              p: 2,
            }}
          >
            {/* Detail Section */}
            <Typography variant="h5" padding={2}>
              {selectedPreset.title}
            </Typography>
            <Button onClick={() => sendCollectionPreset(selectedPreset)}>
              Create Collection
            </Button>
            <FieldTable selectedPreset={selectedPreset} />
          </Box>
        </Grid>
      </Grid>
    </Container>
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
