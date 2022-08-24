import { Link } from "react-router-dom";
import { Button, Text } from "@chakra-ui/react";
import { Image, Box } from "@chakra-ui/react";

const Home = () => {
  return (
    <>
      <Box sx={{ position: "relative" }}>
        <Box boxSize="sm" sx={{ display: "flex", justifyContent: "center" }}>
          <Image
            src="/img/drop.png"
            alt="water-drop"
            objectFit={"contain"}
            sx={{ maxHeight: "100%" }}
          />
        </Box>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            flexDirection: "column",
            position: "absolute",
            top: "50%",
            left: "50%",
            translate: "-50% -50%",
          }}
        >
          <Button sx={{ bgColor: "white", mb: "5px" }}>
            <Link to="/login">Login</Link>
          </Button>
          <Button sx={{ bgColor: "white" }}>
            <Link to="/register">Register</Link>
          </Button>
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
