import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: {
      main: "#ffffff",
    },
    secondary: {
      main: "#000000",
    },
  },
  typography: {
    fontFamily: '"Arial", "Helvetica", sans-serif',
  },
});

export default theme;
