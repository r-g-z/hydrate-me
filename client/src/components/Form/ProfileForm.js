import { useState } from "react";
import {
  useRadioGroup,
  HStack,
  VStack,
  Stack,
  Button,
  Text,
  NumberInput,
  NumberInputField,
} from "@chakra-ui/react";
import RadioCard from "./RadioCard";

const calculateDailyGoal = (weight, exercise) => {
  let daily_goal = parseInt(weight) * 33;
  switch (exercise) {
    case "Light":
      daily_goal += 350;
      break;
    case "Medium":
      daily_goal += 500;
      break;
    case "Intense":
      daily_goal += 700;
      break;
    default:
      console.log("Drink more");
  }
  return daily_goal;
};

const ProfileForm = ({ onSuccessSubmit, initialState, button }) => {
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
        onSuccessSubmit();
      });
  };

  const handleGenderChange = (value) => {
    const updatedFields = { ...fields, gender: value };
    setFields(updatedFields);
  };

  const options = ["Female", "Male"];

  const { getRootProps, getRadioProps } = useRadioGroup({
    name: "gender",
    defaultValue: fields.gender,
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
    defaultValue: fields.exercise,
    onChange: handleExerciseChange,
  });

  const group = getRootProps();
  const exerciseGroup = getExerciseRootProps();

  return (
    <form onSubmit={handleSubmit}>
      <Text>Gender</Text>
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
      <Text>Weight</Text>

      <NumberInput name="weight" type="number" defaultValue={fields.weight}>
        <NumberInputField onChange={handleChange} />
      </NumberInput>
      <Text>Weekly Exercise Activity</Text>
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

      <Stack direction="row" spacing={4} align="center">
        <Button colorScheme="teal" variant="outline" type="submit">
          {button}
        </Button>
      </Stack>
    </form>
  );
};

export default ProfileForm;
