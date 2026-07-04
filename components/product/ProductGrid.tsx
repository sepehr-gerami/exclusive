import ProductCard from "@/features/best-selling/ProductCard";
import { getProducts } from "@/lib/api/Product";


export async function ProductGrid({ category }: { category?: string }) {
  const products = await getProducts();

  const filtered = category
    ? products.filter((p) => p.category === category)
    : products;

  if (filtered.length === 0) {
    return (
      <div className="col-span-full flex flex-col items-center justify-center py-16 sm:py-20">
        <h2 className="text-lg sm:text-2xl font-semibold text-gray-700">
          No products found
        </h2>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-2 sm:gap-3 md:gap-4 lg:gap-6">
      {filtered.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}