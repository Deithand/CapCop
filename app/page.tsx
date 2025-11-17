import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-black">
      <div className="glass-strong p-12 rounded-none max-w-2xl mx-auto">
        <h1 className="text-4xl font-bold mb-6 text-white text-center">
          CapCop Gaming Cafe
        </h1>
        <p className="text-gray-400 mb-8 text-center">
          Modern gaming cafe management system
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Link
            href="/lock-screen"
            className="glass brutalist-border p-8 hover:bg-white/10 transition-all duration-300 group"
          >
            <h2 className="text-2xl font-bold mb-2 group-hover:neon-glow">
              Lock Screen
            </h2>
            <p className="text-gray-400">
              Client PC interface with timer and session controls
            </p>
          </Link>

          <Link
            href="/admin/dashboard"
            className="glass brutalist-border p-8 hover:bg-white/10 transition-all duration-300 group"
          >
            <h2 className="text-2xl font-bold mb-2 group-hover:neon-glow">
              Admin Dashboard
            </h2>
            <p className="text-gray-400">
              Monitor PCs, manage users, and view analytics
            </p>
          </Link>
        </div>
      </div>
    </main>
  );
}
