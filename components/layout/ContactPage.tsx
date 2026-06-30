"use client"
import { useCallback, useEffect, useRef, useState } from "react"
import Link from "next/link"
import Image from "next/image"
import phone from "@/app/assets/icon/Vector(2).svg"
import email from "@/app/assets/icon/Vector(3).svg"

// ─── Types ─────────────────────────────────────────────────
type FieldKey = "name" | "email" | "phone" | "msg"
type FieldState = "idle" | "valid" | "empty" | "error"
type ToastType = "success" | "warn"

interface Toast {
    id: string
    type: ToastType
    title: string
    sub: string
    duration: number
}

// ─── Validation rules ──────────────────────────────────────
const rules: Record<FieldKey, {
    validate: (v: string) => boolean
    empty: string
    error: string
    ok: string
}> = {
    name: {
        validate: v => v.trim().length >= 2 && /^[\u0600-\u06FFa-zA-Z\s]+$/.test(v.trim()),
        empty: "Please enter your name",
        error: "Please enter a valid name (at least 2 letters)",
        ok: "Looks good ✓",
    },
    email: {
        validate: v => /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v.trim()),
        empty: "Email is required",
        error: "Please enter a valid email (e.g. name@example.com)",
        ok: "Valid email ✓",
    },
    phone: {
        validate: v => /^[+]?[\d\s\-()]{8,15}$/.test(v.trim()),
        empty: "Phone number is required",
        error: "Please enter a valid phone number (e.g. +98 912 345 6789)",
        ok: "Valid phone number ✓",
    },
    msg: {
        validate: v => v.trim().length >= 10,
        empty: "Message is required",
        error: "Message must be at least 10 characters long",
        ok: "Message received ✓",
    },
}

// ─── Toast component ───────────────────────────────────────
function ToastItem({ toast, onDismiss }: { toast: Toast; onDismiss: (id: string) => void }) {
    const [hiding, setHiding] = useState(false)

    const dismiss = useCallback(() => {
        setHiding(true)
        setTimeout(() => onDismiss(toast.id), 280)
    }, [toast.id, onDismiss])

    useEffect(() => {
        const t = setTimeout(dismiss, toast.duration)
        return () => clearTimeout(t)
    }, [dismiss, toast.duration])

    const isWarn = toast.type === "warn"

    return (
        <>
            <style>{`
        @keyframes alertIn  { from{opacity:0;transform:translateY(-12px) scale(0.94)}to{opacity:1;transform:translateY(0) scale(1)} }
        @keyframes alertOut { from{opacity:1;transform:translateY(0) scale(1)}to{opacity:0;transform:translateY(-12px) scale(0.94)} }
        @keyframes shrink   { from{width:100%}to{width:0%} }
        .alert-in  { animation: alertIn  0.36s cubic-bezier(0.34,1.46,0.64,1) both; }
        .alert-out { animation: alertOut 0.28s cubic-bezier(0.4,0,1,1) both; }
      `}</style>
            <div
                className={hiding ? "alert-out" : "alert-in"}
                style={{
                    width: "290px", borderRadius: "14px", padding: "11px 12px 14px",
                    background: isWarn ? "rgba(28,18,10,0.88)" : "rgba(18,20,28,0.82)",
                    backdropFilter: "blur(20px)", WebkitBackdropFilter: "blur(20px)",
                    border: `1px solid ${isWarn ? "rgba(239,156,0,0.2)" : "rgba(255,255,255,0.09)"}`,
                    boxShadow: "0 1.5px 0 0 rgba(255,255,255,0.07) inset, 0 -1px 0 0 rgba(0,0,0,0.4) inset, 0 8px 32px rgba(0,0,0,0.4)",
                    overflow: "hidden", position: "relative",
                }}
            >
                <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                    <div style={{
                        width: "30px", height: "30px", borderRadius: "9px", flexShrink: 0,
                        display: "flex", alignItems: "center", justifyContent: "center",
                        background: isWarn ? "rgba(239,156,0,0.14)" : "rgba(43,152,117,0.14)",
                        border: `1px solid ${isWarn ? "rgba(239,156,0,0.22)" : "rgba(43,152,117,0.22)"}`,
                        color: isWarn ? "#ef9c00" : "#2b9875",
                    }}>
                        {isWarn ? (
                            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                                <path d="M12 9v4m0 4h.01M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
                            </svg>
                        ) : (
                            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                                <path d="m4.5 12.75 6 6 9-13.5" />
                            </svg>
                        )}
                    </div>

                    <div style={{ flex: 1 }}>
                        <p style={{ color: "#fff", fontSize: "12px", fontWeight: 500, margin: 0 }}>{toast.title}</p>
                        <p style={{ color: "rgba(255,255,255,0.4)", fontSize: "10px", margin: "2px 0 0" }}>{toast.sub}</p>
                    </div>

                    <button
                        onClick={dismiss}
                        style={{ background: "none", border: "none", cursor: "pointer", padding: "4px", borderRadius: "6px", lineHeight: 0, color: "rgba(255,255,255,0.28)" }}
                    >
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                            <path d="M18 6 6 18M6 6l12 12" />
                        </svg>
                    </button>
                </div>

                <div style={{ position: "absolute", bottom: 0, left: "12px", right: "12px", height: "2px", background: "rgba(255,255,255,0.06)", overflow: "hidden" }}>
                    <div style={{
                        height: "100%", borderRadius: "2px",
                        background: isWarn ? "linear-gradient(90deg,#ef9c00,#facc15)" : "linear-gradient(90deg,#2b9875,#34d39a)",
                        animation: `shrink ${toast.duration}ms linear forwards`,
                    }} />
                </div>
            </div>
        </>
    )
}

