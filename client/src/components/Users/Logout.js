import { Button } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

const Logout = () => {
  const navigate = useNavigate();
  const handleClick = async () => {
    const res = await fetch("/users/logout", {
      method: "POST",
    });
    navigate("/");
  };

  return (
    <Button sx={{ mt: "5px" }} className="logout_button" onClick={handleClick}>
      Logout
    </Button>
  );
};

export default Logout;
