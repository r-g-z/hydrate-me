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
  const [waterPercentage, setWaterPercentage] = useState(0);

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

  useEffect(() => {
    fetch(`/entries`, {
      method: "GET",
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        setWaterEntries(data);
      });
  }, []);

  useEffect(() => {
    if (user && waterEntries.length > 0) {
      const totalWater = waterEntries.reduce((sum, waterEntry) => {
        console.log(waterEntry);
        return waterEntry.waterAmount + sum;
      }, 0);
      console.log(totalWater, user.daily_goal);
      const waterP = Math.floor((totalWater / user.daily_goal) * 100);
      setWaterPercentage(waterP);
    }
  }, [user, waterEntries]);
  // now that the water entry is set,
  // shall i do the calcuation % or  make the entries show up
  // uhm water data 250ml, every water data entry  / by daily goal to get percentage
  //    it wasn't defined>

  if (!user) {
    return <div>Loading</div>;
  }

  console.log(waterPercentage);

  return (
    <div>
      <Heading>Feeling Parched?</Heading>
      <CircularProgress value={waterPercentage} size="100px" color="blue.300">
        <CircularProgressLabel>{waterPercentage}%</CircularProgressLabel>
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
