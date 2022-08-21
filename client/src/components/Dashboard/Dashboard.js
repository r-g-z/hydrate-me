import { useEffect, useState } from "react";
import {
  Heading,
  Flex,
  Text,
  useDisclosure,
  CircularProgress,
  CircularProgressLabel,
} from "@chakra-ui/react";

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

  console.log(userData);

  return (
    <div>
      <Heading>Feeling Parched?</Heading>
      <CircularProgress value={40} size="100px" color="blue.200">
        <CircularProgressLabel>40%</CircularProgressLabel>
      </CircularProgress>
      <Flex direction="column">
        <Heading>Daily Goal</Heading>
        <Text>{user.daily_goal}ml</Text>
      </Flex>
      <AddDrinks />
    </div>
  );
}

export default Dashboard;
