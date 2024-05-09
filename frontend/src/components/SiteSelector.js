import React, { useState, useEffect } from 'react';
import axiosInstance from '../utils/axiosInstance';

const SiteSelector = ({ onSelectSite }) => {
  const [sites, setSites] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSites = async () => {
      try {
        const response = await axiosInstance.get("sites");
        setSites(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching sites:', error);
      }
    };

    fetchSites();
  }, []);

  return (
    <div>
      <h1>Select a Site</h1>
      <select onChange={e => onSelectSite(e.target.value)} disabled={loading}>
        {loading ? <option>Loading sites...</option> : sites.map(site => (
          <option key={site.id} value={site.id}>{site.displayName}</option>
        ))}
      </select>
    </div>
  );
};

export default SiteSelector;
