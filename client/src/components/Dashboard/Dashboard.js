import { useEffect, useState } from "react";
import {
  Heading,
  Flex,
  Text,
  CircularProgress,
  CircularProgressLabel,
  Box,
  Image,
} from "@chakra-ui/react";
import { endOfDay, format, parseISO, startOfDay } from "date-fns";
import AddDrinks from "../Form/AddDrinks";
import { Link } from "react-router-dom";
import WaterLogs from "../WaterLogs/WaterLogs";

const Dashboard = (props) => {
  const [user, setUser] = useState(null);
  const [waterEntries, setWaterEntries] = useState([]);
  const [waterPercentage, setWaterPercentage] = useState(0);

  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_URL}/users/profile`, {
      method: "GET",
      credentials: "include",
    })
      .then((res) => {
        return res.json();
      })
      .then((userData) => {
        setUser(userData);
      });
  }, []);

  useEffect(() => {
    fetch(
      `${process.env.REACT_APP_API_URL}/entries?startDate=${startOfDay(
        new Date()
      )}&endDate=${endOfDay(new Date())}`,
      {
        method: "GET",
        credentials: "include",
      }
    )
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

  const addCups = (number) => {
    fetch(`${process.env.REACT_APP_API_URL}/entries`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ date: new Date(), waterAmount: 250 }),
      credentials: "include",
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        setWaterEntries([...waterEntries, data]);
      });
  };

  const handleDelete = (id) => {
    fetch(`${process.env.REACT_APP_API_URL}/entries`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id }),
      credentials: "include",
    })
      .then((res) => {
        return res.json();
      })
      .then(() => {
        const remainingWaterEntries = waterEntries.filter((waterEntry) => {
          return waterEntry._id !== id;
        });
        setWaterEntries(remainingWaterEntries);
      });
  };

  if (!user) {
    return (
      <Box sx={{ fontSize: "20px", textAlign: "center" }}>
        <Image
          borderRadius="full"
          objectFit={"contain"}
          sx={"maxHeight: 100%"}
          src="/img/cup.gif"
          alt="onboard picture"
        />
        Loading
      </Box>
    );
  }

  return (
    <Box sx={{ width: "100%", mb: "100px" }}>
      <Heading>Feeling Parched?</Heading>
      <Box sx={{ display: "flex", justifyContent: "center", my: "24px" }}>
        <CircularProgress value={waterPercentage} size="200px" color="blue.300">
          <CircularProgressLabel>{waterPercentage}%</CircularProgressLabel>
        </CircularProgress>
      </Box>
      <Box>
        <Box sx={{ width: "100%" }}>
          <AddDrinks addCups={addCups} />
        </Box>
        <Flex direction="column" sx={{ mt: "1.5rem" }}>
          <Heading>Daily Goal </Heading>

          <Text fontSize="18px">{user.daily_goal}ml</Text>
        </Flex>
        <Box sx={{ mt: "1.5rem" }}>
          <Text fontSize="2xl" as="b">
            Today
          </Text>
        </Box>
        <WaterLogs waterEntries={waterEntries} handleDelete={handleDelete} />
      </Box>
    </Box>
  );
};

export default Dashboard;
