import Logout from "./Users/Logout";
import { Link } from "react-router-dom";
import { Image, Box } from "@chakra-ui/react";

const Header = ({ authorised, handleLogout }) => {
  return (
    <Box sx={{ display: "flex", alignItems: "center" }}>
      <Image
        boxSize="40px"
        src="/img/carbon.png
      "
        alt="bottle"
      />
      <Box sx={{ ml: "10px", fontSize: "28px" }}>
        <Link to="/dashboard">Hydrate Me</Link>
      </Box>
      {authorised && <Logout handleLogout={handleLogout} />}
    </Box>
  );
};

export default Header;
