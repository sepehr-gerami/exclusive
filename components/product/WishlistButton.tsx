"use client";

import { useState } from "react";

interface Props {
  initialLiked?: boolean;
}

export default function WishlistButton({ initialLiked = false }: Props) {
  const [liked, setLiked] = useState(initialLiked);
  const [burst, setBurst] = useState(false);

  function handleClick(e: React.MouseEvent) {
    e.preventDefault();
    e.stopPropagation();
    setLiked((prev) => !prev);
    setBurst(true);
    setTimeout(() => setBurst(false), 200);
  }

  return (
    <button
      onClick={handleClick}
      aria-label={liked ? "Remove from wishlist" : "Add to wishlist"}
      style={{ WebkitTapHighlightColor: "transparent" }}
      className={`
        w-8 h-8 bg-white cursor-pointer rounded-full flex items-center justify-center shadow
        transition-transform duration-150  hover:bg-red-500 hover:text-white
        ${burst ? "scale-90" : "scale-100"}
      `}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="16"
        viewBox="0 0 24 24"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="transition-all duration-300"
        stroke={liked ? "pink" : "currentColor"}
        fill={liked ? "pink" : "none"}
      >
        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
      </svg>
    </button>
  );
}