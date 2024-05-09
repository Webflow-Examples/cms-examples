import React, { useState } from 'react';
import SiteSelector from './components/SiteSelector'
import CollectionCreator from './components/CollectionCreator';
import CollectionsSelector from './components/CollectionsSelector';
import ItemForm from './components/ItemForm'

const App = () => {
  const [selectedSiteId, setSelectedSiteId] = useState(null);
  const [selectedCollectionId, setSelectedCollectionId] = useState(null)
 
  const handleSelectSite = (siteId) => {
    setSelectedSiteId(siteId);
  };

  const handleSelectCollection = (collectionId) => {
    setSelectedCollectionId(collectionId);
  }

  return (
    <div>
      <SiteSelector onSelectSite={handleSelectSite} />
      <CollectionCreator siteId={selectedSiteId} />
      <CollectionsSelector siteId={selectedSiteId} onSelectCollection={handleSelectCollection}/>
      <ItemForm collectionId={selectedCollectionId} />
    </div>
  );
};

export default App;
