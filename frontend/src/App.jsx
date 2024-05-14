import React, { useState } from "react";
import { ThemeProvider } from "@mui/material/styles";
import theme from "./utils/customTheme";
import { Box, Grid, Container, Divider } from "@mui/material";

// Hooks
import useCollectionList from "./hooks/useCollectionList";

// Components
import Header from "./components/Header";
import SiteSelector from "./components/SiteSelector";
import CollectionCreator from "./components/CollectionCreator";
import CollectionsSelector from "./components/CollectionsSelector";
import CollectionDelete from "./components/CollectionDelete";
import ItemsBlock from "./components/ItemsBlock";
import Footer from "./components/Footer";

const App = () => {
  const [selectedSiteId, setSelectedSiteId] = useState(null);
  const [selectedCollection, setSelectedCollection] = useState(null);
  const [fetchTrigger, setFetchTrigger] = useState(false);

  const { collections, loading, error } = useCollectionList(
    selectedSiteId,
    fetchTrigger
  );

  const handleSelectSite = (siteId) => {
    setSelectedSiteId(siteId);
    setSelectedCollection(null);
    setFetchTrigger((prev) => !prev); // Trigger collection fetch when site changes
  };

  const handleSelectCollection = (collection) => {
    setSelectedCollection(collection);
  };

  const handleCollectionCreation = () => {
    console.log("Triggering fetch after creation");
    setFetchTrigger((prev) => !prev); // Trigger collection fetch when new collection is added
  };

  const handleCollectionDeletion = () => {
    setSelectedCollection(null);
    setFetchTrigger((prev) => !prev); // Trigger collection fetch when a collection is deleted
  };

  return (
    <ThemeProvider theme={theme}>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          minHeight: "100vh",
          minWidth: "100w",
          width: "100vw",
        }}
      >
        <Header />
        <Container
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            flexGrow: 1,
            minWdith: "inherit",
            maxWidth: "inherit",
            overflow: "auto",
          }}
        >
          <SiteSelector onSelectSite={handleSelectSite} />

          {selectedSiteId && (
            <div
              style={{
                display: "flex",
                maxWidth: "inherit",
                minWidth: "100%",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <Grid container spacing={4} alignItems="center">
                <Grid item xs={10}>
                  <CollectionsSelector
                    collections={collections}
                    loading={loading}
                    error={error}
                    onSelectCollection={handleSelectCollection}
                    key={`${selectedSiteId}-${fetchTrigger}`}
                  />
                </Grid>
                <Grid
                  item
                  xs={2}
                  sx={{
                    alignContent: "baseline",
                  }}
                >
                  <CollectionDelete
                    selectedCollection={selectedCollection}
                    onDeleteCollection={handleCollectionDeletion}
                  />
                </Grid>
              </Grid>
              <Divider variant="middle" sx={{ opacity: 0, my: 1 }} />{" "}
              {selectedCollection && (
                <ItemsBlock selectedCollection={selectedCollection} />
              )}
            </div>
          )}

          {selectedSiteId && (
            <div style={{ padding: 5 }}>
              <Divider variant="middle" sx={{ opacity: 0, my: 6 }} />{" "}
              <CollectionCreator
                siteId={selectedSiteId}
                onCreateCollection={handleCollectionCreation}
              />
            </div>
          )}
        </Container>
        <Divider variant="middle" sx={{ opacity: 0, my: 6 }} /> <Footer />
      </Box>
    </ThemeProvider>
  );
};

export default App;
