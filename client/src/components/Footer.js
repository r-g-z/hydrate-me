import { Text } from "@chakra-ui/react";
import { Link } from "react-router-dom";

//  i wanted it so you can change it yourself and updates
function Footer() {
  return (
    <div>
      <Link to="/logs">Water Logs</Link>
      <Link to="/user">Profile</Link>
    </div>
  );
}

export default Footer;
