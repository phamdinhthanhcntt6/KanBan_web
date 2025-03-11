import { convertToTimestamp } from "@/utils/convertToTimeStamp";
import { useEffect, useState } from "react";

interface Props {
  targetDate: string;
}

const TimeLeftComponent = (props: Props) => {
  const { targetDate } = props;

  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    mins: 0,
    secs: 0,
  });

  useEffect(() => {
    const interval = setInterval(() => {
      const value =
        convertToTimestamp(targetDate, "DD/MM/YYYY") -
        Number(Date.now().toString());

      let days, hours, mins, secs;

      if (value > 0) {
        days = Math.floor(value / 86400 / 1000);
        hours = Math.floor((value % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        mins = Math.floor((value % (1000 * 60 * 60)) / (1000 * 60));
        secs = Math.floor((value % (1000 * 60)) / 1000);

        setTimeLeft({ days, hours, mins, secs });
      } else {
        setTimeLeft({ days: 0, hours: 0, mins: 0, secs: 0 });
      }
    }, 1000);
    return () => clearInterval(interval);
  }, [targetDate]);

  const renderTime = (value: number, label: string) => {
    return (
      <div className=" border border-slate-200 rounded-sm w-16 text-center py-2">
        <div className="font-black text-2xl">{value}</div>
        <div className="font-semibold">{label}</div>
      </div>
    );
  };

  const DealTime = [
    {
      label: "Days",
      value: timeLeft.days,
    },
    {
      label: "Hours",
      value: timeLeft.hours,
    },
    {
      label: "Mins",
      value: timeLeft.mins,
    },
    {
      label: "Secs",
      value: timeLeft.secs,
    },
  ];

  return (
    <div className="flex gap-x-4 flex-row max-md:gap-x-2">
      {DealTime.map((item: { label: string; value: number }) => (
        <div key={item.label}>{renderTime(item.value, item.label)}</div>
      ))}
    </div>
  );
};

export default TimeLeftComponent;
