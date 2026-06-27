"use client";

import { useEffect, useRef, useState } from "react";
import { BiSearch } from "react-icons/bi";
import { FiX } from "react-icons/fi";
import { Product } from "@/types/Product";
import { getProducts } from "@/lib/api/Product";

export default function SearchInput() {
  const [products, setProducts] = useState<Product[]>([]);
  const [query, setQuery] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    getProducts().then(setProducts);
  }, []);

  const results = products.filter((p) =>
    p.title.toLowerCase().includes(query.toLowerCase())
  );

  const clearSearch = () => {
    setQuery("");
    setIsOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div ref={dropdownRef} className="relative w-72">
      {/* INPUT */}
      <div className="relative">
        <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">
          <BiSearch />
        </div>


        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => setIsOpen(true)}
          placeholder="Search products..."
          className="w-full rounded-xl bg-gray-200 py-2 pl-10 pr-10 text-gray-800 outline-none transition focus:bg-white focus:shadow-lg focus:scale-[1.01]"
        />

        {/* ❌ CLEAR BUTTON */}
        {query && (
          <button
            onClick={clearSearch}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-black"
          >
            <FiX />
          </button>
        )}
      </div>

      {/* DROPDOWN */}
      {isOpen && query && (
        <div className="absolute top-full mt-2 w-full rounded-2xl bg-white shadow-lg max-h-80 overflow-y-auto z-50">
          {results.length > 0 ? (
            results.map((product) => (
              <div
                key={product.id}
                className="px-4 py-3 cursor-pointer hover:bg-gray-100"
              >
                {product.title}
              </div>
            ))
          ) : (
            <div className="px-4 py-3 text-gray-500">
              Product not found
            </div>
          )}
        </div>
      )}
    </div>
  );
}