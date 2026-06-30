import ps5 from '@/public/category/ps5-slim-goedkope-playstation_large 1.png'
import attractive from "@/public/category/attractive-woman-wearing-hat-posing-black-background 1.png";
import Link from "next/link";
import Image, { StaticImageData } from "next/image";

type Item = {
  id: number;
  title: string;
  description: string;
  href: string;
  image: StaticImageData | string;  
  size: "large" | "medium" | "small";
};

const items: Item[] = [
  {
    id: 1,
    title: "PlayStation 5",
    description: "Black and White version of the PS5 coming out on sale.",
    href: "/product?category=gaming",
    image: ps5,
    size: "large",
  },
  {
    id: 2,
    title: "Women's Collections",
    description: "Featured woman collections that give you another vibe.",
    href: "/product?category=womens",
    image: attractive,
    size: "medium",
  },
  {
    id: 3,
    title: "Speakers",
    description: "Amazon wireless speakers",
    href: "/product?category=speakers",
    image: "/category/Frame%20707.svg",                        
    size: "small",
  },
  {
    id: 4,
    title: "Perfume",
    description: "GUCCI INTENSE OUD EDP",
    href: "/product?category=perfume",
    image: "/category/652e82cd70aa6522dd785109a455904c.svg",   
    size: "small",
  },
];

export default function NewArrivals() {
  return (
    <section className="container mx-auto px-4 py-10">
      <div className="flex items-center gap-3 mb-2">
        <span className="w-4 h-8 bg-red-500 rounded-sm" />
        <span className="text-red-500 font-semibold text-sm">Featured</span>
      </div>
      <h2 className="mt-4 mb-8 font-bold text-3xl">New Arrival</h2>

      <div className="grid grid-cols-2 grid-rows-2 gap-4 h-150">
        <BentoCard item={items[0]} className="row-span-2" />
        <BentoCard item={items[1]} />
        <div className="grid grid-cols-2 gap-4">
          <BentoCard item={items[2]} />
          <BentoCard item={items[3]} />
        </div>
      </div>
    </section>
  );
}

function BentoCard({ item, className = "" }: { item: Item; className?: string }) {
  const isSvg =
    typeof item.image === "string" && item.image.endsWith(".svg");

  return (
    <div className={`relative overflow-hidden rounded-xl bg-[#131313] group ${className}`}>
      <Image
        src={item.image}
        alt={item.title}
        fill
        unoptimized={isSvg}
        className="object-cover opacity-80 transition-transform duration-500 group-hover:scale-105"
      />
      <div className="absolute inset-0 bg-linear-to-t from-black/70 via-transparent to-transparent" />
      <div className="absolute bottom-6 left-6 text-white z-10">
        <h3 className="text-xl font-bold leading-tight">{item.title}</h3>
        <p className="text-sm text-gray-300 mt-1 max-w-45">{item.description}</p>
        <Link
          href={item.href}
          className="inline-block mt-3 text-sm font-semibold underline underline-offset-4 hover:text-red-400 transition"
        >
          Shop Now
        </Link>
      </div>
    </div>
  );
}