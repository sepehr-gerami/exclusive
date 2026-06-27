"use client";

import { useEffect, useState } from "react";
import { useFlashSaleStore } from "@/store/flashSaleStore";

export default function Countdown() {
  const endTime = useFlashSaleStore((state) => state.endTime);

  const [timeLeft, setTimeLeft] = useState<number | null>(null);

  useEffect(() => {
    const updateTime = () => {
      setTimeLeft(endTime - Date.now());
    };

    updateTime();

    const timer = setInterval(updateTime, 1000);

    return () => clearInterval(timer);
  }, [endTime]);

  if (timeLeft === null) return null;
  const days = String(Math.floor(timeLeft / (1000 * 60 * 60 * 24))).padStart(2, "0");
  const hours = String(Math.floor((timeLeft / (1000 * 60 * 60)) % 24)).padStart(2, "0");
  const minutes = String(Math.floor((timeLeft / (1000 * 60)) % 60)).padStart(2, "0");
  const seconds = String(Math.floor((timeLeft / 1000) % 60)).padStart(2, "0");


  return (
    <div className="flex items-end gap-4 cursor-default">
  <div className="text-center">
    <p className="text-xs uppercase font-semibold">Days</p>
    <p className="text-3xl font-bold">{days}</p>
  </div>

  <span className="text-3xl font-bold mb-1 text-[#E07575]">:</span>

  <div className="text-center">
    <p className="text-xs uppercase font-semibold">Hours</p>
    <p className="text-3xl font-bold">{hours}</p>
  </div>

  <span className="text-3xl font-bold mb-1 text-[#E07575]">:</span>

  <div className="text-center">
    <p className="text-xs uppercase font-semibold">Minutes</p>
    <p className="text-3xl font-bold">{minutes}</p>
  </div>

  <span className="text-3xl font-bold mb-1 text-[#E07575]">:</span>

  <div className="text-center">
    <p className="text-xs uppercase font-semibold">Seconds</p>
    <p className="text-3xl font-bold">{seconds}</p>
  </div>
</div>
  );
}