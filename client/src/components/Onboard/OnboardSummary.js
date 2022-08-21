import Onboard from "./Onboard";
import { useEffect, useState } from "react";

function OnboardSummary(props) {
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

  if (!user) {
    return <div>Loading</div>;
  }

  return (
    <div>
      <h1>Hi {user.username} </h1>
      <h1>Daily Goal</h1>
      <h1>{user.daily_goal}ml</h1>
    </div>
  );
}

export default OnboardSummary;
