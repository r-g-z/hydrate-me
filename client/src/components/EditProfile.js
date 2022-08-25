import ProfileForm from "./Form/ProfileForm";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Box } from "@chakra-ui/react";

const EditProfile = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
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

  return (
    <Box sx={{ width: "100%", mb: "4rem" }}>
      {user && (
        <ProfileForm
          initialState={{
            gender: user.gender,
            weight: user.weight,
            exercise: user.exercise,
          }}
          onSuccessSubmit={() => {
            navigate("/profile");
          }}
          button={"Update"}
        />
      )}
    </Box>
  );
};

export default EditProfile;
