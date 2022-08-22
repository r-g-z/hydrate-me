import Onboard from "./Onboard";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Stack, Button, Heading, Text } from "@chakra-ui/react";

const OnboardSummary = (props) => {
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
      <Text>Hi {user.username} </Text>
      <Heading as="h1">Daily Goal</Heading>
      <Text fontSize="2xl">{user.daily_goal}ml</Text>

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
};

export default OnboardSummary;
