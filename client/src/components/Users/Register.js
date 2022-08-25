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

const Register = (props) => {
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
    const res = await fetch(`/users/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(fields),
      mode: "cors",
    });
    const data = await res.json();
    if (res.ok) {
      props.handleRegister(data);
      navigate("/onboarding");
    } else {
      setError(data.msg);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <Heading as="h3">Register</Heading>
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
        Register
      </Button>
      {error && (
        <Alert status="error">
          <AlertIcon />
          {error}
        </Alert>
      )}
      <Text className="marginlg">Already have an account? </Text>
      <Text as="i">
        <Link to="/login" as="i">
          Login here
        </Link>
      </Text>
    </form>
  );
};

export default Register;
