import { extendTheme } from "@chakra-ui/react";

const config = {
  initialColorMode: "dark",
  useSystemColorMode: false,
};

const theme = extendTheme({
  config,
  components: {
    Button: { variants: { solid: { bg: "blue.200" } } },
    Link: { baseStyle: { color: "blue.300" } },
  },
  fonts: { heading: `"Gaegu", cursive`, body: `"Gaegu", cursive` },
});

export default theme;
