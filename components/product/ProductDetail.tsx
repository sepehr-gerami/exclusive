import { Heart, ShoppingCart } from "lucide-react";
import { getProduct } from "@/lib/api/Product";
import Image from "next/image"
import Link from "next/link";

export default async function ProductDetail({ id }: { id: string }) {
  const product = await getProduct(id);

  if (!product) {
    return (
      <div className="flex flex-col items-center justify-center py-24 gap-3">
        <h2 className="text-2xl font-semibold text-gray-700">
          Product not found
        </h2>
        <Link href="/Account" className="text-sm text-red-500 hover:underline">
          Back to products
        </Link>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
      {/* IMAGE */}
      <div className="relative h-105 rounded-xl bg-[#F5F5F5]">
        <Image
          src={product.thumbnail}
          alt={product.title}
          fill
          className="object-contain p-6"
          priority
        />
      </div>

      {/* INFO */}
      <div className="flex flex-col gap-4">
        <h1 className="text-3xl font-bold">{product.title}</h1>

        {/* Rating */}
        <div className="flex items-center gap-1">
          {Array.from({ length: 5 }).map((_, i) => (
            <span
              key={i}
              className={
                i < Math.round(product.rating)
                  ? "text-yellow-400 text-lg"
                  : "text-gray-300 text-lg"
              }
            >
              ★
            </span>
          ))}
          <span className="text-sm text-gray-400 ml-1">
            ({product.rating})
          </span>
        </div>

        {/* Price */}
        <div className="flex items-center gap-3">
          <span className="text-2xl font-bold text-red-500">
            ${product.price}
          </span>
          {product.discount > 0 && (
            <span className="text-sm text-gray-400 line-through">
              $
              {(
                product.price /
                (1 - product.discount / 100)
              ).toFixed(2)}
            </span>
          )}
        </div>

        <hr className="border-gray-200" />

        {/* Description */}
        <p className="text-gray-600 text-sm leading-relaxed">
          {product.description}
        </p>

        {/* Stock */}
        <p className="text-sm">
          <span className="font-medium">Stock: </span>
          <span
            className={
              product.stock > 10 ? "text-green-500" : "text-orange-500"
            }
          >
            {product.stock > 0 ? `${product.stock} available` : "Out of stock"}
          </span>
        </p>

        {/* Actions */}
        <div className="flex items-center gap-3 mt-2">
          <button
            disabled={product.stock === 0}
            className="flex items-center gap-2 bg-red-500 hover:bg-red-600 disabled:opacity-50 text-white px-6 py-3 rounded-lg font-medium transition"
          >
            <ShoppingCart size={18} />
            Add to Cart
          </button>

          <button className="w-12 h-12 border border-gray-200 rounded-lg flex items-center justify-center hover:border-red-400 hover:text-red-500 transition">
            <Heart size={18} />
          </button>
        </div>
      </div>
    </div>
  );
}
