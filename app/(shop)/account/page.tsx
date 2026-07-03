"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import useAuthStore from "@/store/useAuthStore";

export default function AccountPage() {
  const user = useAuthStore((s) => s.user);
  const logout = useAuthStore((s) => s.logout);
  const router = useRouter();

  useEffect(() => {
    if (user === null) {
      router.replace("/login");
    }
  }, [router, user]);

  if (!user) {
    return null;
  }

  return (
    <section className="max-w-5xl mx-auto px-6 py-10">
      <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
        <div className="mb-8 flex flex-col gap-2">
          <h1 className="text-3xl font-bold">My Account</h1>
          <p className="text-slate-600">Welcome back, {user.name}.</p>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <div className="rounded-3xl border border-slate-100 bg-slate-50 p-6">
            <h2 className="text-lg font-semibold mb-3">Profile</h2>
            <p className="text-sm text-slate-500">Email</p>
            <p className="font-medium">{user.email}</p>
          </div>

          <div className="rounded-3xl border border-slate-100 bg-slate-50 p-6">
            <h2 className="text-lg font-semibold mb-3">Actions</h2>
            <button
              type="button"
              onClick={() => {
                logout();
                router.push("/");
              }}
              className="rounded-3xl bg-red-500 px-5 py-3 text-white transition hover:bg-red-600"
            >
              Log out
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
