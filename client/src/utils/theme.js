import { createTheme } from "@mui/material/styles";
import { itIT } from "@mui/material/locale";

const theme = createTheme(
  {
    shape: {
      borderRadius: 10,
    },
    palette: {
      jute: {
        main: "#D2B48C",
        contrastText: "#3e3e3e",
        dark: "#a89c6e",
      },
      terracotta: {
        main: "#D2691E",
        contrastText: "#ffffff",
        dark: "#a0521c",
      },
      sage: {
        main: "#7b9c88ff",
        contrastText: "#ffffff",
        dark: "#6a8a78",
      },
      pistachio: {
        main: "#E4E8D6",
        contrastText: "#3e3e3e",
        dark: "#bfc8a3",
      },
      intensePistachio: {
        main: "#B7C9A8",
        contrastText: "#3e3e3e",
        dark: "#8FA37C",
      },
      straw: {
        main: "#F8E5B0",
        contrastText: "#3e3e3e",
        dark: "#d4c28d",
      },
      dustyBlue: {
        main: "#D6EAF8",
        contrastText: "#3e3e3e",
        dark: "#a9c7e0",
      },
      blush: {
        main: "#F2D7D5",
        contrastText: "#3e3e3e",
        dark: "#d4b4b2",
      },
      pearl: {
        main: "#EAEAEA",
        contrastText: "#3e3e3e",
        dark: "#cfcfcf",
      },
      lightBeige: {
        main: "#F5F5DC",
        contrastText: "#3e3e3e",
        dark: "#cfcfb0",
      },

      primary: {
        main: "#4CAF50",
        contrastText: "#ffffff",
      },
      secondary: {
        main: "#8BC34A",
        contrastText: "#ffffff",
      },
      error: {
        main: "#D2691E",
        contrastText: "#ffffff",
      },
      info: {
        main: "#c2b2808c",
        contrastText: "#3e3e3e",
      },
      warning: {
        main: "#a89c6e",
        contrastText: "#ffffff",
      },

      background: {
        default: "#F5F5F5",
      },
      text: {
        primary: "#6B4F3B",
        secondary: "#8B6F4E",
      },
      divider: "#d0d0d0ff",
    },
    typography: {
      fontFamily: "Quicksand, sans-serif",
      // h4: {
      //   fontFamily: "Amatic SC",
      //   fontWeight: 700,
      // },
    },

    components: {
      MuiButton: {
        styleOverrides: {
          root: {
            // borderRadius: "10px",
            fontWeight: 700,
          },
        },
      },
      MuiTableCell: {
        styleOverrides: {
          root: {
            fontSize: "1rem",
          },
        },
      },
    },
  },
  itIT
);

export default theme;
