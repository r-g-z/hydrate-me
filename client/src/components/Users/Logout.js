import { Button } from "@chakra-ui/react";

const Logout = (props) => {
  const handleClick = async () => {
    const res = await fetch("/users/logout", {
      method: "POST",
    });
    props.handleLogout();
  };

  return (
    <Button
      sx={{ bgColor: "	#e4f3ff", mt: "5px" }}
      className="logout_button"
      onClick={handleClick}
    >
      Logout
    </Button>
  );
};

export default Logout;
