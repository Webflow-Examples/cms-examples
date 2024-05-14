import React from "react";
import { Box, Typography, Link } from "@mui/material";

const Footer = () => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "20px",
        backgroundColor: "#f7f7f7",
        borderTop: "1px solid #e0e0e0",
      }}
    >
      <img
        src="/Blue Black Full Logo.svg"
        alt="Webflow Logo"
        style={{ width: "150px", marginBottom: "10px" }}
      />
      <Typography variant="body2" color="textSecondary">
        Testing Webflow's CMS APIs
      </Typography>
      <Box mt={2}>
        <Link
          href="https://developers.webflow.com/"
          target="_blank"
          rel="noopener"
          sx={{ marginRight: "20px" }}
        >
          Developer Documentation
        </Link>
        <Link href="https://webflow.com/apps" target="_blank" rel="noopener">
          App Store
        </Link>
      </Box>
    </Box>
  );
};

export default Footer;
