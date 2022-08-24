import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Stack, Button, Heading, Text, Box, Image } from "@chakra-ui/react";

const OnboardSummary = (props) => {
  const [user, setUser] = useState(null);

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

  let navigate = useNavigate();

  const handleClick = () => {
    navigate("/dashboard");
    //   click on next to take you onto the water log page
    // This page is to show everday when you first start your day because everyday you are logging
  };

  if (!user) {
    return <div>Loading</div>;
  }

  return (
    <Box sx={{ width: "100%" }}>
      <Text fontSize={"24px"} sx={{ mb: "10px" }}>
        Hi {user.username}
      </Text>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexDir: "column",
        }}
      >
        <Heading as="h1">Your Daily Goal</Heading>
        <Text fontSize="2xl">{user.daily_goal}ml</Text>
      </Box>
      <Image
        borderRadius="full"
        objectFit={"contain"}
        sx={"maxHeight: 100%"}
        src="/img/cup.gif"
        alt="onboard picture"
      />

      <Stack direction="row" spacing={4} align="center">
        <Box
          sx={{
            display: "flex",
            justifyContent: "flex-end",
            width: "100%",
            mt: "130px",
          }}
        >
          <Button
            colorScheme="#015C92"
            onClick={handleClick}
            variant="outline"
            type="submit"
            size="lg"
          >
            Next
          </Button>
        </Box>
      </Stack>
    </Box>
  );
};

export default OnboardSummary;
