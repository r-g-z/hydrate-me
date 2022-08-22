import { Text, Link } from "@chakra-ui/react";

function Footer() {
  return (
    <div>
      <Text>About Us</Text>
      <div>
        <Link href="https://www.linkedin.com/in/s-cho/" isExternal>
          Linkedin
        </Link>
        <Link href="https://github.com/Suzyyc" isExternal>
          GitHub
        </Link>
      </div>
    </div>
  );
}

export default Footer;
