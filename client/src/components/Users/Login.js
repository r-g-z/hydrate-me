import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Login.css";
import {
  Heading,
  Text,
  Box,
  Button,
  Input,
  Alert,
  AlertIcon,
} from "@chakra-ui/react";

const Login = (props) => {
  const [fields, setFields] = useState({ username: "", password: "" });
  const [error, setError] = useState(null);
  const navigate = useNavigate();

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
    if (res.ok) {
      props.handleLogin(data);
      navigate("/dashboard");
    } else {
      console.log("here");
      setError(data.msg);
    }
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
      {error && (
        <Alert status="error">
          <AlertIcon />
          {error}
        </Alert>
      )}
      <Text className="marginlg">No account yet? Sign up for free </Text>
      <Text as="i">
        <Link to="/register">Register here</Link>
      </Text>
    </form>
  );
};

export default Login;
