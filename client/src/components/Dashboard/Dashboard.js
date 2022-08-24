import { useEffect, useState } from "react";
import {
  Heading,
  Flex,
  Text,
  useDisclosure,
  CircularProgress,
  CircularProgressLabel,
  List,
  ListItem,
  Icon,
  Box,
  Button,
} from "@chakra-ui/react";
import { DeleteIcon } from "@chakra-ui/icons";
import { endOfDay, format, parseISO, startOfDay } from "date-fns";
import AddDrinks from "../Form/AddDrinks";
import { Link } from "react-router-dom";

const Dashboard = (props) => {
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
    fetch(
      `/entries?startDate=${startOfDay(new Date())}&endDate=${endOfDay(
        new Date()
      )}`,
      {
        method: "GET",
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
    fetch(`/entries`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ date: new Date(), waterAmount: 250 }),
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        setWaterEntries([...waterEntries, data]);
      });
  };

  const handleDelete = (id) => {
    fetch(`/entries`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id }),
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
      <Box>
        <Link to="/login">Login</Link> or <Link to="/register">Register</Link>
      </Box>
    );
  }

  return (
    <Box sx={{ width: "100%" }}>
      <Box>
        <Heading sx={{ mb: "10px" }}>Feeling Parched?</Heading>
        <CircularProgress value={waterPercentage} size="100px" color="blue.300">
          <CircularProgressLabel>{waterPercentage}%</CircularProgressLabel>
        </CircularProgress>
      </Box>
      <Box>
        <Flex direction="column">
          <Heading sx={{ mb: "10px" }}>Daily Goal</Heading>
          <Text>{user.daily_goal}ml</Text>
        </Flex>
        <Text fontSize="2xl">Today</Text>
        <List>
          {waterEntries.map((waterEntry) => {
            return (
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <ListItem>
                  {waterEntry.date &&
                    format(parseISO(waterEntry.date), "h:mm a")}{" "}
                  {waterEntry.waterAmount}ml{" "}
                  <Button size="sm">
                    <DeleteIcon onClick={() => handleDelete(waterEntry._id)} />
                  </Button>
                </ListItem>
              </Box>
            );
          })}
        </List>
      </Box>
      <AddDrinks addCups={addCups} />
    </Box>
  );
};

export default Dashboard;
