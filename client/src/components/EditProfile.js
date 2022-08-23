import ProfileForm from "./Form/ProfileForm";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const EditProfile = () => {
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
        setUser(userData);
      });
  }, []);

  return (
    <div>
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
        />
      )}
    </div>
  );
};

export default EditProfile;
