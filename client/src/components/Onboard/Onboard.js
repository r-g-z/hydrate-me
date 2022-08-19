import { useState } from "react";

const initialState = {
  gender: "",
  weight: 60,
  exercise: "",
};

const Form = (props) => {
  const [fields, setFields] = useState(initialState);
  const handleChange = (event) => {
    const { name, value } = event.target;
    let updatedFields = { ...fields };
    updatedFields[name] = value;
    setFields(updatedFields);
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    props.onFormSubmit(fields);
    setFields(initialState);
    console.log(fields);
  };
};

function Onboard() {
  return (
    <>
      <p>A few simple steps to generate a suitable drinking plan for you.</p>
      <Form />
    </>
  );
}

export default Onboard;
