import { createTheme } from "@mui/material/styles";

export const theme = createTheme({
  palette: {
    mode: "light",

    primary: {
      main: "#2563EB",
    },

    secondary: {
      main: "#103F51",
    },

    background: {
      default: "#ffffff",
      paper: "#103F51"
    },

    text: {
      primary: "#0F172A",
      secondary: "#ffffff",
    },

    success: {
      main: "#16A34A",
    },

    error: {
      main: "#DC2626",
    },
  },

  typography: {
    fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
    h1: {
      fontWeight: 800,
    },

    h4: {
      fontWeight: 700,
    },

    h5: {
      fontWeight: 600,
    },

    button: {
      textTransform: "none",
      fontWeight: 600,
    },
  },

  shape: {
    borderRadius: 10,
  },
});