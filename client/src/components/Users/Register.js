import { useState } from "react";
import { Link } from "react-router-dom";
import "./Login.css";
import { Heading, Text } from "@chakra-ui/react";
import { BsFillArrowLeftSquareFill } from "react-icons/bs";

const Register = (props) => {
  const [fields, setFields] = useState({ username: "", password: "" });

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
    console.log(data);
    props.handleRegister(data);
  };

  return (
    <form onSubmit={handleSubmit}>
      <Heading as="h3">Register</Heading>
      <div>
        <label className="user" htmlFor="username">
          Username
        </label>
        <input
          value={fields.username}
          onChange={handleChange}
          name="username"
          type="text"
          id="username"
        />
      </div>
      <div className="marginlg">
        <label className="user" htmlFor="password">
          Password
        </label>
        <input
          value={fields.password}
          onChange={handleChange}
          name="password"
          type="password"
          id="password"
        />
      </div>
      <input className="marginlg" type="submit" value="Register" />
      <Text className="marginlg">
        Already have an account? <Link to="/login">Login here</Link>
      </Text>
    </form>
  );
};

export default Register;
