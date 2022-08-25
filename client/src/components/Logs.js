import { useEffect, useState } from "react";
import { endOfDay, startOfDay } from "date-fns";
import { Heading, Box } from "@chakra-ui/react";
import WaterLogs from "./WaterLogs/WaterLogs";

const Logs = () => {
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
    return <div>Loading</div>;
  }

  return (
    <Box sx={{ width: "100%" }}>
      <Heading>Today</Heading>
      <WaterLogs waterEntries={waterEntries} handleDelete={handleDelete} />
    </Box>
  );
};

export default Logs;
