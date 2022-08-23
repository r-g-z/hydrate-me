import { useState } from "react";
import {
  useRadioGroup,
  HStack,
  VStack,
  Stack,
  Button,
  Text,
} from "@chakra-ui/react";
import RadioCard from "../Form/RadioCard";
import {
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
} from "@chakra-ui/react";
import OnboardSummary from "./OnboardSummary";
import ProfileForm from "../Form/ProfileForm";

const initialState = {
  gender: "",
  weight: 0,
  exercise: "",
};

const Onboard = () => {
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
          <ProfileForm
            onSuccessSubmit={incrementStep}
            initialState={initialState}
            button={"Next"}
          />{" "}
        </>
      )}
      {step === 2 && <OnboardSummary />}
    </>
  );
};

export default Onboard;
