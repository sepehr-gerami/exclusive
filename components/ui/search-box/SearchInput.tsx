/* eslint-disable react-hooks/set-state-in-effect */
"use client";


import { useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { Loader2, Search, X } from "lucide-react";
import { Product } from "@/types/Product";
import { useSearchUIStore } from "@/store/useSearchUIStore";
import { getProducts } from "@/lib/api/Product";


interface SearchInputProps {
  instanceId?: "mobile" | "desktop";
}

export default function SearchInput({ instanceId }: SearchInputProps) {

  const mobileOpenSignal = useSearchUIStore((state) => state.mobileOpenSignal);
  const setMobileSearchActive = useSearchUIStore((state) => state.setMobileSearchActive);
  const [loading, setLoading] = useState(false);
  const [products, setProducts] = useState<Product[]>([]);
  const [query, setQuery] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (instanceId !== "mobile" || mobileOpenSignal === 0) return;

    window.scrollTo({ top: 0, behavior: "smooth" });
    const id = setTimeout(() => inputRef.current?.focus(), 350);

    return () => clearTimeout(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mobileOpenSignal, instanceId]);

  useEffect(() => {
    getProducts().then(setProducts);
  }, []);

  useEffect(() => {
    if (!query.trim()) {
      setLoading(false);
      return;
    }

    setLoading(true);

    const timer = setTimeout(() => {
      setLoading(false);
    }, 550);

    return () => clearTimeout(timer);
  }, [query]);

  useEffect(() => {
    const click = (e: MouseEvent) => {
      if (
        wrapperRef.current &&
        !wrapperRef.current.contains(e.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", click);

    return () => {
      document.removeEventListener("mousedown", click);
    };
  }, [query]);

  useEffect(() => {
    const esc = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setIsOpen(false);
      }
    };

    window.addEventListener("keydown", esc);

    return () => {
      window.removeEventListener("keydown", esc);
    };
  }, []);

  const results = useMemo(() => {
    return products
      .filter((item) =>
        item.title.toLowerCase().includes(query.toLowerCase())
      )
      .slice(0, 8);
  }, [products, query]);

  const clearSearch = () => {
    setQuery("");
    setLoading(false);
    setIsOpen(false);

    inputRef.current?.focus();
  };
  return (
    <div ref={wrapperRef} className="relative max-w-fit">
      <div className="relative">
        <div className="absolute left-3 top-1/2 -translate-y-1/2">
          {loading ? (
            <Loader2
              size={18}
              className="animate-spin text-red-500"
            />
          ) : (
            <Search
              size={18}
              className="text-gray-800"
            />
          )}
        </div>

        <input
          ref={inputRef}
          value={query}
          onFocus={() => {
            setIsOpen(true);
            if (instanceId === "mobile") setMobileSearchActive(true);
          }}
          onBlur={() => {
            if (instanceId === "mobile") setMobileSearchActive(false);
          }}
          onChange={(e) => {
            setQuery(e.target.value);
            setIsOpen(true);
          }}
          placeholder="Search products..."
          className="
    h-11
    w-full
  rounded-full
    border
    border-gray-200
    bg-white
    pl-11
    pr-10
    text-sm
    outline-none
    transition
    focus:border-red-500
  "
        />





        {query && (
          <button
            onClick={clearSearch}
            className="absolute right-3 top-1/2 -translate-y-1/2"
          >
            <X size={18} />
          </button>
        )}
      </div>

      <AnimatePresence>
        {isOpen && query && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            className="
    absolute
    top-full
    mt-5
    z-50
    w-65
    -left-1/3
    
    overflow-hidden
    rounded-md
  bg-black/40
  backdrop-blur-xl
  shadow-2xl
    max-h-80
    overflow-y-auto
  "
          >
            {results.length ? (
              results.map((product) => (
                <Link
                  key={product.id}
                  href={`/product/${product.id}`}
                  onClick={() => {
                    setIsOpen(false);
                    setQuery("");
                  }}
                  className="flex items-center gap-3 p-3 hover:bg-gray-50"
                >
                  <Image
                    src={product.thumbnail}
                    alt={product.title}
                    width={40}
                    height={40}
                    className="rounded-md  object-contain"
                  />

                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm text-white font-medium">
                      {product.title}
                    </p>
                    <span className="text-xs text-red-500">
                      ${product.price}
                    </span>
                  </div>
                </Link>
              ))
            ) : (
              <div className="p-4 text-center text-sm text-gray-400">
                No results found
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}