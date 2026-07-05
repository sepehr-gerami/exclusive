"use client";

import { useState } from "react";
import Link from "next/link";
import AuthPageShell from "@/components/auth/AuthPageShell";
import LoadingButton from "@/components/ui/LoadingButton";
import useAuthStore from "@/store/useAuthStore";

export default function ResetPassPage() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState<string | null>(null);
  const requestPasswordReset = useAuthStore((s) => s.requestPasswordReset);
  const authError = useAuthStore((s) => s.error);
  const loading = useAuthStore((s) => s.loading);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setMessage(null);
    const success = await requestPasswordReset(email);
    if (success) {
      setMessage("If the email exists, we sent reset instructions.");
    }
  };

  return (
    <AuthPageShell
      title="Reset password"
      subtitle="Enter your email to receive reset instructions."
    >
      <form onSubmit={handleSubmit} className="space-y-5">
        <div className="space-y-2">
          <label className="block text-sm font-medium text-slate-700">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full outline-none
focus:ring-0
p-[1em]
shadow-[inset_2px_5px_10px_rgba(0,0,0,0.3)]
transition-all
duration-300
ease-in-out
focus:bg-white
focus:scale-105
focus:shadow-[13px_13px_100px_#969696,-13px_-13px_100px_#ffffff]
rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 focus:border-red-500 focus:outline-none"
            placeholder="Email or phone number"
          />
        </div>

        {(authError || message) && (
          <div className={`rounded-xl px-4 py-3 text-sm ${authError ? "bg-red-50 text-red-700" : "bg-green-50 text-green-700"}`}>
            {authError || message}
          </div>
        )}

        <LoadingButton isLoading={loading} text="Send reset link" loadingText="Sending..." />

        <p className="text-center text-sm text-slate-500">
          Remembered your password?{' '}
          <Link href="/login" className="font-semibold text-red-500 underline">
            Log in
          </Link>
        </p>
      </form>
    </AuthPageShell>
  );
}
