import React, { useState } from "react";
import { ThemeProvider } from "@mui/material/styles";
import theme from "./utils/customTheme";

import { Container, Grid } from "@mui/material";

import SiteSelector from "./components/SiteSelector";
import CollectionCreator from "./components/CollectionCreator";
import CollectionsSelector from "./components/CollectionsSelector";
import ItemForm from "./components/ItemForm";
import ItemsList from "./components/ItemsList";

const App = () => {
  const [selectedSiteId, setSelectedSiteId] = useState(null);
  const [selectedCollection, setSelectedCollection] = useState(null);
  const [collectionDetails, setCollectionDetails] = useState(null);

  const handleSelectSite = (siteId) => {
    setSelectedSiteId(siteId);
    setSelectedCollection(null);
    setCollectionDetails(null);
  };

  const handleSelectCollection = (collection) => {
    setSelectedCollection(collection);
    setCollectionDetails(null);
  };

  const handleCollectionDetails = (data) => {
    setCollectionDetails(data);
  };

  return (
    <ThemeProvider theme={theme}>
      <div>
        <Container
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            width: "90dvw",
            overflow: "auto",
          }}
        >
          <SiteSelector onSelectSite={handleSelectSite} />
          {selectedSiteId && (
            <div name="collections" style={{ width: "100%" }}>
              <CollectionsSelector
                siteId={selectedSiteId}
                onSelectCollection={handleSelectCollection}
              />
              {selectedCollection && (
                <div name="items">
                  <Grid container spacing={2}>
                    <Grid item xs={8}>
                      {" "}
                      <ItemsList
                        collection={selectedCollection}
                        onSchemaLoad={handleCollectionDetails}
                      />
                    </Grid>
                    <Grid item xs={4}>
                      {" "}
                      {collectionDetails && (
                        <ItemForm
                          collectionDetails={collectionDetails}
                          onItemCreated={fetchItems}
                        />
                      )}
                    </Grid>
                  </Grid>

                  <CollectionCreator siteId={selectedSiteId} />
                </div>
              )}
            </div>
          )}
        </Container>
      </div>
    </ThemeProvider>
  );
};

export default App;
