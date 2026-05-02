import { Activity } from "lucide-react";
import Link from "next/link";

export default function Header() {
  return (
    <header className="sticky top-0 z-50 w-full glassmorphism border-b border-gray-100">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <div className="bg-green-500/10 p-2 rounded-xl">
            <Activity className="w-6 h-6 text-green-500" />
          </div>
          <span className="font-semibold text-lg tracking-tight text-gray-900">
            MedAssist <span className="text-gray-400 font-light">AI</span>
          </span>
        </Link>
        <nav className="hidden sm:flex items-center gap-6 text-sm font-medium text-gray-500">
          <Link href="/" className="hover:text-green-600 transition-colors">Home</Link>
          <Link href="/about" className="hover:text-green-600 transition-colors">About Developer</Link>
        </nav>
        <div className="flex items-center gap-3">
          <Link href="/login" className="text-sm font-medium text-gray-600 hover:text-green-600 transition-colors">
            Sign in
          </Link>
          <Link href="/signup" className="text-sm font-medium px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded-full transition-all">
            Sign up
          </Link>
        </div>
      </div>
    </header>
  );
}

