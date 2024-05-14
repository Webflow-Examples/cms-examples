import React from "react";
import { AppBar, Toolbar, Typography, IconButton } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";

function Header() {
  return (
    <AppBar
      position="static"
      sx={{
        marginBottom: "30px",
      }}
    >
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Webflow CMS Examples
        </Typography>
      </Toolbar>
    </AppBar>
  );
}

export default Header;
