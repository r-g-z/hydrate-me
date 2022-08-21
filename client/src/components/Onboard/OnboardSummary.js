import Onboard from "./Onboard";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Stack, Button } from "@chakra-ui/react";

function OnboardSummary(props) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    fetch(`/users/profile`, {
      method: "GET",
    })
      .then((res) => {
        return res.json();
      })
      .then((userData) => {
        setUser(userData);
      });
  }, []);

  let navigate = useNavigate();

  const handleClick = () => {
    navigate("/dashboard");
    //   click on next to take you onto the water log page
    // This page is to show everday when you first start your day because everyday you are logging
  };

  if (!user) {
    return <div>Loading</div>;
  }

  return (
    <div>
      <h1>Hi {user.username} </h1>
      <h1>Daily Goal</h1>
      <h1>{user.daily_goal}ml</h1>

      <Stack direction="row" spacing={4} align="center">
        <Button
          colorScheme="teal"
          onClick={handleClick}
          variant="outline"
          type="submit"
        >
          Next
        </Button>
      </Stack>
    </div>
  );
}

export default OnboardSummary;
