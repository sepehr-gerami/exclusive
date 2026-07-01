"use client"

import { useCallback, useEffect, useRef, useState } from "react"

interface AlertProps {
  show: boolean;
  onClose: () => void;
  duration?: number;
  title: string;
  sub: string;
  type?: "success" | "error" | "warning" | "info";
}

export default function Alert({ show, onClose, title, sub, type = "success", duration = 4000 }: AlertProps) {
  const [hiding, setHiding] = useState(false)
  const timerRef = useRef<NodeJS.Timeout | null>(null)

  const variants = {
    success: {
      color: "#2b9875",
      bg: "rgba(43,152,117,0.13)",
      border: "rgba(43,152,117,0.22)",
    },
    error: {
      color: "#ef4444",
      bg: "rgba(239,68,68,0.13)",
      border: "rgba(239,68,68,0.22)",
    },
    warning: {
      color: "#f59e0b",
      bg: "rgba(245,158,11,0.13)",
      border: "rgba(245,158,11,0.22)",
    },
    info: {
      color: "#3b82f6",
      bg: "rgba(59,130,246,0.13)",
      border: "rgba(59,130,246,0.22)",
    },
  };
  const icons = {
  success: (
    <path d="m4.5 12.75 6 6 9-13.5" />
  ),
  error: (
    <>
      <path d="M18 6 6 18" />
      <path d="M6 6l12 12" />
    </>
  ),
  warning: (
    <>
      <path d="M12 9v4" />
      <circle cx="12" cy="17" r="1" />
    </>
  ),
  info: (
    <>
      <circle cx="12" cy="12" r="10" />
      <path d="M12 16v-4" />
      <path d="M12 8h.01" />
    </>
  ),
};

  const current = variants[type];
  const triggerHide = useCallback(() => {
    if (timerRef.current) clearTimeout(timerRef.current)
    setHiding(true)
    setTimeout(() => {
      setHiding(false)
      onClose()

    }, 280)
  }, [onClose])

  useEffect(() => {
    if (!show) return
    timerRef.current = setTimeout(triggerHide, duration)
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current)
    }
  }, [show, duration, triggerHide])

  if (!show && !hiding) return null

  return (
    <>
      <style>{`
        @keyframes alertIn  { from { opacity:0; transform:translateY(-16px) scale(0.94); } to { opacity:1; transform:translateY(0) scale(1); } }
        @keyframes alertOut { from { opacity:1; transform:translateY(0) scale(1); } to { opacity:0; transform:translateY(-16px) scale(0.94); } }
        @keyframes shrink   { from { width:100%; } to { width:0%; } }
        .alert-toast        { animation: alertIn  0.38s cubic-bezier(0.34,1.46,0.64,1) both; }
        .alert-toast.hiding { animation: alertOut 0.28s cubic-bezier(0.4,0,1,1)        both; }
      `}</style>

      <div
        className={`alert-toast${hiding ? " hiding" : ""}`}
        style={{
          position: "fixed", top: "20px", right: "20px", zIndex: 9999,
          width: "310px", borderRadius: "18px", padding: "13px 14px 16px",
          background: "rgba(18,20,28,0.72)",
          backdropFilter: "blur(24px)", WebkitBackdropFilter: "blur(24px)",
          border: "1px solid rgba(255,255,255,0.09)",
          boxShadow: `
            0 1.5px 0 0 rgba(255,255,255,0.07) inset,
            0 -1px 0 0 rgba(0,0,0,0.4) inset,
            0 0 0 0.5px rgba(255,255,255,0.04),
            0 4px 12px rgba(0,0,0,0.25),
            0 16px 48px rgba(0,0,0,0.45)
          `,
          overflow: "hidden",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: "10px" }}>
          <div style={{
            width: "34px", height: "34px", borderRadius: "10px", flexShrink: 0,
           background: current.bg, border: `1px solid ${current.border}`,
            display: "flex", alignItems: "center", justifyContent: "center", color: current.color,
          }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
              stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="m4.5 12.75 6 6 9-13.5" />
            </svg>
          </div>

          <div style={{ flex: 1 }}>
            <p style={{ color: "#fff", fontSize: "13px", fontWeight: 500, margin: "0 0 2px" }}>{title}</p>
            <p style={{ color: "rgba(255,255,255,0.42)", fontSize: "11px", margin: 0 }}>{sub}</p>
          </div>

          <button
            onClick={triggerHide}
            style={{
              background: "none", border: "none", cursor: "pointer",
              padding: "5px", borderRadius: "8px", lineHeight: 0, flexShrink: 0,
              color: "rgba(255,255,255,0.28)", transition: "color 0.15s",
            }}
            onMouseEnter={e => (e.currentTarget.style.color = "rgba(255,255,255,0.7)")}
            onMouseLeave={e => (e.currentTarget.style.color = "rgba(255,255,255,0.28)")}
          >
              <svg
  width="16"
  height="16"
  viewBox="0 0 24 24"
  fill="none"
  stroke="currentColor"
  strokeWidth="2.5"
  strokeLinecap="round"
  strokeLinejoin="round"
>
  {icons[type]}
</svg>
          </button>
        </div>

        <div style={{ position: "absolute", bottom: 0, left: "14px", right: "14px", height: "2px", background: "rgba(255,255,255,0.06)", overflow: "hidden" }}>
          <div style={{ height: "100%",background: `linear-gradient(90deg, ${current.color}, ${current.color})`, animation: `shrink ${duration}ms linear forwards` }} />
        </div>
      </div>
    </>
  )
}