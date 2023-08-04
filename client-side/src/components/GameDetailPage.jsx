import {useState} from "react";
import Stepper from "./Stepper";
import StepperControl from "./StepperControl";
import {UseContextProvider} from "../contexts/StepperContext";

import Account from "./steps/Account";
import Details from "./steps/Detail";
import Payment from "./steps/Payment";
import Final from "./steps/Final";
import Topnav from "./Topnav";

export default function StepperPage() {
  const [currentStep, setCurrentStep] = useState(1);

  const steps = [
    "Account Information",
    "Personal Details",
    "Payment Method",
    "Complete",
  ];

  const displayStep = (step) => {
    switch (step) {
      case 1:
        return <Account />;
      case 2:
        return <Details />;
      case 3:
        return <Payment />;
      case 4:
        return <Final />;
      default:
        return null;
    }
  };

  const handleClick = (direction) => {
    let newStep = currentStep;

    direction === "next" ? newStep++ : newStep--;
    // check if the new step is within the range of steps

    newStep > 0 && newStep <= steps.length && setCurrentStep(newStep);
  };

  return (
    <>
    <Topnav />
      <div className="bg-white mx-auto rounded-2xl pb-2 shadow-xl md:w-1/2">
        {/* Stepper */}
        <div className="horizontal container mt-5 ">
          <Stepper steps={steps} currentStep={currentStep} />

          <div className="my-10 p-10 ">
            <UseContextProvider>{displayStep(currentStep)}</UseContextProvider>
          </div>
        </div>

        {/* navigation button */}
        {currentStep !== steps.length && (
          <StepperControl
            handleClick={handleClick}
            currentStep={currentStep}
            steps={steps}
          />
        )}
      </div>
    </>
  );
}
