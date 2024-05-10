import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  components: {
    MuiFormControl: {
      styleOverrides: {
        root: {
          // Default padding for all FormControl components
          padding: "20px",
        },
      },
    },
    MuiInputLabel: {
      styleOverrides: {
        root: {
          // Additional styles for InputLabel
        },
      },
    },
    MuiSelect: {
      styleOverrides: {
        select: {
          // Additional styles for Select component
        },
      },
    },
  },
});

export default theme;
