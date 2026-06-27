import FlashSales from "./FlashSales";
import { getProducts } from "@/lib/api/Product";

export default async function FlashSalesServer() {
  const products = await getProducts();

  return <FlashSales products={products} />;
}