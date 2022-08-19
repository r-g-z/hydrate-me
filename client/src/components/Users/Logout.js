import Button from "react-bootstrap/Button";

const Logout = (props) => {
  const handleClick = async () => {
    const res = await fetch("/users/logout", {
      method: "POST",
    });
    props.handleLogout();
  };

  return (
    <Button
      className="logout_button"
      variant="outline-success"
      onClick={handleClick}
    >
      Logout
    </Button>
  );
};

export default Logout;
