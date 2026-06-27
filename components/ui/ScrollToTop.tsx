"use client";

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
  className="fixed bottom-6 right-6 z-10 cursor-pointer bg-white text-black px-3 py-1 rounded-full border border-gray-300 shadow-none hover:shadow-[0_0_12px_rgba(255,140,0,0.8),0_0_40px_rgba(255,140,0,1)] transition-all duration-300"
    >
     <i className="bi bi-arrow-up text-[23px] "></i>
    </button>
  );
}