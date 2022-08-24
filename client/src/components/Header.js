import Logout from "./Users/Logout";
import { Link } from "react-router-dom";
import { Image, Box } from "@chakra-ui/react";

const Header = ({ authorised, handleLogout }) => {
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        width: "100%",
        justifyContent: "space-between",
        mb: "15px",
      }}
    >
      <Box sx={{ display: "flex" }}>
        <Image
          boxSize="40px"
          src="/img/carbon.png
      "
          alt="bottle"
        />
        <Box sx={{ ml: "10px", fontSize: "28px" }}>
          <Link to="/dashboard">Hydrate Me</Link>
        </Box>
      </Box>
      {/* <Box sx={{ display: "flex", flexDirection: "flex-end" }}> */}
      {authorised && <Logout handleLogout={handleLogout} />}
      {/* </Box> */}
    </Box>
  );
};

export default Header;
