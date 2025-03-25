import ProgressCheckOut from "@/app/(main)/cart/components/ProgressCheckOut";
import { Button } from "@/components/ui/button";
import useStepStore from "@/store/useStepStore";

const Step3 = () => {
  const { step, next, previous, isHydrated } = useStepStore();

  console.log(step);
  return (
    <div className="p-12">
      <ProgressCheckOut step={3} />
    </div>
  );
};

export default Step3;
