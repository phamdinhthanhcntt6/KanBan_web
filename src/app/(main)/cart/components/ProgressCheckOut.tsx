import { Card, Home2, TableDocument } from "iconsax-react";

const ProgressCheckOut = ({ step }: { step: number }) => {
  return (
    <div className="flex flex-col relative">
      <div className="flex w-full">
        <div
          className={`flex flex-row border-dashed w-1/2 h-[1px] border ${
            step >= 2 && "border-black"
          }`}
        />
        <div
          className={`flex flex-row border-dashed w-1/2 h-[1px] border ${
            step == 3 && "border-black"
          }`}
        />
      </div>
      <div className="absolute flex justify-between -top-4 w-full">
        <div className="flex flex-col w-max" key={"step1"}>
          <div className="p-2 bg-black w-max rounded-lg">
            <Home2 size={16} color="white" />
          </div>
          <div className="-translate-x-1/4 text-sm font-semibold mt-2">
            Address
          </div>
        </div>
        <div className="flex flex-col w-max" key={"step2"}>
          <div
            className={`p-2 ${
              step >= 2 ? "bg-black" : "bg-slate-100"
            } w-max rounded-lg mx-auto`}
          >
            <Card size={16} color={step >= 2 ? "white" : "black"} />
          </div>
          <div className="text-sm font-semibold mt-2">Payment Method</div>
        </div>
        <div className="flex flex-col w-max translate-x-3" key={"step3"}>
          <div
            className={`p-2 ${
              step == 3 ? "bg-black" : "bg-slate-100"
            } w-max rounded-lg translate-x-1/4`}
          >
            <TableDocument size={16} color={step == 3 ? "white" : "black"} />
          </div>
          <div className="text-sm font-semibold mt-2">Review</div>
        </div>
      </div>
    </div>
  );
};

export default ProgressCheckOut;
