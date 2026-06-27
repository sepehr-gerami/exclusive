"use client";

import Link from "next/link";
import { Category } from "@/types/Categorie";

interface Props {
    category: Category;
}

export default function CategoryCard({ category }: Props) {
    const Icon = category.icon;

    return (
        <Link
           href={`/product?category=${category.apiCategory}`}
            className="
group
flex
h-40
w-full
flex-col
items-center
justify-center
gap-4
rounded-lg
border
border-gray-300
bg-white
transition-all
duration-300
hover:-translate-y-1
hover:border-red-500
hover:bg-red-500
hover:shadow-xl
"
        >
            <Icon
                size={42}
                strokeWidth={1.8}
                className="transition-colors duration-300 group-hover:text-white"
            />
            <span className="text-sm font-medium transition-colors duration-300 group-hover:text-white">
                {category.name}
            </span>
        </Link>
    );
}