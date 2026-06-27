import {
  Smartphone,
  Monitor,
  Watch,
  Headphones,
  Camera,
  Gamepad2,

} from "lucide-react";

import { Category } from "@/types/Categorie";

export const categories: Category[] = [
  {
    id: 1,
    name: "Phones",
    slug: "phones",
    apiCategory: "smartphones",
    icon: Smartphone,
  },
  {
    id: 2,
    name: "laptops",
    slug: "laptops",
    apiCategory: "laptops",
    icon: Monitor,
  },
  {
    id: 3,
    name: "Smart Watch",
    slug: "smart-watch",
    apiCategory: "tablets",
    icon: Watch,
  },
  {
    id: 4,
    name: "Headphones",
    slug: "headphones",
    apiCategory: "mobile-accessories",
    icon: Headphones,
  },
  {
    id: 5,
    name: "Camera",
    slug: "camera",
    apiCategory: "camera",
    icon: Camera,
  },
  {
    id: 6,
    name: "Gaming",
    slug: "gaming",
    apiCategory: "gaming",
    icon: Gamepad2,
  },
];