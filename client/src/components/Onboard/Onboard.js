import { useState } from "react";
import { useRadioGroup, HStack, VStack } from "@chakra-ui/react";
import RadioCard from "../Form/RadioCard";

const initialState = {
  gender: "",
  weight: 60,
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
    props.onFormSubmit(fields);
    setFields(initialState);
    console.log(fields);
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

  const group = getRootProps();
  const exerciseGroup = getExerciseRootProps();

  return (
    <form onSubmit={handleSubmit}>
      <h1>Gender</h1>
      {/* <input name="gender" /> */}
      {/* <label className="form-label" htmlFor="gender"></label> */}
      <HStack {...group}>
        {options.map((value) => {
          const radio = getRadioProps({ value });
          return (
            <RadioCard key={value} {...radio}>
              {value}
            </RadioCard>
          );
        })}
      </HStack>
      <h1>Weight</h1>
      <VStack {...exerciseGroup}>
        {exerciseOptions.map((value) => {
          const radio = getExerciseRadioProps({ value });
          return (
            <RadioCard key={value} {...radio}>
              {value}
            </RadioCard>
          );
        })}
      </VStack>
      <h1>Weekly Exercise Activity</h1>
    </form>
  );
};

function Onboard() {
  return (
    <>
      <p>A few simple steps to generate a suitable drinking plan for you.</p>
      <ProfileForm />
    </>
  );
}

export default Onboard;
