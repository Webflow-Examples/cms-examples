import * as React from "react";
import { StyledEngineProvider } from "@mui/material/styles";
import { ThemeProvider as SCThemeProvider } from "styled-components";

export default function StyledEngineProviderWrapper({ children }) {
  return (
    <StyledEngineProvider injectFirst>
      <SCThemeProvider theme={{}}>{children}</SCThemeProvider>
    </StyledEngineProvider>
  );
}
