"use client"

export default function LoadingButton({ isLoading, onClick }: {
  isLoading: boolean
  onClick?: () => void
}) {
  return (
    <button
      onClick={onClick}
      disabled={isLoading}
      className="flex items-center gap-2 bg-red-500 hover:bg-red-600
        disabled:opacity-70 disabled:cursor-not-allowed
        text-white px-10 py-3 rounded text-sm font-medium transition"
    >
      {isLoading && (
        <svg className="animate-spin h-4 w-4 text-white"
          xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10"
            stroke="currentColor" strokeWidth="4" />
          <path className="opacity-75" fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
        </svg>
      )}
      {isLoading ? "Sending..." : "Send Message"}
    </button>
  )
}