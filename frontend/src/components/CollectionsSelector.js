import React, { useState, useEffect } from 'react';
import axiosInstance from '../utils/axiosInstance';

const CollectionsSelector = ({ siteId, onSelectCollection }) => {
  const [collections, setCollections] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCollections = async () => {
      try {
        const response = await axiosInstance.get(`collections/${siteId}`);
        setCollections(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching collections:', error);
      }
    };

    if (siteId) {
      fetchCollections();
    }
  }, [siteId]);

  return (
    <div>
      <h2>Collections</h2>
      <select disabled={!siteId || loading} onChange={e => onSelectCollection(e.target.value)}>
        {loading ? <option>Loading collections...</option> : collections.map(collection => (
          <option key={collection.id} value={collection.id}>{collection.displayName}</option>
        ))}
      </select>
    </div>
  );
};

export default CollectionsSelector;
