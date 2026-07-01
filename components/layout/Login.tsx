"use client";
import Image from "next/image";
import Link from "next/link";
import AuthImage from "@/public/auth/SideImage.svg";
import { FcGoogle } from "react-icons/fc";
import { useState } from "react";
import LoadingButton from "@/components/ui/LoadingButton";

const rules = {
    email: {
        validate: (v: string) =>
            /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v),
        empty: "Email is required",
        error: "Email is invalid",
    },
    password: {
        validate: (v: string) => v.length >= 8,
        empty: "Password is required",
        error: "Password must be at least 8 characters",
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
    const [values, setValues] = useState<Record<FieldKey, string>>({

        email: "",
        password: "",
    });

    const [states, setStates] = useState<Record<FieldKey, FieldState>>({

        email: "idle",
        password: "idle",
    });

    const [toasts, setToasts] = useState<Toast[]>([]);
    const [isLoading, setIsLoading] = useState(false);

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

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

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
                sub: "Please fix the highlighted fields",
            });
            return;
        }

        setIsLoading(true);

        await new Promise((r) => setTimeout(r, 1000));

        setIsLoading(false);

        addToast({
            id: "success-" + Date.now(),
            type: "success",
            title: "Success",
            sub: "Account created successfully",
        });

        setValues({ email: "", password: "" });
        setStates({ email: "idle", password: "idle" });
    };
    return (
        <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-2 gap-3">

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
                <div className="flex flex-col">
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
                <div className="flex flex-col items-center justify-center gap-6 ">

                    <div className="flex flex-col gap-5">
                        <h2 className="font-bold text-3xl">
                            Log in to Exclusive
                        </h2>
                        <p className="text-gray-500">
                            Enter your details below
                        </p>
                    </div>

                    <div className="flex flex-col gap-4 mt-3">


                        {/* EMAIL */}
                        <input
                            value={values.email}
                            onChange={(e) =>
                                handleChange("email", e.target.value)
                            }
                            className="
border-0
outline-none
focus:outline-none
focus:ring-0
rounded-[15px]
p-[1em]
bg-[#ccc]
shadow-[inset_2px_5px_10px_rgba(0,0,0,0.3)]
transition-all
duration-300
ease-in-out

focus:bg-white
focus:scale-105
focus:shadow-[13px_13px_100px_#969696,-13px_-13px_100px_#ffffff]
"
                            placeholder="Email or Phone Number"
                        />
                        {states.email === "error" && (
                            <p className="text-red-500 text-sm">
                                Email is invalid
                            </p>
                        )}

                        {/* PASSWORD */}
                        <input
                            type="password"
                            value={values.password}
                            onChange={(e) =>
                                handleChange("password", e.target.value)
                            }
                            className="
border-0
outline-none
focus:outline-none
focus:ring-0
rounded-[15px]
p-[1em]
bg-[#ccc]
shadow-[inset_2px_5px_10px_rgba(0,0,0,0.3)]
transition-all
duration-300
ease-in-out

focus:bg-white
focus:scale-105
focus:shadow-[13px_13px_100px_#969696,-13px_-13px_100px_#ffffff]
"
                            placeholder="Password"
                        />
                        {states.password === "error" && (
                            <p className="text-red-500 text-sm">
                                Password is invalid
                            </p>
                        )}
                    </div>


                    <div className="flex flex-row items-center justify-center gap-15">

                        <div className="flex flex-col gap-6 mt-6 items-center">
                            <LoadingButton
                                isLoading={isLoading}
                                loadingText="Login..."
                                text="Login"
                            />

                        </div>
                        <Link
                            href={"/reset-password"}
                            className=" text-red-500 mt-4"
                        >
                            Forget Password?
                        </Link>
                    </div>
                </div>
            </div>
        </form>
    )
}
