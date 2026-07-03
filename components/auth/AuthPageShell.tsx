"use client";

import Image from "next/image";
import AuthImage from "@/public/auth/SideImage.svg";
import React from "react";

type Props = {
  title: string;
  subtitle: string;
  children: React.ReactNode;
  footer?: React.ReactNode;
};

export default function AuthPageShell({ title, subtitle, children, footer }: Props) {
  return (
    <div className="min-h-screen bg-white">
      <div className="grid min-h-screen grid-cols-1 lg:grid-cols-[1.1fr_0.9fr]">
        <div className="relative overflow-hidden bg-[#f7f7f7] p-6">
          <div className="absolute inset-0 bg-linear-to-br from-red-50 via-white to-slate-50" />
          <div className="relative h-full flex items-center justify-center">
            <div className="max-w-lg rounded-4xl overflow-hidden shadow-xl">
              <Image
                src={AuthImage}
                alt="Auth image"
                width={900}
                height={900}
                className="h-full w-full object-cover"
              />
            </div>
          </div>
        </div>

        <div className="flex flex-col items-center justify-center px-6 py-10 lg:px-12">
          <div className="w-full max-w-md">
            <div className="mb-8 space-y-3 text-center">
              <h1 className="text-4xl font-bold text-slate-900">{title}</h1>
              <p className="text-sm text-slate-500">{subtitle}</p>
            </div>

            <div className="rounded-[28px] border border-slate-200 bg-white p-8 shadow-sm">
              {children}
            </div>

            {footer && <div className="mt-6 text-center text-sm text-slate-500">{footer}</div>}
          </div>
        </div>
      </div>
    </div>
  );
}
