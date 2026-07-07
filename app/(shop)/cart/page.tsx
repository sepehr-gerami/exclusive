"use client";

import Image from "next/image";
import Link from "next/link";
import { Trash2 } from "lucide-react";
import { useCartStore, useDecreaseQuantity, useIncreaseQuantity } from "@/store/useCart";
import { WormLoader } from "@/components/ui/Emptywithloader";
import useWishlistStore from "@/store/useWishlistStore";
import { Minus, Plus } from "lucide-react";
import { useClearCart } from "@/store/useCart";
export default function CartPage() {
  const hydrated = useWishlistStore((state) => state._hydrated);
  const items = useCartStore((state) => state.items);
  const removeFromCart = useCartStore((state) => state.removeFromCart);
  const increaseQuantity = useIncreaseQuantity();
  const decreaseQuantity = useDecreaseQuantity();
  const clearCart = useClearCart();

  if (!hydrated) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <WormLoader className="w-20 h-20" />
      </div>
    );
  }
  const total = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return (
    <section className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8 lg:py-10">

      {/* Breadcrumb */}
      <div className="flex gap-2 text-sm text-gray-500 mb-8">
        <Link href="/" className="hover:text-red-500 transition">Home</Link>
        <span>/</span>
        <span className="text-black font-medium">Cart</span>
      </div>



      {items.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-24">
          <h2 className="text-2xl font-semibold">Your cart is empty</h2>

          <p className="mt-3 text-gray-500">
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
          {/* Header */}
          <div className="grid grid-cols-4 px-2 py-2.5 rounded-2xl border border-gray-200 shadow-sm lg:grid lg:grid-cols-4 lg:px-8 lg:py-6">
            <span className="font-semibold">Product</span>
            <span className="text-center font-semibold">Price</span>
            <span className="text-center font-semibold">Quantity</span>
            <span className="text-right font-semibold">Total</span>
          </div>

          {/* Items */}
          <div className="mt-4 space-y-4">
            {items.map((item) => (
              <div
                key={item.id}
              className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm grid gap-4 lg:grid-cols-4 lg:items-center lg:px-8 lg:py-5"
              >
                {/* Product */}
                <div className="flex items-center gap-4 p-4 lg:p-0">
                  <Image
                    src={item.thumbnail}
                    alt={item.title}
                    width={80}
                    height={80}
                    className="rounded-lg object-cover"
                  />

                  <h2 className="font-medium">{item.title}</h2>
                </div>

                {/* Price */}
                <div className="px-4 py-2 text-left lg:px-0 lg:text-center">
                  <span className="lg:hidden font-medium">Price : </span>
                  ${item.price}
                </div>

                {/* Quantity */}
                <div className="flex justify-center">
                  <div className="flex items-center overflow-hidden rounded-lg border border-gray-300">
                    <button
                      onClick={() => decreaseQuantity(item.id)}
                      className="flex h-10 w-10 items-center justify-center transition hover:bg-gray-100"
                    >
                      <Minus size={16} />
                    </button>

                    <span className="flex h-10 min-w-12 items-center justify-center border-x border-gray-300 font-medium">
                      {item.quantity}
                    </span>

                    <button
                      onClick={() => increaseQuantity(item.id)}
                      className="flex h-10 w-10 items-center justify-center bg-red-500 text-white transition hover:bg-red-600"
                    >
                      <Plus size={16} />
                    </button>
                  </div>
                </div>

                {/* Total */}
                <div className="flex items-center justify-between px-4 py-4 lg:justify-end lg:gap-6 lg:px-0">
                  <span className="font-semibold">
                    ${(item.price * item.quantity).toFixed(2)}
                  </span>

                  <button
                    onClick={() => removeFromCart(item.id)}
                    className="rounded-full p-2 text-red-500 transition hover:bg-red-50"
                  >
                    <Trash2 size={20} />
                  </button>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-10 flex items-center justify-between">
            <Link
              href="/product"
              className="rounded-md border border-gray-300 bg-white px-8 py-4 text-sm font-medium transition-all duration-200 hover:border-black hover:bg-black hover:text-white"
            >
              Return To Shop
            </Link>

            <button
              onClick={clearCart}
              className="rounded-md border border-gray-300 cursor-pointer bg-white px-8 py-4 text-sm font-medium transition-all duration-200 hover:border-red-500 hover:bg-red-500 hover:text-white"
            >
             ClearCart
            </button>
          </div>

          {/* Summary */}
          <div className="ml-auto mt-10 w-full max-w-md rounded-xl border p-6 shadow-sm">
            <h2 className="mb-6 text-xl font-semibold">
              Order Summary
            </h2>

            <div className="mb-3 flex justify-between">
              <span>Subtotal</span>
              <span>${total.toFixed(2)}</span>
            </div>

            <div className="mb-3 flex justify-between">
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