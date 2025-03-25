"use client";

import ProgressCheckOut from "@/app/(main)/cart/components/ProgressCheckOut";
import Step1 from "@/app/(main)/cart/components/Step1";
import Step2 from "@/app/(main)/cart/components/Step2";
import Step3 from "@/app/(main)/cart/components/Step3";
import useStepStore from "@/store/useStepStore";
import { Home2 } from "iconsax-react";

const ProgressComponent = () => {
  const { step, next, previous, isHydrated } = useStepStore();

  const renderStep = (step: number) => {
    switch (step) {
      case 1:
        return <Step1 />;
      case 2:
        return <Step2 />;
      case 3:
        return <Step3 />;
      default:
        break;
    }
  };

  return <div className="w-full">{renderStep(step)}</div>;
};

export default ProgressComponent;
