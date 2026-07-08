"use client";
import Image from "next/image";
import Link from "next/link";
import AuthImage from "@/public/auth/SideImage.svg";
import { useRef, useState } from "react";
import LoadingButton from "@/components/ui/LoadingButton";
import { EyeOff, Eye } from 'lucide-react';
import { useRouter } from "next/navigation";
import useAuthStore from "@/store/useAuthStore";
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const phoneRegex = /^\d{10,15}$/;

const rules = {
    email: {
        validate: (v: string) =>
            emailRegex.test(v) || phoneRegex.test(v),
        empty: "Please enter your email or phone number.",
        error: "Please enter a valid email address or phone number.",
    },

    password: {
        validate: (v: string) => v.length >= 8,
        empty: "Please enter your password.",
        error: "Password must be at least 8 characters long.",
    },
};

type FieldKey = "email" | "password";
type FieldState = "idle" | "empty" | "error" | "valid";

type Toast = {
    id: string;
    type: "success" | "error";
    title: string;
    sub: string;
};
export default function LoginPage() {


    const login = useAuthStore((s) => s.login);
    const authError = useAuthStore((s) => s.error);
    const loading = useAuthStore((s) => s.loading);
    const router = useRouter();

    const [values, setValues] = useState<Record<FieldKey, string>>({

        email: "",
        password: "",
    });

    const [states, setStates] = useState<Record<FieldKey, FieldState>>({

        email: "idle",
        password: "idle",
    });

    const [toasts, setToasts] = useState<Toast[]>([]);
    const emailRef = useRef<HTMLInputElement>(null);
    const passRef = useRef<HTMLInputElement>(null);
    const [showPassword, setShowPassword] = useState(false);

    const handleEnter = (
        e: React.KeyboardEvent<HTMLInputElement>,
        nextRef: React.RefObject<HTMLInputElement | null> | null,
    ) => {
        if (e.key === "Enter") {
            e.preventDefault();
            nextRef?.current?.focus();
        }
    };
    const validateField = (key: FieldKey, val: string): FieldState => {
        if (!val.trim()) return "empty";
        if (!rules[key].validate(val)) return "error";
        return "valid";
    };

    const handleChange = (key: FieldKey, val: string) => {
        setValues((prev) => ({ ...prev, [key]: val }));

        setStates((prev) => ({
            ...prev,
            [key]: validateField(key, val),
        }));
    };

    const addToast = (toast: Toast) => {
        setToasts((prev) => [...prev, toast]);

        setTimeout(() => {
            setToasts((prev) => prev.filter((t) => t.id !== toast.id));
        }, 3000);
    };

    const handleSubmitForm = async () => {
        const keys: FieldKey[] = ["email", "password"];

        const newStates = keys.reduce((acc, k) => {
            acc[k] = validateField(k, values[k]);
            return acc;
        }, {} as Record<FieldKey, FieldState>);

        setStates(newStates);

        const invalid = keys.filter((k) => newStates[k] !== "valid");

        if (invalid.length > 0) {
            addToast({
                id: "error-" + Date.now(),
                type: "error",
                title: "Validation Error",
                sub: "Please correct the highlighted fields and try again.",
            });

            return;
        }

        const success = await login(values.email, values.password);

        if (!success) {
            addToast({
                id: "error-" + Date.now(),
                type: "error",
                title: "Login Failed",
                sub: "Please check your email and password.",
            });

            return;
        }

        addToast({
            id: "success-" + Date.now(),
            type: "success",
            title: "Welcome Back 👋",
            sub: "Login successful.",
        });

        setValues({
            email: "",
            password: "",
        });

        setStates({
            email: "idle",
            password: "idle",
        });

        setTimeout(() => {
            router.push("/");
        }, 800);
    };
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        await handleSubmitForm();
    };

    return (
        <form onSubmit={handleSubmit}>
         <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

                {/* TOASTS */}
                <div className="fixed top-4 right-4 space-y-2 z-50">
                    {toasts.map((t) => (
                        <div
                            key={t.id}
                            className={`px-4 py-2 rounded shadow text-white ${t.type === "success"
                                ? "bg-green-500/70"
                                : "bg-red-500/70"
                                }`}
                        >
                            <div className="font-bold">{t.title}</div>
                            <div className="text-sm">{t.sub}</div>
                        </div>
                    ))}
                </div>

                {/* LEFT IMAGE */}
              <div className="hidden lg:flex flex-col">
                    <div className="overflow-hidden rounded-md group">
                        <Image
                            src={AuthImage}
                            width={805}
                            height={781}
                            alt="Auth Image"
                            className="object-cover transition-all my-8 duration-700 ease-out scale-100 brightness-100 group-hover:scale-102 group-hover:brightness-75"
                        />
                    </div>
                </div>

                {/* FORM */}
                <div className="flex flex-col justify-center gap-6 px-6 py-10 lg:px-0">

                    <div className="flex flex-col gap-4 w-full max-w-md">
                       <h2 className="text-3xl lg:text-4xl font-bold">
                            Log in to Exclusive
                        </h2>
                        <p className="text-gray-500">
                            Enter your details below
                        </p>
                    </div>

                 <div className="flex flex-col gap-4 mt-3 w-full max-w-md">

                        {/* EMAIL */}
                        <input
                            ref={emailRef}
                            onKeyDown={(e) => handleEnter(e, passRef)}
                            value={values.email}
                            onChange={(e) =>
                                handleChange("email", e.target.value)
                            }
                            className="
                            w-full

outline-none
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
                            placeholder="Email or Phone Number"
                        />
                        {states.email === "error" && (
                            <p className="text-red-500 text-sm">
                                {rules.email.error}
                            </p>
                        )}

                        {/* PASSWORD */}
                        <div>

                            <div className=" relative">

                                <input
                                    type={showPassword ? "text" : "password"}
                                    ref={passRef}
                                    value={values.password}
                                    onChange={(e) =>
                                        handleChange("password", e.target.value)
                                    }
                                    className="w-full

outline-none
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
                                    placeholder="Password"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-black transition"
                                >
                                    {showPassword ? <Eye size={20} /> : <EyeOff size={20} />}
                                </button>
                            </div>

                            {authError && (
                                <p className="mt-2 text-sm text-red-500">
                                    {authError}
                                </p>
                            )}
                        </div>

                    </div>

                   <div className="flex flex-row sm:flex-row items-center justify-between w-full max-w-md gap-5 mt-4">

                        <Link
                            href={"/reset-password"}
                            className=" text-red-500 mt-4"
                        >
                            Forget Password?
                        </Link>
                        <div className="flex flex-col gap-6 mt-6 items-center">
                            <LoadingButton
                                isLoading={loading}
                                loadingText="Login..."
                                text="Login"
                            />

                        </div>
                    </div>
                </div>
            </div>
        </form>
    )
}
