import { useState } from "react";
import { useRadioGroup, HStack, VStack, Stack } from "@chakra-ui/react";
import RadioCard from "../Form/RadioCard";
import {
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
} from "@chakra-ui/react";
import { Button, ButtonGroup } from "@chakra-ui/react";
import OnboardSummary from "./OnboardSummary";

const initialState = {
  gender: "",
  weight: 0,
  exercise: "",
};

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

      <NumberInput>
        <NumberInputField name="weight" onChange={handleChange} type="number" />
      </NumberInput>
      <h1>Weekly Exercise Activity</h1>
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
          Next
        </Button>
      </Stack>
    </form>
  );
};

function Onboard() {
  const [step, setStep] = useState(1);

  const incrementStep = () => {
    setStep(step + 1);
  };

  return (
    <>
      {step === 1 && (
        <>
          <p>
            A few simple steps to generate a suitable drinking plan for you.
          </p>
          <ProfileForm onSuccessSubmit={incrementStep} />{" "}
        </>
      )}
      {step === 2 && <OnboardSummary />}
    </>
  );
}

export default Onboard;
