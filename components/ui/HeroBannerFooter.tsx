// app/Components/HeroBanner.tsx
import Image from "next/image";
import Link from "next/link";
import  HeroBannerFooter  from "@/public/HeroBanner/JBL_BOOMBOX_2_HERO_020_x1 (1) 1.svg";
const stats = [
  { value: "10k+", label: "Customers" },
  { value: "6k+",  label: "Products" },
  { value: "9k+",  label: "Reviews" },
  { value: "3k+",  label: "Brands" },
];

export default function HeroBanner() {
  return (
    <div className="relative overflow-hidden rounded-2xl bg-[#111111] min-h-85 flex items-center px-30 py-35">

      {/* subtle radial glow behind product */}
      <div className="pointer-events-none absolute right-0 top-0 h-full w-1/2
                      bg-[radial-gradient(ellipse_at_center,rgba(80,80,80,0.35)_0%,transparent_70%)]" />

      {/* ── Left content ── */}
      <div className="relative z-10 flex-1 max-w-sm">

        <span className="text-green-400 text-xs font-semibold tracking-widest uppercase mb-3 block">
          Categories
        </span>

        <h1 className="text-white text-4xl font-bold leading-tight mb-7">
          Enhance Your <br /> Music Experience
        </h1>

        {/* circular stat badges */}
        <div className="flex gap-3 mb-8">
          {stats.map((s) => (
            <div
              key={s.label}
              className="flex flex-col items-center justify-center
                         w-15.5 h-15.5 rounded-full border border-white/20
                         bg-white/5 backdrop-blur-sm shrink-0"
            >
              <span className="text-white text-[11px] font-bold leading-none">
                {s.value}
              </span>
              <span className="text-white/50 text-[9px] mt-0.5 leading-none">
                {s.label}
              </span>
            </div>
          ))}
        </div>

        <Link
          href="/product"
          className="inline-block bg-green-500 hover:bg-green-400
                     text-white text-sm font-semibold px-8 py-3 rounded-md transition"
        >
          Buy Now
        </Link>
      </div>


      <div className="absolute right-0 top-0 h-full w-[55%] pointer-events-none">
        <Image
          src={HeroBannerFooter}
          alt="Featured product"
          fill
          className="object-contain object-right pr-6"
          priority
        />
      </div>
    </div>
  );
}