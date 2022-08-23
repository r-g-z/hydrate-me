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
      <Link to="/dashboard">Hydrate Me</Link>
      {authorised && <Logout handleLogout={handleLogout} />}
    </Box>
  );
};

export default Header;
