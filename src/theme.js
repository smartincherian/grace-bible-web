import { createTheme, alpha, getContrastRatio } from "@mui/material";
const violetBase = "#7F00FF";
const violetMain = alpha(violetBase, 0.7);

export const theme = createTheme({
  palette: {
    primary: {
      light: "#003285",
      main: "#002767",
      dark: "##001949",
      darker: "#00041c",
    },
    // Other custom colors
    violet: {
      main: violetMain,
      light: alpha(violetBase, 0.5),
      dark: alpha(violetBase, 0.9),
      contrastText:
        getContrastRatio(violetMain, "#fff") > 4.5 ? "#fff" : "#111",
    },
  },
  typography: {
    fontFamily: "Segoe UI, Tahoma, Geneva, Verdana, sans-serif",
  },
});
