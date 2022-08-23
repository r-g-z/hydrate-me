import { Text } from "@chakra-ui/react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <div>
      <Link to="/logs">Water Logs</Link>
      <Link to="/dashboard">Home</Link>
      <Link to="/profile">Profile</Link>
    </div>
  );
};

export default Footer;
