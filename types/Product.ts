// app/types/Product.ts

export type Product = {
  id: number;
  title: string;
  slug: string;
  price: number;
  discount: number;
  thumbnail: string;
  images: string[];
  category: string;
  brand: string;
  rating: number;
  stock: number;
  description: string;
  reviewCount: number;
  colors: string[];
  isNew: boolean;
};