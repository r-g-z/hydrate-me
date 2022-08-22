import { Link } from "react-router-dom";
import { Text } from "@chakra-ui/react";

const Home = () => {
  return (
    <>
      <Link to="/login">Login</Link>
      <br></br>
      <Link to="/register">Sign Up</Link>

      <Text>Lacking in water?</Text>
      <Text>
        {" "}
        We all need water but how much do you need to drink. Are you reaching
        your daily drinking goals?{" "}
      </Text>
    </>
  );
};

export default Home;
