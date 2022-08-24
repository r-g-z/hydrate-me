import { useEffect, useState } from "react";
import { endOfDay, format, parseISO, startOfDay } from "date-fns";
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
} from "@chakra-ui/react";
import { DeleteIcon } from "@chakra-ui/icons";

const Logs = () => {
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
    return <div>Loading</div>;
  }

  return (
    <div>
      <Text>Today</Text>
      <List>
        {waterEntries.map((waterEntry) => {
          return (
            <ListItem>
              {waterEntry.date && format(parseISO(waterEntry.date), "h:mm a")}{" "}
              {waterEntry.waterAmount}ml
              <div onClick={() => handleDelete(waterEntry._id)}>
                <DeleteIcon />
              </div>
            </ListItem>
          );
        })}
      </List>
    </div>
  );
};

export default Logs;
