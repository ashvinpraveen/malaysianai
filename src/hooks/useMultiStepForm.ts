import { useState } from "react";

export function useMultiStepForm(totalSteps: number) {
  const [currentStep, setCurrentStep] = useState(0);

  const next = () => {
    setCurrentStep((prev) => Math.min(prev + 1, totalSteps - 1));
  };

  const back = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 0));
  };

  const goTo = (step: number) => {
    if (step >= 0 && step < totalSteps) {
      setCurrentStep(step);
    }
  };

  const isFirstStep = currentStep === 0;
  const isLastStep = currentStep === totalSteps - 1;
  const progress = ((currentStep + 1) / totalSteps) * 100;

  return {
    currentStep,
    next,
    back,
    goTo,
    isFirstStep,
    isLastStep,
    progress,
    totalSteps,
  };
}
