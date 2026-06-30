"use client"
import Link from "next/link";
import { SendHorizontal } from 'lucide-react';
import { FaTwitter, FaInstagram, FaLinkedinIn, FaFacebook, FaGooglePlay, FaApple } from "react-icons/fa";
import Image from "next/image";
import { useState } from "react";
import Alert from "../ui/Alert";

type FieldKey = "email";
interface AlertProps {
  show: boolean
  onClose: () => void
  duration?: number
}
const rules: Record<
  FieldKey,
  {
    validate: (v: string) => boolean;
    empty: string;
    error: string;
    ok: string;
  }
> = {
  email: {
    validate: (v) => /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v.trim()),
    empty: "Email is required",
    error: "Please enter a valid email (e.g. name@example.com)",
    ok: "Valid email ✓",
  },
};
const sections = [
  {
    title: "Support",
    links: [
      { label: "111 Bijoy sarani, Dhaka, DH 1515, Bangladesh.", href: "#" },
      { label: "exclusive@gmail.com", href: "mailto:exclusive@gmail.com" },
      { label: "+88015-88888-9999", href: "tel:+8801588888999" },
    ],
  },
  {
    title: "Account",
    links: [
      { label: "My Account", href: "/account" },
      { label: "Login / Register", href: "/login" },
      { label: "Cart", href: "/cart" },
      { label: "Wishlist", href: "/wishlist" },
      { label: "Shop", href: "/product" },
    ],
  },
  {
    title: "Quick Link",
    links: [
      { label: "Privacy Policy", href: "/privacy" },
      { label: "Terms Of Use", href: "/terms" },
      { label: "FAQ", href: "/faq" },
      { label: "Contact", href: "/contact" },
    ],
  },
];

const socials = [
  { icon: <FaFacebook size={18} />, href: "#" },
  { icon: <FaTwitter size={18} />, href: "#" },
  { icon: <FaInstagram size={18} />, href: "#" },
  { icon: <FaLinkedinIn size={18} />, href: "#" },
];

export default function Footer() {
  const [email, setEmail] = useState("");
  const [showAlert, setShowAlert] = useState(false);
  const [alertType, setAlertType] = useState<"success" | "warn">("success");
  const [alertTitle, setAlertTitle] = useState("");
  const [alertSub, setAlertSub] = useState("");

  const handleSubscribe = () => {
    const value = email.trim();

    if (!value) {
      setAlertType("warn");
      setAlertTitle("Email is empty");
      setAlertSub("Email is required");
      setShowAlert(true);
      return;
    }

    if (!rules.email.validate(value)) {
      setAlertType("warn");
      setAlertTitle("Invalid email");
      setAlertSub("Please enter a valid email (e.g. name@example.com)");
      setShowAlert(true);
      return;
    }

    setAlertType("success");
    setAlertTitle("Subscribed");
    setAlertSub("Thanks for subscribing to our newsletter");
    setShowAlert(true);

    setEmail("");
  };
  return (
    <footer className="bg-[#1a1a1a] text-gray-300 mt-20">
      <div className="container mx-auto px-6 py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-10">

          {/* ── Exclusive + Subscribe ── */}
          <div className="flex flex-col gap-4">
            <h2 className="text-white text-xl font-bold">Exclusive</h2>
            <div>
              <p className="text-white font-semibold mb-1">Subscribe</p>
              <p className="text-sm text-gray-400">Get 10% off your first order</p>
            </div>

            {/* Email input */}
            <div className="flex items-center border border-gray-500 rounded-md overflow-hidden mt-1">
              <div className="flex items-center border border-gray-500 rounded-md overflow-hidden focus-within:border-blue-400 transition-colors">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                  }}
                  placeholder="Enter your email"
                  className="bg-transparent text-sm text-gray-300 placeholder-gray-500 px-3 py-2 flex-1 outline-none"
                />
              </div>


              <button
                type="button"
                onClick={handleSubscribe}
                className="px-1 py- text-white cursor-pointer hover:text-red-400 transition">
                <SendHorizontal size={18} />
              </button>
            </div>
          </div>

          {/* ── Dynamic sections ── */}
          {sections.map((section) => (
            <div key={section.title} className="flex flex-col gap-3">
              <h3 className="text-white font-semibold">{section.title}</h3>
              <ul className="flex flex-col gap-2">
                {section.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-sm text-gray-400 hover:text-white transition leading-relaxed"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* ── Download App ── */}
          <div className="flex flex-col gap-4">
            <h3 className="text-white font-semibold">Download App</h3>
            <p className="text-xs text-gray-500">Save $3 with App New User Only</p>

            {/* QR + store buttons */}
            <div className="flex items-center gap-3">
              {/* QR placeholder */}
              <div className="w-16 h-16 bg-white rounded flex items-center justify-center shrink-0">
                <Image
                  src="/qrCode/Qrcode1.png"
                  alt="QR Code"
                  width={64}
                  height={64}
                />
              </div>

              <div className="flex flex-col gap-2">
                <Link
                  href="#"
                  className="flex items-center gap-1.5 border border-gray-500 rounded px-2 py-1 hover:border-white transition"
                >
                  <FaGooglePlay />
                  <span className="text-[10px] leading-tight text-gray-300">
                    GET IT ON<br />
                    <span className="font-semibold text-white text-xs">Google Play</span>
                  </span>
                </Link>
                <Link
                  href="#"
                  className="flex items-center gap-1.5 border border-gray-500 rounded px-2 py-1 hover:border-white transition"
                >
                  <FaApple />
                  <span className="text-[10px] leading-tight text-gray-300">
                    Download on the<br />
                    <span className="font-semibold text-white text-xs">App Store</span>
                  </span>
                </Link>
              </div>
            </div>

            {/* Socials */}
            <div className="flex items-center gap-4 mt-2">
              {socials.map((s, i) => (
                <Link
                  key={i}
                  href={s.href}
                  className="text-gray-400 hover:text-white transition"
                >
                  {s.icon}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ── Bottom bar ── */}
      <div className="border-t border-gray-700 py-5 text-center text-xs text-gray-500">
        © Copyright Rimel 2022. All right reserved
      </div>
      <Alert
        show={showAlert}
        onClose={() => setShowAlert(false)}
        title={alertTitle}
        sub={alertSub}
      />
    </footer>
  );
}


