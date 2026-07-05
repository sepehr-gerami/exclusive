"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { SendHorizontal } from "lucide-react";
import {
  FaTwitter,
  FaInstagram,
  FaLinkedinIn,
  FaFacebook,
  FaGooglePlay,
  FaApple,
} from "react-icons/fa";

import Alert from "../ui/alert/Alert";

type FieldKey = "email";

const rules: Record<
  FieldKey,
  {
    validate: (v: string) => boolean;
    empty: string;
    error: string;
  }
> = {
  email: {
    validate: (v) =>
      /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v.trim()),
    empty: "Email is required",
    error: "Please enter a valid email (e.g. name@example.com)",
  },
};

const sections = [
  {
    title: "Support",
    links: [
      {
        label: "111 Bijoy sarani, Dhaka, DH 1515, Bangladesh.",
        href: "#",
      },
      {
        label: "exclusive@gmail.com",
        href: "mailto:exclusive@gmail.com",
      },
      {
        label: "+88015-88888-9999",
        href: "tel:+8801588888999",
      },
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

const [alertType, setAlertType] = useState<
  "success" | "error" | "warning" | "info"
>("success");

  const [alertTitle, setAlertTitle] = useState("");

  const [alertSub, setAlertSub] = useState("");

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();

    const value = email.trim();

    if (!value) {
      setAlertType("warning");
      setAlertTitle("Email is empty");
      setAlertSub(rules.email.empty);
      setShowAlert(true);
      return;
    }

    if (!rules.email.validate(value)) {
      setAlertType("warning");
      setAlertTitle("Invalid email");
      setAlertSub(rules.email.error);
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
    <>
      <footer className="mt-16 bg-[#1a1a1a] text-gray-300 sm:mt-20">
        <div className="container mx-auto px-4 py-8 sm:px-6 sm:py-16">
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 lg:gap-10">

            {/* Exclusive */}
            <div className="flex flex-col gap-4">
              <h2 className="text-xl font-bold text-white">
                Exclusive
              </h2>

              <div>
                <p className="mb-1 font-semibold text-white">
                  Subscribe
                </p>

                <p className="text-sm text-gray-400">
                  Get 10% off your first order
                </p>
              </div>

              <form
                onSubmit={handleSubscribe}
                className="w-full max-w-sm"
              >
                <div className="flex items-center overflow-hidden rounded-md border border-gray-500 transition-colors focus-within:border-blue-400">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) =>
                      setEmail(e.target.value)
                    }
                    placeholder="Enter your email"
                    className="flex-1 bg-transparent px-3 py-2 text-sm text-gray-300 placeholder-gray-500 outline-none"
                  />

                  <button
                    type="submit"
                    className="cursor-pointer px-3 py-2 text-white transition hover:text-red-400"
                  >
                    <SendHorizontal size={18} />
                  </button>
                </div>
              </form>
            </div>

            {/* Dynamic Sections */}
            {sections.map((section) => (
              <div
                key={section.title}
                className="flex flex-col gap-3"
              >
                <h3 className="font-semibold text-white">
                  {section.title}
                </h3>

                <ul className="flex flex-col gap-2">
                  {section.links.map((link) => (
                    <li key={link.label}>
                      <Link
                        href={link.href}
                        className="text-sm text-gray-400 transition hover:text-white"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}

            {/* Download */}
            <div className="flex flex-col gap-4">
              <h3 className="font-semibold text-white">
                Download App
              </h3>

              <p className="text-sm text-gray-500">
                Save $3 with App New User Only
              </p>

              <div className="flex items-center gap-3">
                <div className="flex h-16 w-16 items-center justify-center rounded bg-white">
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
                    className="flex items-center gap-2 rounded border border-gray-500 px-2 py-1 transition hover:border-white"
                  >
                    <FaGooglePlay size={14} />

                    <span className="text-[10px] leading-tight text-gray-300">
                      GET IT ON
                      <br />
                      <span className="text-xs font-semibold text-white">
                        Google Play
                      </span>
                    </span>
                  </Link>

                  <Link
                    href="#"
                    className="flex items-center gap-2 rounded border border-gray-500 px-2 py-1 transition hover:border-white"
                  >
                    <FaApple size={14} />

                    <span className="text-[10px] leading-tight text-gray-300">
                      Download on
                      <br />
                      <span className="text-xs font-semibold text-white">
                        App Store
                      </span>
                    </span>
                  </Link>
                </div>
              </div>

              <div className="mt-2 flex items-center gap-4">
                {socials.map((social, index) => (
                  <Link
                    key={index}
                    href={social.href}
                    className="text-gray-400 transition hover:text-white"
                  >
                    {social.icon}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-700 py-4 text-center text-xs text-gray-500">
          © Copyright Rimel 2022. All rights reserved.
        </div>
      </footer>

      <Alert
        show={showAlert}
        onClose={() => setShowAlert(false)}
        type={alertType}
        title={alertTitle}
        sub={alertSub}
      />
    </>
  );
}