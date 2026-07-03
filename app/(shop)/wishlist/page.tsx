"use client";
import React from "react";
import useWishlistStore from "@/store/useWishlistStore";
import Image from "next/image";
import Link from "next/link";

export default function WishlistPage() {
  const items = useWishlistStore((s) => s.items);

  if (items.length === 0) {
    return (
      <section className="max-w-6xl mx-auto px-6 py-10">
        <h1 className="text-3xl font-bold mb-4">Your Wishlist</h1>
        <p className="text-gray-500">You haven&apos;t added any items to your wishlist yet.</p>
        <div className="mt-8">
          <Link href="/product" className="rounded-md bg-red-500 px-6 py-3 text-white">Browse Products</Link>
        </div>
      </section>
    );
  }

  return (
    <section className="max-w-6xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Your Wishlist</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {items.map((p) => (
          <div key={p.id} className="border rounded-lg overflow-hidden shadow-sm">
            <div className="h-48 relative">
              <Image src={p.thumbnail} alt={p.title} fill className="object-cover" />
            </div>
            <div className="p-4">
              <h2 className="font-semibold">{p.title}</h2>
              <p className="text-sm text-gray-500">${p.price}</p>
              <div className="mt-3 flex items-center gap-3">
                <Link href={`/product/${p.id}`} className="text-sm text-red-500 underline">View</Link>
                <button className="text-sm text-gray-600">Remove</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
