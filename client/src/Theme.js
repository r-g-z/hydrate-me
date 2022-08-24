import { extendTheme } from "@chakra-ui/react";

const config = {
  initialColorMode: "light",
  useSystemColorMode: false,
};

const theme = extendTheme({
  config,
  components: { Button: { variants: { solid: { bg: "blue.200" } } } },
});

export default theme;
