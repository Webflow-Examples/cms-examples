import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: {
      main: "#146EF5", // Your primary color
    },
    secondary: {
      main: "#19857b", // Your secondary color
    },
    error: {
      main: "#ff4444", // Error color
    },
    warning: {
      main: "#EE1D36",
      contrastText: "white",
    },
    background: {
      default: "#f4f5f7", // Background color for the application
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          // Default padding for all FormControl components
          margin: "20px 0px",
        },
        containedWarning: {
          backgroundColor: "#EE1D36",
          color: "white",
          border: "none",
          "&hover": {
            backgroundColor: "#A00013",
          },
        },
      },
    },
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
    MuiTableCell: {
      styleOverrides: {
        root: {
          // Applying smaller font size globally to all table cells
          maxWidth: "100px",
          fontSize: "0.75rem",
          whiteSpace: "nowrap",
          overflow: "hidden",
          textOverflow: "ellipsis",
        },
      },
    },
  },
});

export default theme;
