import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import Logout from "./Users/Logout";
import { Link } from "react-router-dom";
import { Image } from "@chakra-ui/react";

const Header = (props) => {
  return (
    <Navbar bg="light" expand="lg">
      <Container>
        <Image
          borderRadius="full"
          boxSize="35px"
          src="/img/drop.png"
          alt="bottle"
        />
        <Link to="/">Hydrate Me</Link>
        <Logout handleLogout={props.handleLogout} />
      </Container>
    </Navbar>
  );
};

export default Header;
