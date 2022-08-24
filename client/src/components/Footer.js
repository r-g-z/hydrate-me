import { Box, Button, Container, Text } from "@chakra-ui/react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-between",
        position: "fixed",
        bottom: "0",
        bgColor: "#e4f3ff",
        width: "100%",
      }}
    >
      <Button variant="ghost">
        <Link to="/logs">Water Logs</Link>
      </Button>
      <Button variant="ghost">
        <Link to="/dashboard">Home</Link>
      </Button>
      <Button variant="ghost">
        <Link to="/profile">Profile</Link>
      </Button>
    </Box>
  );
};

export default Footer;
