import { Button } from "@chakra-ui/react";

const Logout = (props) => {
  const handleClick = async () => {
    const res = await fetch("/users/logout", {
      method: "POST",
    });
    props.handleLogout();
  };

  return (
    <Button className="logout_button" onClick={handleClick}>
      Logout
    </Button>
  );
};

export default Logout;
