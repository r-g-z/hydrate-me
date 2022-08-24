import { useState } from "react";
import { Link } from "react-router-dom";
import "./Login.css";
import { Heading, Text, Box, Button, Input } from "@chakra-ui/react";
import { BsFillArrowLeftSquareFill } from "react-icons/bs";

const Login = (props) => {
  const [fields, setFields] = useState({ username: "", password: "" });

  const handleChange = (event) => {
    setFields({
      ...fields,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const res = await fetch(`/users/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(fields),
    });
    const data = await res.json();
    console.log(data.msg);
    console.log(data.user.id);
    props.handleLogin(data);
  };

  return (
    <form onSubmit={handleSubmit}>
      <Heading as="h3">Log In</Heading>
      <Box>
        <label className="user" htmlFor="username">
          Username
        </label>
        <Input
          value={fields.username}
          onChange={handleChange}
          name="username"
          type="text"
          id="username"
        />
      </Box>
      <Box className="marginlg">
        <label className="user" htmlFor="password">
          Password
        </label>
        <Input
          value={fields.password}
          onChange={handleChange}
          name="password"
          type="password"
          id="password"
        />
      </Box>
      <Button className="marginlg" type="submit">
        Login
      </Button>
      <Text className="marginlg">No account yet? Sign up for free </Text>
      <Text>
        <Link to="/register">Register here</Link>
      </Text>
    </form>
  );
};

export default Login;