// ─── Field component ───────────────────────────────────────
function Field({ id, fieldKey, value, onChange, onBlur, state, placeholder, multiline }: {
    id: string
    fieldKey: FieldKey
    value: string
    onChange: (k: FieldKey, v: string) => void
    onBlur: (k: FieldKey) => void
    state: FieldState
    placeholder: string
    multiline?: boolean
}) {
    const r = rules[fieldKey]
    const isError = state === "error" || state === "empty"
    const isValid = state === "valid"

    const borderColor = isError ? "#e53935" : isValid ? "#43a047" : "#e0e0e0"
    const bg = isError ? "#fff8f8" : isValid ? "#f8fff8" : "#fafafa"
    const boxShadow = isError ? "0 0 0 3px rgba(229,57,53,0.08)" : isValid ? "0 0 0 3px rgba(67,160,71,0.08)" : "none"

    const sharedStyle: React.CSSProperties = {
        width: "100%", padding: "10px 14px", borderRadius: "8px", fontSize: "13px",
        border: `1.5px solid ${borderColor}`, background: bg, outline: "none",
        boxShadow, transition: "border-color 0.2s, box-shadow 0.2s",
    }

    return (
        <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
            <style>{`@keyframes shake{0%,100%{transform:translateX(0)}15%{transform:translateX(-6px)}35%{transform:translateX(6px)}55%{transform:translateX(-4px)}75%{transform:translateX(4px)}}.shake{animation:shake 0.4s cubic-bezier(0.36,0.07,0.19,0.97) both}`}</style>
            {multiline ? (
                <textarea
                    id={id}
                    value={value}
                    placeholder={placeholder}
                    rows={10}
                    onChange={e => onChange(fieldKey, e.target.value)}
                    onBlur={() => onBlur(fieldKey)}
                    style={{ ...sharedStyle, resize: "none" }}
                />
            ) : (
                <input
                    id={id}
                    value={value}
                    placeholder={placeholder}
                    onChange={e => onChange(fieldKey, e.target.value)}
                    onBlur={() => onBlur(fieldKey)}
                    style={sharedStyle}
                />
            )}
            {(isError || isValid) && (
                <span style={{ fontSize: "11px", color: isError ? "#e53935" : "#43a047" }}>
                    {isError ? (state === "empty" ? r.empty : r.error) : r.ok}
                </span>
            )}
        </div>
    )
}

