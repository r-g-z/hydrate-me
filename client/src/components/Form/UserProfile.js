import { useState } from "react";

// change to to reflect what they have put in
const initialState = {
  gender: "",
  weight: 0,
  exercise: "",
};

const ProfileForm = (props) => {
  const [fields, setFields] = useState(initialState);
  const handleChange = (event) => {
    console.log(event);
    const { name, value } = event.target;
    let updatedFields = { ...fields };
    updatedFields[name] = value;
    setFields(updatedFields);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // props.onFormSubmit(fields);
    // setFields(initialState);
    console.log(fields);
    const daily_goal = calculateDailyGoal(fields.weight, fields.exercise);
    fetch(`/users/onboard`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ ...fields, daily_goal }),
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        props.onSuccessSubmit();
      });
  };

  const handleGenderChange = (value) => {
    const updatedFields = { ...fields, gender: value };
    setFields(updatedFields);
  };

  const options = ["Female", "Male"];

  const { getRootProps, getRadioProps } = useRadioGroup({
    name: "gender",
    defaultValue: "",
    onChange: handleGenderChange,
  });

  const handleExerciseChange = (value) => {
    const updatedFields = { ...fields, exercise: value };
    setFields(updatedFields);
  };

  const exerciseOptions = ["Light", "Medium", "Intense"];

  const {
    getRootProps: getExerciseRootProps,
    getRadioProps: getExerciseRadioProps,
  } = useRadioGroup({
    name: "exercise",
    defaultValue: "",
    onChange: handleExerciseChange,
  });

  return <div></div>;
};
