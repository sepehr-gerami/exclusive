// app/lib/api/Product.ts

import { Product } from "@/types/Product";

const BASE_URL = "https://dummyjson.com/products";

// ─── Raw shape from dummyjson ─────────────────────────────────────────────
type RawProduct = {
  id: number;
  title: string;
  slug: string;
  price: number;
  discountPercentage: number;
  thumbnail: string;
  images: string[];
  category: string;
  brand: string;
  rating: number;
  stock: number;
  description: string;
  reviews?: { rating: number }[];
  tags?: string[];
};

// ─── Color palette (realistic e-commerce swatches) ───────────────────────
const PALETTE = [
  "#000000", // black
  "#DB4444", // red-500
  "#1A4731", // dark green
  "#E5A000", // gold
  "#1D3461", // navy
  "#FFFFFF", // white
  "#6B7280", // gray
  "#C0392B", // crimson
];

function getColors(id: number): string[] {
  const count = (id % 2) + 2; // 2 or 3 swatches
  return Array.from(
    { length: count },
    (_, i) => PALETTE[(id + i * 3) % PALETTE.length]
  );
}

// ─── Map raw → internal Product ──────────────────────────────────────────
function mapProduct(raw: RawProduct): Product {
  return {
    id: raw.id,
    title: raw.title,
    slug: raw.slug,
    price: raw.price,
    discount: raw.discountPercentage,
    thumbnail: raw.thumbnail,
    images: raw.images,
    category: raw.category,
    brand: raw.brand,
    rating: raw.rating,
    stock: raw.stock,
    description: raw.description,
    reviewCount: raw.reviews?.length ?? Math.floor((raw.id * 17) % 400) + 5,
    colors: getColors(raw.id),
    isNew: raw.stock > 90 || (raw.tags?.includes("new") ?? false),
  };
}

// ─── getProducts ──────────────────────────────────────────────────────────
export async function getProducts(): Promise<Product[]> {
  const categories = [
    "smartphones",
    "laptops",
    "tablets",
    "mobile-accessories",
  ];

  const responses = await Promise.all(
    categories.map(async (category) => {
      const res = await fetch(`${BASE_URL}/category/${category}`, {
        cache: "no-store",
      });
      const data: { products: RawProduct[] } = await res.json();
      return data.products.map(mapProduct);
    })
  );

  return responses.flat();
}

// ─── getProduct (single) ──────────────────────────────────────────────────
export async function getProduct(id: string): Promise<Product | null> {
  const res = await fetch(`${BASE_URL}/${id}`, { cache: "no-store" });
  if (!res.ok) return null;
  const raw: RawProduct = await res.json();
  return mapProduct(raw);
}