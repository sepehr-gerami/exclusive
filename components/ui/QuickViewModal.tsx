
"use client"
import Image from "next/image";
import { X, Star } from "lucide-react";
import { Product } from "@/types/Product";
import { useEffect } from "react";
import { createPortal } from "react-dom";
type Props = {
    product: Product;
    onClose: () => void;
};

export default function QuickViewModal({
    product,
    onClose,
}: Props) {
    useEffect(() => {
        document.body.style.overflow = "hidden";

        const handleEsc = (e: KeyboardEvent) => {
            if (e.key === "Escape") {
                onClose();
            }
        };

        window.addEventListener("keydown", handleEsc);

        return () => {
            document.body.style.overflow = "auto";
            window.removeEventListener("keydown", handleEsc);
        };
    }, [onClose]);
    return createPortal(
        <div
            onClick={onClose}
            className="
      fixed inset-0 z-999
      flex items-center justify-center
      bg-black/50 backdrop-blur-lg
      p-6
      animate-in fade-in duration-300
    "
        >
            <div
                onClick={(e) => e.stopPropagation()}
                className="
        relative
        w-full max-w-5xl
        overflow-hidden

        rounded-3xl

        border border-white/30

        bg-white/90
        backdrop-blur-2xl

        shadow-[0_30px_90px_rgba(0,0,0,.25)]

        grid lg:grid-cols-[1fr_1fr]
      "
            >
                {/* Background Light */}
                <div
                    className="
          pointer-events-none
          absolute
          -top-40
          -left-32
          h-96
          w-96
          rounded-full
          bg-red-500/10
          blur-3xl
        "
                />

                {/* Close */}
                <button
                    onClick={onClose}
                    className="
          absolute
          right-5
          top-5
          z-20

          flex
          h-11
          w-11
          items-center
          justify-center

          rounded-full
          border
          border-gray-200

          bg-white/80

          shadow-lg

          transition-all
          duration-300

          hover:rotate-90
          hover:bg-red-500
          hover:text-white
        "
                >
                    <X size={20} />
                </button>

                {/* LEFT */}
                <div
                    className="
          relative
          flex
          items-center
          justify-center

          bg-linear-to-br
          from-slate-50
          via-white
          to-red-50

          p-14
        "
                >
                    <div
                        className="
            absolute
            h-72
            w-72
            rounded-full
            bg-red-500/10
            blur-3xl
          "
                    />

                    <span
                        className="
            absolute
            left-8
            top-8

            rounded-full

            bg-red-500

            px-4
            py-2

            text-xs
            font-semibold

            text-white
          "
                    >
                        -15%
                    </span>

                    <Image
                        src={product.thumbnail}
                        alt={product.title}
                        width={420}
                        height={420}
                        className="
            relative

            h-80
            w-80

            object-contain

            drop-shadow-[0_20px_30px_rgba(0,0,0,.18)]

            transition-all
            duration-500

            hover:scale-105
          "
                    />
                </div>

                {/* RIGHT */}
                <div
                    className="
          flex
          flex-col

          p-10
        "
                >

                    <span className="text-red-500 font-semibold uppercase tracking-wider">
                        {product.brand}
                    </span>

                    <h1 className="
text-3xl
font-bold
leading-tight
tracking-tight
">
                        {product.title}
                    </h1>

                    <div className="flex items-center gap-3 mt-5">
                        <div className="flex items-center gap-1">
                            <Star
                                className="fill-yellow-400 text-yellow-400"
                                size={20}
                            />
                            <span className="font-semibold">
                                {product.rating}
                            </span>
                        </div>

                        <span className="text-gray-400">
                            • 245 Reviews
                        </span>

                        <span className="text-green-600 font-medium">
                            In Stock
                        </span>
                    </div>

                    <div className="mt-7 flex items-end gap-3">

                        <span className="
text-5xl
font-black
text-red-500
">
                            ${product.price}
                        </span>

                        <span className="
text-lg
line-through
text-gray-400
">
                            ${(product.price * 1.2).toFixed(0)}
                        </span>

                    </div>

                    <p className="
mt-6
leading-8
text-gray-600
text-[15px]
">
                        {product.description}
                    </p>


                </div>

            </div>
        </div>,
        document.body
    );
}