"use client";

import { CircleArrowUp } from "lucide-react";
import { useEffect, useState } from "react";

export default function ScrollToTop() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShow(window.scrollY > 300);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (!show) return null;

  return (
    <button
      onClick={() =>
        window.scrollTo({ top: 0, behavior: "smooth" })
      }
  className="fixed bottom-6 right-6 z-10  cursor-pointer bg-white text-black px-2 py-2 rounded-full border border-gray-300 shadow-none hover:shadow-[0_0_12px_rgba(209,213,219,0.7),0_0_20px_rgba(229,231,235,0.9)] transition-all duration-300"
    >
     <CircleArrowUp size={32} color="#364153 " strokeWidth={2} absoluteStrokeWidth />
    </button>
  );
}