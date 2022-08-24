import { Image, Flex, Text, HStack, Box } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { ImDroplet } from "react-icons/im";
import { BsPersonFill } from "react-icons/bs";
import { GiWeight, GiWeightLiftingUp } from "react-icons/gi";
import { useNavigate } from "react-router-dom";
import Logout from "./Users/Logout";

const Profile = ({ authorised, handleLogout }) => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`/users/profile`, {
      method: "GET",
    })
      .then((res) => {
        return res.json();
      })
      .then((userData) => {
        console.log(userData);
        setUser(userData);
      });
  }, []);

  if (!user) {
    return <div>Loading</div>;
  }

  return (
    <Box sx={{ width: "100%" }}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "flex-end",
          width: "100%",
        }}
      >
        <Logout handleLogout={handleLogout} />
      </Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Image
          borderRadius="full"
          border="1px"
          boxSize="120px"
          src="/img/cute-smiling-hi.webp"
          alt="profile-pic"
        />
        <Text fontSize={"30px"}>{user.username}</Text>
      </Box>
      <Box
        sx={{ border: "1px", p: "5px", mt: "10px" }}
        onClick={() => {
          navigate("/profile/edit");
        }}
      >
        <HStack
          sx={{
            display: "flex",
            justifyContent: "space-between",
            fontSize: "20px",
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <BsPersonFill />
            <Text>Gender</Text>
          </Box>
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <GiWeight />
            <Text>Weight</Text>
          </Box>
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <GiWeightLiftingUp />
            <Text>Activity</Text>
          </Box>
        </HStack>
        <HStack
          sx={{
            display: "flex",
            justifyContent: "space-between",
            fontSize: "18px",
          }}
        >
          <Text>{user.gender}</Text>
          <Text>{user.weight}</Text>
          <Text>{user.exercise}</Text>
        </HStack>
      </Box>
      <Box sx={{ display: "flex", alignItems: "center", fontSize: "20px" }}>
        <Box sx={{ color: "#53A7D8", m: "15px 5px" }}>
          <ImDroplet />
        </Box>
        <Text>
          {" "}
          <b>Daily Goal</b> {user.daily_goal}ml
        </Text>
      </Box>
    </Box>
  );
};

export default Profile;
