import { LucideIcon } from "lucide-react";

export interface Category {
  id: number;
  name: string;
  slug: string;
  icon: LucideIcon;
  apiCategory: string;
}