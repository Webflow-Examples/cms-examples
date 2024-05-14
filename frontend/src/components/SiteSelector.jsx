import React, { useState, useEffect } from "react";
import axiosInstance from "../utils/axiosInstance";

import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  CircularProgress,
} from "@mui/material";

const SiteSelector = ({ onSelectSite }) => {
  const [sites, setSites] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedSite, setSelectedSite] = useState("");

  useEffect(() => {
    // Get list of sites from backend
    const fetchSites = async () => {
      try {
        const response = await axiosInstance.get("sites");
        setSites(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching sites:", error);
      }
    };

    fetchSites();
  }, []);

  // Handler to update local state and call the onSelectSite prop
  const handleSelectSite = (event) => {
    const siteId = event.target.value;
    setSelectedSite(siteId);
    onSelectSite(siteId);
  };

  return (
    <div
      style={{
        minWidth: "400px",
        width: "auto",
        marginRight: "auto",
      }}
    >
      <FormControl
        // fullWidth
        variant="outlined"
        sx={{
          my: "10px",
          minWidth: "inherit",
        }}
      >
        <InputLabel id="select-site-label">Select Site</InputLabel>
        <Select
          labelId="select-site-label"
          id="site-select"
          value={selectedSite}
          onChange={handleSelectSite}
          disabled={loading}
        >
          {loading ? (
            <MenuItem>
              <CircularProgress size={24} />
            </MenuItem>
          ) : (
            sites.map((site) => (
              <MenuItem key={site.id} value={site.id}>
                {site.displayName}
              </MenuItem>
            ))
          )}
        </Select>
      </FormControl>
    </div>
  );
};

export default SiteSelector;
