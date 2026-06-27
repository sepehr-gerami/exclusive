import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { CATEGORIES } from "../../constants/categories";

export default function CategorySidebar() {
  return (
    <aside className="w-54 border-r border-gray-200 py-8 flex flex-col">
      {/* Label */}
      <p className="px-6 mb-4 text-[10px] font-bold tracking-[0.18em] text-gray-400 uppercase select-none">
        Categories
      </p>

      {/* List */}
      <ul className="flex flex-col">
        {CATEGORIES.map((category) => (
          <li key={category.apiCategory} className="group relative">
            {/* Hover Background */}
            <span
              className="
                absolute inset-y-0 left-0 w-0
                bg-gray-100
                transition-all duration-200
                group-hover:w-full
              "
            />

            {/* Active Bar */}
            <span
              className="
                absolute left-0 top-1/2 -translate-y-1/2
                w-0.5 h-0 bg-red-500 rounded-full
                transition-all duration-200
                group-hover:h-5
              "
            />

            <Link
              href={`/product?category=${category.apiCategory}`}
              className="
                relative flex items-center justify-between
                px-6 py-3
                text-sm font-medium text-gray-600
                transition-all duration-200
                group-hover:text-black
                group-hover:pl-8
              "
            >
              <span>{category.title}</span>

              <ChevronRight
                size={14}
                className="
                  shrink-0 text-gray-400
                  transition-all duration-200
                  group-hover:text-red-500
                  group-hover:translate-x-1
                "
              />
            </Link>
          </li>
        ))}
      </ul>

      {/* Footer */}
      <div className="mt-auto mx-6 pt-6 border-t border-gray-200">
        <Link     
          href="/product"
          className="
            text-xs font-medium text-gray-400
            hover:text-gray-700
            transition-colors
          "
        >
          View all categories →
        </Link>
      </div>
    </aside>
  );
}