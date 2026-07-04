"use client";

import Image from "next/image";
import Link from "next/link";
import { Trash2 } from "lucide-react";
import { useCartStore } from "@/store/useCart";

export default function CartPage() {
  const items = useCartStore((state) => state.items);
  const removeFromCart = useCartStore((state) => state.removeFromCart);

  const total = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return (
    <section className="max-w-7xl mx-auto px-6 py-10">

      {/* Breadcrumb */}
      <div className="flex gap-2 text-sm text-gray-500 mb-8">
        <Link href="/">Home</Link>
        <span>/</span>
        <span className="text-black font-medium">Cart</span>
      </div>

      <h1 className="text-3xl font-bold mb-8">
        Shopping Cart
      </h1>

      {items.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-24">
          <h2 className="text-2xl font-semibold">
            Your cart is empty
          </h2>

          <p className="text-gray-500 mt-3">
            Add products to your shopping cart.
          </p>

          <Link
            href="/product"
            className="mt-8 rounded-md bg-red-500 px-6 py-3 text-white transition hover:bg-red-600"
          >
            Continue Shopping
          </Link>
        </div>
      ) : (
        <>
          <div className="space-y-6">
            {items.map((item) => (
              <div
                key={item.id}
                className="flex flex-col gap-5 rounded-xl border p-5 shadow-sm lg:flex-row lg:items-center lg:justify-between"
              >
                <div className="flex items-center gap-5">

                  <Image
                    src={item.thumbnail}
                    alt={item.title}
                    width={100}
                    height={100}
                    className="rounded-lg object-cover"
                  />

                  <div>
                    <h2 className="font-semibold text-lg">
                      {item.title}
                    </h2>

                    <p className="text-gray-500">
                      ${item.price}
                    </p>

                    <p className="text-sm mt-2">
                      Quantity :
                      <span className="font-semibold ml-2">
                        {item.quantity}
                      </span>
                    </p>
                  </div>
                </div>

                <div className="flex flex-col gap-4 items-start lg:flex-row lg:items-center lg:gap-8">

                  <h3 className="font-bold text-lg">
                    $
                    {(item.price * item.quantity).toFixed(2)}
                  </h3>

                  <button
                    onClick={() => removeFromCart(item.id)}
                    className="rounded-lg p-2 text-red-500 transition hover:bg-red-50"
                  >
                    <Trash2 size={22} />
                  </button>

                </div>
              </div>
            ))}
          </div>

          {/* Summary */}

          <div className="mt-10 w-full max-w-md rounded-xl border p-6 shadow-sm">

            <h2 className="text-xl font-semibold mb-6">
              Order Summary
            </h2>

            <div className="flex justify-between mb-3">
              <span>Subtotal</span>
              <span>${total.toFixed(2)}</span>
            </div>

            <div className="flex justify-between mb-3">
              <span>Shipping</span>
              <span>Free</span>
            </div>

            <hr className="my-5" />

            <div className="flex justify-between text-xl font-bold">
              <span>Total</span>
              <span>${total.toFixed(2)}</span>
            </div>

            <Link
              href="/checkout"
              className="mt-6 flex justify-center rounded-md bg-red-500 py-3 font-medium text-white transition hover:bg-red-600"
            >
              Proceed to Checkout
            </Link>

          </div>
        </>
      )}
    </section>
  );
}