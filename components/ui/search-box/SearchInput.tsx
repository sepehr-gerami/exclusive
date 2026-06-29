"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { BiSearch } from "react-icons/bi";
import { FiX } from "react-icons/fi";
import { Product } from "@/types/Product";
import { getProducts } from "@/lib/api/Product";
import styles from "@/components/ui/search-box/search-box.module.css";

export default function SearchInput() {
  const [products, setProducts] = useState<Product[]>([]);
  const [query, setQuery] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    getProducts().then(setProducts);
  }, []);

  const results = products
    .filter((p) => p.title.toLowerCase().includes(query.toLowerCase()))
    .slice(0, 8);

  const clearSearch = () => {
    setQuery("");
    setIsOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div ref={dropdownRef} className={styles.wrapper}>
      {/* INPUT */}
      <div className={styles.shell}>
        <span className={styles.iconLeft}>
          <BiSearch />
        </span>

        <input
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setIsOpen(true);
          }}
          onFocus={() => setIsOpen(true)}
          placeholder="Search products..."
          className={styles.input}
        />

        {query && (
          <button onClick={clearSearch} className={styles.clearBtn}>
            <FiX />
          </button>
        )}
      </div>

      {/* DROPDOWN */}
      {isOpen && query && (
        <div className={styles.dropdown}>
          {results.length > 0 ? (
            results.map((product) => (
              <Link
                key={product.id}
                href={`/product/${product.id}`}
                onClick={clearSearch}
                className={styles.item}
              >
                <Image
                  src={product.thumbnail}
                  alt={product.title}
                  width={38}
                  height={38}
                  className={styles.thumb}
                />
                <div className={styles.itemInfo}>
                  <span className={styles.itemTitle}>{product.title}</span>
                  <span className={styles.itemPrice}>${product.price}</span>
                </div>
              </Link>
            ))
          ) : (
            <div className={styles.empty}>
              No results for &ldquo;{query}&rdquo;
            </div>
          )}
        </div>
      )}
    </div>
  );
}