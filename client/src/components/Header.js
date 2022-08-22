import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Button from "react-bootstrap/Button";
import Logout from "./Users/Logout";
import { Link } from "react-router-dom";

const Header = (props) => {
  return (
    <Navbar bg="light" expand="lg">
      <Container>
        <Link to="/">Hydrate Me</Link>
        <Logout handleLogout={props.handleLogout} />
      </Container>
    </Navbar>
  );
};

export default Header;