// ─── Main page ─────────────────────────────────────────────
export default function ContactPage() {
    const [values, setValues] = useState<Record<FieldKey, string>>({ name: "", email: "", phone: "", msg: "" })
    const [states, setStates] = useState<Record<FieldKey, FieldState>>({ name: "idle", email: "idle", phone: "idle", msg: "idle" })
    const [toasts, setToasts] = useState<Toast[]>([])
    const [isLoading, setIsLoading] = useState(false)
    const shakeRefs = useRef<Record<FieldKey, HTMLElement | null>>({ name: null, email: null, phone: null, msg: null })

    const validateField = useCallback((key: FieldKey, val: string, silent = false): FieldState => {
        if (!val.trim()) return silent ? "empty" : "empty"
        if (!rules[key].validate(val)) return "error"
        return "valid"
    }, [])

    const handleChange = (key: FieldKey, val: string) => {
        setValues(prev => ({ ...prev, [key]: val }))
        if (states[key] !== "idle") {
            const s = validateField(key, val)
            setStates(prev => ({ ...prev, [key]: s }))
        }
    }

    const handleBlur = (key: FieldKey) => {
        if (!values[key].trim() && states[key] === "idle") return
        const s = validateField(key, values[key])
        setStates(prev => ({ ...prev, [key]: s }))
    }

    const triggerShake = (key: FieldKey) => {
        const el = document.getElementById("field-" + key)
        if (!el) return
        el.classList.remove("shake")
        void (el as HTMLElement).offsetWidth
        el.classList.add("shake")
    }

    const addToast = useCallback((toast: Toast) => {
        setToasts(prev => {
            const filtered = prev.filter(t => t.id !== toast.id)
            return [...filtered, toast]
        })
    }, [])

    const removeToast = useCallback((id: string) => {
        setToasts(prev => prev.filter(t => t.id !== id))
    }, [])

    const handleSubmit = async () => {
        const keys: FieldKey[] = ["name", "email", "phone", "msg"]
        const newStates = { ...states }
        keys.forEach(k => { newStates[k] = validateField(k, values[k]) })
        setStates(newStates)

        const invalid = keys.filter(k => newStates[k] !== "valid")
        if (invalid.length === 0) {
            setIsLoading(true)
            await new Promise(r => setTimeout(r, 1800))
            setIsLoading(false)
            addToast({ id: "success", type: "success", title: "Message sent", sub: "We'll get back to you soon", duration: 4000 })
            setValues({ name: "", email: "", phone: "", msg: "" })
            setStates({ name: "idle", email: "idle", phone: "idle", msg: "idle" })
            return
        }

        invalid.forEach(k => triggerShake(k))

        const labels: Record<FieldKey, string> = { name: "name", email: "email", phone: "phone", msg: "masege" }

        if (invalid.length === keys.length) {
            addToast({ id: "warn-all", type: "warn", title: "The form is empty", sub: "Please fill in all fields", duration: 3500 })
        } else {
            invalid.forEach(k => {
                const s = newStates[k]
                addToast({
                    id: "warn-" + k,
                    type: "warn",
                    title: s === "empty" ? `${labels[k]}empty` : `${labels[k]}An error was entered`,
                    sub: rules[k][s === "empty" ? "empty" : "error"],
                    duration: 3000,
                })
            })
        }
    }

    return (
        <section className="flex flex-col px-20 py-10">

            {/* Toasts */}
            <div style={{ position: "fixed", top: "20px", right: "20px", zIndex: 9999, display: "flex", flexDirection: "column", gap: "8px" }}>
                {toasts.map(t => <ToastItem key={t.id} toast={t} onDismiss={removeToast} />)}
            </div>

            <div className="flex gap-2 text-sm text-gray-500 mb-10">
                <Link href="/" className="hover:text-red-500 transition">Home</Link>
                <span>/</span>
                <span className="text-black font-medium">Contact</span>
            </div>

            <div className="grid grid-cols-3 gap-6">

                {/* ستون چپ */}
                <div className="border border-gray-200 rounded-md shadow-sm p-8 flex flex-col gap-8">
                    <div className="flex flex-col gap-3">
                        <div className="flex items-center gap-3">
                            <div className="bg-red-500 rounded-full p-3">
                                <Image src={phone} width={20} height={20} alt="Phone" />
                            </div>
                            <h3 className="font-semibold text-base">Call To Us</h3>
                        </div>
                        <p className="text-sm text-gray-700">We are available 24/7, 7 days a week.</p>
                        <p className="text-sm text-gray-700">Phone: +8801611122222</p>
                    </div>
                    <hr />
                    <div className="flex flex-col gap-3">
                        <div className="flex items-center gap-3">
                            <div className="bg-red-500 rounded-full p-3">
                                <Image src={email} width={20} height={20} alt="Email" />
                            </div>
                            <h3 className="font-semibold text-base">Write To Us</h3>
                        </div>
                        <p className="text-sm text-gray-600">Fill out our form and we will contact you within 24 hours.</p>
                        <p className="text-sm text-gray-600">Emails: customer@exclusive.com</p>
                        <p className="text-sm text-gray-600">Emails: support@exclusive.com</p>
                    </div>
                </div>

                {/* ستون راست */}
                <div className="col-span-2 flex flex-col gap-3 p-4">
                    <div className="grid grid-cols-3 gap-4">
                        {(["name", "email", "phone"] as ("name" | "email" | "phone")[]).map(k => (
                            <div key={k} id={"field-" + k}>
                                <Field
                                    id={"input-" + k} fieldKey={k} value={values[k]}
                                    onChange={handleChange} onBlur={handleBlur} state={states[k]}
                                    placeholder={{ name: "Your Name *", email: "Your Email *", phone: "Your Phone *" }[k]}
                                />
                            </div>
                        ))}
                    </div>

                    <div id="field-msg">
                        <Field
                            id="input-msg" fieldKey="msg" value={values.msg}
                            onChange={handleChange} onBlur={handleBlur} state={states.msg}
                            placeholder="Your Message *" multiline
                        />
                    </div>

                    <div className="flex justify-end mt-1">
                        <button
                            onClick={handleSubmit}
                            disabled={isLoading}
                            className="flex items-center gap-2 bg-red-500 hover:bg-red-600 disabled:opacity-60 disabled:cursor-not-allowed text-white px-10 py-3 rounded text-sm font-medium transition"
                        >
                            {isLoading && (
                                <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                                </svg>
                            )}
                            {isLoading ? "Sending..." : "Send Message"}
                        </button>
                    </div>
                </div>
            </div>
        </section>
    )
}