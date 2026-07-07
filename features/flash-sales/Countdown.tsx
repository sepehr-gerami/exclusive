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
 <div className="flex items-end justify-center gap-2 pt-6 px-2 flex-wrap cursor-default sm:justify-start sm:gap-4 sm:pt-10 sm:px-8">
  <div className="text-center">
    <p className="text-[10px] uppercase font-semibold sm:text-xs">Days</p>
    <p className="text-xl font-bold sm:text-3xl">{days}</p>
  </div>
  <span className="text-xl font-bold mb-1 text-[#E07575] sm:text-3xl">:</span>



  <div className="text-center">
    <p className="text-[10px] uppercase font-semibold sm:text-xs">Days</p>
    <p className="text-xl font-bold sm:text-3xl">{hours}</p>
  </div>
  <span className="text-xl font-bold mb-1 text-[#E07575] sm:text-3xl">:</span>

  <div className="text-center">
    <p className="text-[10px] uppercase font-semibold sm:text-xs">Days</p>
    <p className="text-xl font-bold sm:text-3xl">{minutes}</p>
  </div>
  <span className="text-xl font-bold mb-1 text-[#E07575] sm:text-3xl">:</span>

   <div className="text-center">
    <p className="text-[10px] uppercase font-semibold sm:text-xs">Days</p>
    <p className="text-xl font-bold sm:text-3xl">{seconds}</p>
  </div>
  <span className="text-xl font-bold mb-1 text-[#E07575] sm:text-3xl">:</span>
</div>
  );
}