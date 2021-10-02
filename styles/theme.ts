import { extendTheme, ThemeConfig } from "@chakra-ui/react";
import { createBreakpoints } from "@chakra-ui/theme-tools";
const breakpoints = createBreakpoints({
  sm: "40em",
  md: "52em",
  lg: "64em",
  xl: "80em",
});

const config: ThemeConfig = {
  initialColorMode: "dark",
  useSystemColorMode: false,
  // breakpoints,
};

const theme = extendTheme({
  config,
  breakpoints,
  colors: {},
  styles: {
    global: (props) => ({
      body: {
        height: "100%",
        fontFamily: "body",
        // color: mode("gray.800", "whiteAlpha.900")(props),
        // bg: mode("white", "gray.800")(props),
        lineHeight: "base",
      },
    }),
  },
});

export default theme;
