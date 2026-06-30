"use client"
import { useEffect, useRef, useState } from "react"
import Image, { StaticImageData } from "next/image"
import { CircleDollarSign, LucideIcon } from "lucide-react"
import ShopIcon from "@/app/assets/icon/icon_shop.svg"
import BagIcon from "@/app/assets/icon/Icon-Shoppingbag.svg"
import MoneyBagIcon from "@/app/assets/icon/Icon-Moneybag.svg"

// ─── Stats data ─────────────────────────────────────────────
const stats = [
    { target: 10.5, decimals: 1, suffix: "k", label: "Sellers active our site", Icon: ShopIcon, isLucide: false },
    { target: 33, decimals: 0, suffix: "k", label: "Monthly Product Sale", Icon: CircleDollarSign, isLucide: true },
    { target: 45.5, decimals: 1, suffix: "k", label: "Customer active our site", Icon: BagIcon, isLucide: false },
    { target: 25, decimals: 0, suffix: "k", label: "Annual gross sale in our site", Icon: MoneyBagIcon, isLucide: false },
]

// ─── Counter hook ───────────────────────────────────────────
function useCountUp(target: number, decimals: number, started: boolean) {
    const [val, setVal] = useState(0)

    useEffect(() => {
        if (!started) return
        const duration = 2000
        let startTime: number | null = null

        const tick = (now: number) => {
            if (!startTime) startTime = now
            const progress = Math.min((now - startTime) / duration, 1)
            const eased = 1 - Math.pow(1 - progress, 3) // ease-out-cubic
            setVal(parseFloat((eased * target).toFixed(decimals)))
            if (progress < 1) requestAnimationFrame(tick)
        }

        requestAnimationFrame(tick)
    }, [started, target, decimals])

    return val
}

// ─── Single stat card ───────────────────────────────────────
function StatCard({
    target, decimals, suffix, label, Icon, isLucide, started,
}: (typeof stats)[0] & { started: boolean }) {
    const count = useCountUp(target, decimals, started)

    return (
        <div
            className="
        group flex flex-col items-center justify-center gap-5 py-10 px-6 rounded-lg border
        bg-white text-black border-gray-200
        transition-all duration-300 cursor-pointer
        hover:-translate-y-1 hover:shadow-lg
        hover:bg-red-500 hover:text-white hover:border-red-500
      "
        >
            {/* Icon circle */}
            <div
                className="
          relative flex items-center justify-center w-16 h-16 rounded-full
          bg-gray-600
          ring-0 ring-white/0
          transition-all duration-300
          group-hover:ring-4 group-hover:ring-white/30
        "
            >
                {isLucide ? (
                    (() => {
                        const LucideComp = Icon as LucideIcon
                        return <LucideComp color="#ffffff" strokeWidth={1.5} absoluteStrokeWidth size={28} />
                    })()
                ) : (
                    <Image
                        src={Icon as StaticImageData}
                        alt={label}
                        className="w-7 h-7 filter-[brightness(0)_invert(1)]"
                    />
                )}
            </div>

            {/* Number */}
            <div className="text-center">
                <p className="text-3xl font-bold tracking-tight">
                    {count.toFixed(decimals)}{suffix}
                </p>
                <p className="text-sm mt-1.5 text-gray-500 transition-colors duration-300 group-hover:text-white/85">
                    {label}
                </p>
            </div>
        </div>
    )
}

// ─── Main export ────────────────────────────────────────────
export default function StatsSection() {
    const ref = useRef<HTMLDivElement>(null)
    const [started, setStarted] = useState(false)

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setStarted(true)
                    observer.disconnect()
                }
            },
            { threshold: 0.25 }
        )
        if (ref.current) observer.observe(ref.current)
        return () => observer.disconnect()
    }, [])

    return (
        <div ref={ref} className="grid grid-cols-4 gap-4 mt-20 px-20">
            {stats.map((s, i) => (
                <StatCard key={i} {...s} started={started} />
            ))}
        </div>
    )
}