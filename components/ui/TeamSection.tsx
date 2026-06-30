import React from 'react'
import Image, { StaticImageData } from 'next/image'
import User_1 from "@/app/assets/user/image 47.svg"
import User_2 from "@/app/assets/user/image46.svg"
import User_3 from "@/app/assets/user/image51.svg"

// ─── Inline brand icons (lucide-react removed these in v1) ──
function TwitterIcon(props: React.SVGProps<SVGSVGElement>) {
    return (
        <svg viewBox="0 0 24 24" width={16} height={16} fill="currentColor" {...props}>
            <path d="M23.643 4.937c-.835.37-1.732.62-2.675.733.962-.576 1.7-1.49 2.048-2.578-.9.534-1.897.922-2.958 1.13-.85-.904-2.06-1.47-3.4-1.47-2.572 0-4.658 2.086-4.658 4.66 0 .364.042.718.12 1.06-3.873-.195-7.304-2.05-9.602-4.868-.4.69-.63 1.49-.63 2.342 0 1.616.823 3.043 2.072 3.878-.764-.025-1.482-.234-2.11-.583v.06c0 2.257 1.605 4.14 3.737 4.568-.392.106-.803.162-1.227.162-.3 0-.593-.028-.877-.082.593 1.85 2.313 3.198 4.352 3.234-1.595 1.25-3.604 1.995-5.786 1.995-.376 0-.747-.022-1.112-.065 2.062 1.323 4.51 2.093 7.14 2.093 8.57 0 13.255-7.098 13.255-13.254 0-.2-.005-.402-.014-.602.91-.658 1.7-1.477 2.323-2.41z" />
        </svg>
    )
}

function InstagramIcon(props: React.SVGProps<SVGSVGElement>) {
    return (
        <svg viewBox="0 0 24 24" width={16} height={16} fill="none" stroke="currentColor" strokeWidth={1.8} {...props}>
            <rect x="2.5" y="2.5" width="19" height="19" rx="5" />
            <circle cx="12" cy="12" r="4.5" />
            <circle cx="17.4" cy="6.6" r="1.1" fill="currentColor" stroke="none" />
        </svg>
    )
}

function LinkedinIcon(props: React.SVGProps<SVGSVGElement>) {
    return (
        <svg viewBox="0 0 24 24" width={16} height={16} fill="currentColor" {...props}>
            <path d="M20.45 20.45h-3.56v-5.57c0-1.33-.02-3.04-1.85-3.04-1.86 0-2.14 1.45-2.14 2.94v5.67H9.34V9h3.42v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28zM5.34 7.43a2.07 2.07 0 1 1 0-4.14 2.07 2.07 0 0 1 0 4.14zM7.12 20.45H3.56V9h3.56v11.45z" />
        </svg>
    )
}

interface User {
    image?: StaticImageData | string
    title: string
    Subtitle: string
}

const users: User[] = [
    { title: "Tom Cruise", Subtitle: "Founder & Chairman", image: User_1 },
    { title: "Emma Watson", Subtitle: "Managing Director", image: User_2 },
    { title: "Will Smith", Subtitle: "Product Designer", image: User_3 },
]

export default function TeamSection() {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 px-6 py-16 max-w-6xl mx-auto">
            {users.map((user) => (
                <div key={user.title} className="group flex flex-col">
                    {/* Photo */}
                    <div className="relative w-full aspect-4/5 bg-gray-100 overflow-hidden">
                        {user.image && (
                            <Image
                                src={user.image}
                                alt={user.title}
                                fill
                                sizes="(max-width: 768px) 100vw, 33vw"
                                className="object-cover object-top transition-all duration-700 ease-out scale-100 brightness-95 group-hover:scale-110 group-hover:brightness-100"
                            />
                        )}
                    </div>

                    {/* Name & role */}
                    <div className="mt-4">
                        <h3 className="text-lg font-bold text-gray-900">{user.title}</h3>
                        <p className="text-sm text-gray-500 mt-0.5">{user.Subtitle}</p>
                    </div>

                    {/* Socials */}
                    <div className="flex items-center gap-3 mt-3 text-gray-700">
                        <a href="#" aria-label={`${user.title} Twitter`} className="hover:text-cyan-500 transition-colors">
                            <TwitterIcon />
                        </a>
                        <a href="#" aria-label={`${user.title} Instagram`} className="hover:text-pink-500 transition-colors">
                            <InstagramIcon />
                        </a>
                        <a href="#" aria-label={`${user.title} LinkedIn`} className="hover:text-sky-600 transition-colors">
                            <LinkedinIcon />
                        </a>
                    </div>
                </div>
            ))}
        </div>
    )
}