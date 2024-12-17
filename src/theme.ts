import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: "10px",
          textTransform: "none",
          fontWeight: 700,
          fontSize: "1rem",
          padding: "16px 28px",
        },
        contained: {
          backgroundColor: "#2BD17E",
          color: "#FFFFFF",
          "&:hover": {
            opacity: 0.6,
          },
        },
        outlined: {
          borderColor: "#FFFFFF",
          color: "#FFFFFF",
          "&:hover": {
            borderColor: "#2BD17E",
          },
        },
      },
    },
  },
});

export default theme;
