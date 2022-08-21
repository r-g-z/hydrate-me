import { useEffect, useState } from "react";
import { Heading, Flex, Text } from "@chakra-ui/react";

function Dashboard(props) {
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

  if (!user) {
    return <div>Loading</div>;
  }

  return (
    <div>
      <Heading>Feeling Parched?</Heading>
      <Flex>
        <Heading>Daily Goal</Heading>
        <Text>{user.daily_goal}ml</Text>
      </Flex>
    </div>
  );
}

export default Dashboard;
