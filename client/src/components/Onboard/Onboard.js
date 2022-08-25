import { useState } from "react";
import OnboardSummary from "./OnboardSummary";
import ProfileForm from "../Form/ProfileForm";
import { Text } from "@chakra-ui/react";

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
          <Text sx={{ mb: "10px", fontSize: "1.5rem" }}>
            A few simple steps to generate a suitable drinking plan for you.
          </Text>
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
