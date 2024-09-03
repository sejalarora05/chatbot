import {
  PaletteColorOptions,
  alpha,
  createTheme,
  responsiveFontSizes,
} from "@mui/material/styles";

import { BACKGROUND, BORDER, ERROR, NETSMARTZ_THEME_COLOR, SUCCESS, TEXT } from "./colors";

declare module "@mui/material/styles" {
  interface PaletteOptions {
    themeColor?: PaletteColorOptions | string;
    border?: PaletteColorOptions | Partial<any>;
    // Add more custom color properties if needed
  }
}

const myTheme = responsiveFontSizes(
  createTheme({
    typography: {
      fontFamily: "DM Sans, sans-serif",
    },
    //   typography: {
    //     body2: {
    //       fontSize: 12,
    //       fontWeight: 400,
    //       color: TEXT.secondary,
    //     },
    //     subtitle1: {
    //       fontSize: 14,
    //     },
    //     fontFamily: `Open Sans`,
    //     fontStyle: "normal",
    //     fontWeight: 400,
    //     color: TEXT.primary,
    //   },
    //   components: {
    //     MuiButton: {
    //       styleOverrides: {
    //         root: {
    //           textTransform: "Capitalize",
    //         },
    //       },
    //     },
    //   },
    palette: {
      primary: {
        main: alpha("#000", 1),
        light: alpha("#000", 0.5),
        dark: alpha("#000", 0.9),
      },
      secondary: {
        main: NETSMARTZ_THEME_COLOR,
        light: alpha(NETSMARTZ_THEME_COLOR, 0.5),
        dark: alpha(NETSMARTZ_THEME_COLOR, 0.9),
      },

      background: BACKGROUND,
      success: SUCCESS,
      error: ERROR,
      text: TEXT,
      border: BORDER,
    },
  })
);

export default myTheme;
