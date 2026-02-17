import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { ThemeProvider, createTheme, CssBaseline } from "@mui/material";

const theme = createTheme({
  palette: {
    primary: {
      main: "#2563eb",
    },
    success: {
      main: "#16a34a",
    },
    error: {
      main: "#dc2626",
    },
  },
  shape: {
    borderRadius: 10,
  },
});

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <App />
    </ThemeProvider>
  </React.StrictMode>,
);
