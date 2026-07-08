import Link from "next/link";

export default function NotFound() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center px-6 text-center">
      <h1 className="text-8xl font-bold text-red-500">404</h1>

      <h2 className="mt-4 text-3xl font-semibold">
        Page Not Found
      </h2>

      <p className="mt-3 max-w-md text-gray-500">
        The page you are looking for doesn`t exist or has been moved.
      </p>

      <Link
        href="/"
        className="mt-8 rounded-lg bg-red-500 px-6 py-3 text-white transition hover:bg-red-600"
      >
        Back to Home
      </Link>
    </main>
  );
}