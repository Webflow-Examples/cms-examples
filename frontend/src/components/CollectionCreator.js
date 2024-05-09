import React, { useState } from "react";
import axiosInstance from "../utils/axiosInstance";
import collectionPresets from "../utils/CollectionPresets";

const CollectionCreator = ({ siteId }) => {
  const [selectedPreset, setSelectedPreset] = useState(null);

  const sendCollectionPreset = async (selectedPreset) => {
    console.log(selectedPreset)
    try {
      const response = await axiosInstance.post(`collections/${siteId}`, selectedPreset);
      console.log('Collection Created:', response.data);
    } catch (error) {
      console.error('Error creating collection:', error);
    }
  };

  return (
    <div>
      <h1>Select a Collection Preset</h1>
      <ul>
        {collectionPresets.map((preset, index) => (
          <li key={index} onClick={() => setSelectedPreset(preset)}>
            {preset.title}
          </li>
        ))}
      </ul>

      {selectedPreset && (
        <>
          <h2>Fields in {selectedPreset.collection.name}</h2>
          <ul>
            {selectedPreset.collection.fields.map((field, index) => (
              <li key={index}>
                {field.displayName} ({field.type})
              </li>
            ))}
          </ul>
          <button onClick={() => sendCollectionPreset(selectedPreset)}>Create Collection</button>
        </>
      )}
    </div>
  );
};

export default CollectionCreator;
