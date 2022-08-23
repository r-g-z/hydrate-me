import { Image, Flex, Text, HStack } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { Icon } from "@chakra-ui/react";
import { IconName } from "react-icons/fa";

const Footer = () => {
  const [user, setUser] = useState(null);

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
    <div>
      <Image
        borderRadius="full"
        boxSize="100px"
        src="/img/cute-smiling-hi.webp"
        alt="profile-pic"
      />
      <Text>{user.username}</Text>
      <div>
        <HStack>
          <Text>Gender</Text>
          <Text>Weight</Text>
          <Text>Activity</Text>
        </HStack>
        <HStack>
          <Text>{user.gender}</Text>
          <Text>{user.weight}</Text>
          <Text>{user.exercise}</Text>
        </HStack>
      </div>

      <Text>
        <i class="fa-solid fa-droplet"></i>Daily Goal {user.daily_goal}ml
      </Text>
      {/* <Flex direction="column">
        <Heading>Daily Goal</Heading>
        <Text>{user.daily_goal}ml</Text>
      </Flex> */}
    </div>
  );
};

export default Footer;
