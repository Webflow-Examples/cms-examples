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
        <IconButton
          edge="start"
          color="inherit"
          aria-label="menu"
          sx={{ mr: 2 }}
        >
          <MenuIcon />
        </IconButton>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Webflow CMS Examples
        </Typography>
        {/* You can add more Toolbar items here */}
      </Toolbar>
    </AppBar>
  );
}

export default Header;
