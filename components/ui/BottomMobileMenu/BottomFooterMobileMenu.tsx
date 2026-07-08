"use client";

export default function BottomFooterMobileMenu() {
  return (
<div className="border-t border-gray-200 p-3">
  <button
    className="
      menu-footer-btn
      relative
      w-45
      overflow-hidden
      rounded-xl
      border
      border-blue-500
      bg-black
      px-4
      py-3
      pb-12
      right-2
      text-center
      text-white
      transition-all
      duration-200
      hover:bg-blue-600
      hover:shadow-[0_0_20px_3px_rgba(0,142,236,.7)]
      active:scale-95
    "
  >
    <h3 className="text-sm font-semibold">
      Welcome to Exclusive
    </h3>

  </button>
</div>
  );
}