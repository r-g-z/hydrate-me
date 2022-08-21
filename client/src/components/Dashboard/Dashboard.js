import { useEffect, useState } from "react";
import { Heading, Flex, Text, useDisclosure } from "@chakra-ui/react";

import AddDrinks from "../Form/AddDrinks";

function Dashboard(props) {
  const [user, setUser] = useState(null);
  const [waterEntries, setWaterEntries] = useState([]);

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
      <Flex direction="column">
        <Heading>Daily Goal</Heading>
        <Text>{user.daily_goal}ml</Text>
      </Flex>
      <Flex direction="column">
        <Heading>0/8</Heading>
        <Text>250ml cups</Text>
      </Flex>
      <AddDrinks />
    </div>
  );
}

export default Dashboard;
