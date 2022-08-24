import { Link } from "react-router-dom";
import { Text } from "@chakra-ui/react";
import { Image, Box } from "@chakra-ui/react";

const Home = () => {
  return (
    <>
      <Box>
        <Image src="/img/drop.png" alt="water-drop" boxSize="sm" />
        <Box sx={{ display: "flex", justifyContent: "center" }}>
          <Link to="/login">Login</Link>
        </Box>
        <br></br>
        <Box sx={{ display: "flex", justifyContent: "center" }}>
          <Link to="/register">Register</Link>
        </Box>
      </Box>
      <br></br>
      <Box sx={{ ml: "10px" }}>
        <Text as="i">Lacking in water?</Text>
        <Text>
          {" "}
          We all need water but how much do you need to drink. Are you reaching
          your daily drinking goals?{" "}
        </Text>
      </Box>
    </>
  );
};

export default Home;
