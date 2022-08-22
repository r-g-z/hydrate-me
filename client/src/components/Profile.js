import { Image } from "@chakra-ui/react";
import { useEffect, useState } from "react";

const Footer = () => {
  const [use, setUser] = useState(null);

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
      <Image
        borderRadius="full"
        boxSize="100px"
        src="/img/cute-smiling-hi.webp"
        alt="profile-pic"
      />
    </div>
  );
};

export default Footer;
