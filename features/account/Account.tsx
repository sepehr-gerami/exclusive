"use client";

import useAuthStore from "@/store/useAuthStore";
import { CircleX, LogOut, ShoppingBag, StarMinus, User, UserRound } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";

export default function UserAccount() {
    const [open, setOpen] = useState(false);
    const router = useRouter();
    const logout = useAuthStore((state) => state.logout);

    const wrapperRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            if (
                wrapperRef.current &&
                !wrapperRef.current.contains(e.target as Node)
            ) {
                setOpen(false);
            }
        };

        document.addEventListener("click", handleClickOutside);

        return () => {
            document.removeEventListener("click", handleClickOutside);
        };
    }, []);
    const handleLogout = () => {
        logout();
        router.push("/login");
    };

    return (
        <div
            ref={wrapperRef}
            className="relative"
            onClick={() => setOpen((prev) => !prev)}

        >
            {/* Icon */}
            <button

                className={`group relative cursor-pointer flex items-center justify-center rounded-full p-2 transition-colors duration-300 ${open ? "bg-red-500 text-white" : ""
                    }`}
            >
                <span
                    className={`absolute inset-0 left-1/2 -translate-x-1/2 rounded-4xl transition-all duration-300
    ${open
                            ? "w-full bg-red-500"
                            : "w-0 bg-gray-100 group-hover:w-10 h-10"
                        }`}
                />

                <span className="absolute bottom-0 left-1/2 h-0.5 w-5 -translate-x-1/2 bg-black transition-all duration-300 group-hover:w-9" />

                <span className="relative z-10 transition-all duration-200 group-hover:scale-110">
                    <UserRound size={22} className={open ? "text-white" : "text-black"} />
                </span>
            </button>

            {/* Dropdown */}
            <div
                className={`absolute right-0 top-full z-50 mt-3 w-72
  rounded-md

  bg-black/60
backdrop-blur-xl
border border-white/10
  
  shadow-[0_20px_60px_rgba(0,0,0,0.18)]
  ring-1 ring-white/10
  overflow-hidden
  transition-all duration-300 origin-top-right
  ${open
                        ? "opacity-100 visible scale-100 translate-y-0"
                        : "opacity-0 invisible scale-95 -translate-y-2"
                    }`}
            >
                <Link
                    href="/account"
                    className="flex items-center gap-4 px-5 py-4 hover:bg-black/60 rounded-4xl mx-1 my-1 transition-colors duration-300 hover:backdrop-blur-xl hover:shadow-md"
                >
                    <User color="#ffffff" strokeWidth={2.25} />
                    <span className=" text-white font-semibold">Manage My Account</span>
                </Link>

                <Link
                    href="/account/orders"
                    className="flex items-center gap-4 px-5 py-4 hover:bg-black/60 rounded-4xl mx-1 my-1 transition-colors duration-300 hover:backdrop-blur-xl hover:shadow-md"
                >
                    <ShoppingBag color="#ffffff" strokeWidth={2.25} />
                    <span className=" text-white font-semibold">My Orders</span>
                </Link>

                <Link
                    href="/account/cancellations"
                    className="flex items-center gap-4 px-5 py-4 hover:bg-black/60 rounded-4xl mx-1 my-1 transition-colors duration-300 hover:backdrop-blur-xl hover:shadow-md"
                >
                    <CircleX color="#ffffff" strokeWidth={2.25} />
                    <span className=" text-white font-semibold">My Cancellations</span>
                </Link>

                <Link
                    href="/account/reviews"
                    className="flex items-center gap-4 px-5 py-4 hover:bg-black/60 rounded-4xl mx-1 my-1 transition-colors duration-300 hover:backdrop-blur-xl hover:shadow-md"
                >
                    <StarMinus color="#ffffff" strokeWidth={2.25} />
                    <span className=" text-white font-semibold">My Reviews</span>
                </Link>

                <div className="border-t border-gray-200" />

                <button
                    onClick={handleLogout}
                    className="flex w-full items-center cursor-pointer gap-4 px-5 py-4 text-red-500 hover:bg-red-900/30 rounded-4xl  my-1 transition"
                >
                    <LogOut size={20} />
                    <span>Logout</span>
                </button>
            </div>
        </div>
    );
}