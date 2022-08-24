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
    <Box>
      <Image
        borderRadius="full"
        boxSize="100px"
        src="/img/cute-smiling-hi.webp"
        alt="profile-pic"
      />
      <Text>{user.username}</Text>
      <Box
        sx={{ border: "1px" }}
        onClick={() => {
          navigate("/profile/edit");
        }}
      >
        <HStack>
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
        <HStack>
          <Text>{user.gender}</Text>
          <Text>{user.weight}</Text>
          <Text>{user.exercise}</Text>
        </HStack>
      </Box>
      <Box sx={{ display: "flex", alignItems: "center" }}>
        <Box sx={{ color: "#53A7D8" }}>
          <ImDroplet />
        </Box>
        <Text>Daily Goal {user.daily_goal}ml</Text>
      </Box>

      <Logout handleLogout={handleLogout} />
    </Box>
  );
};

export default Profile;
