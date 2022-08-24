import { Link } from "react-router-dom";
import { Image, Box, Button, useColorMode, Switch } from "@chakra-ui/react";

const Header = () => {
  const { colorMode, toggleColorMode } = useColorMode();
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        width: "100%",
        justifyContent: "space-between",
        mb: "15px",
      }}
    >
      <Box sx={{ display: "flex" }}>
        <Image
          boxSize="40px"
          src="/img/carbon.png
      "
          alt="bottle"
        />
        <Box sx={{ ml: "10px", fontSize: "32px" }}>
          <Link to="/dashboard">Hydrate Me</Link>
        </Box>
      </Box>
      <Box
        sx={{
          display: "flex",
          gap: "3px",
          alignItems: "center",
          fontSize: "22px",
        }}
      >
        ☀️
        <Switch onChange={toggleColorMode} />
        🌑
      </Box>
    </Box>
  );
};

export default Header;
