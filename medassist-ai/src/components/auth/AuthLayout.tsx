import { ReactNode } from "react";
import { Activity } from "lucide-react";
import Link from "next/link";
import Footer from "../Footer";

export default function AuthLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-gray-50/50">
      {/* Left side: Branding / Illustration (Hidden on mobile) */}
      <div className="hidden md:flex flex-1 flex-col justify-between p-12 bg-white border-r border-gray-100">
        <div>
          <Link href="/" className="flex items-center gap-2 w-fit">
            <div className="bg-green-500/10 p-2 rounded-xl">
              <Activity className="w-6 h-6 text-green-500" />
            </div>
            <span className="font-semibold text-xl tracking-tight text-gray-900">
              MedAssist <span className="text-gray-400 font-light">AI</span>
            </span>
          </Link>
          <div className="mt-24 max-w-md">
            <h1 className="text-4xl font-bold text-gray-900 leading-tight tracking-tight">
              Your intelligent <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-500 to-green-300">
                healthcare companion.
              </span>
            </h1>
            <p className="mt-6 text-lg text-gray-500 leading-relaxed text-balance">
              Sign in to securely access your medical report insights, ask health questions, and keep track of your wellness journey in one premium dashboard.
            </p>
          </div>
        </div>
        
        {/* Placeholder for illustration / graphic */}
        <div className="relative w-full aspect-square max-w-sm mx-auto mt-12 opacity-80">
          <div className="absolute inset-0 bg-gradient-to-tr from-green-100 to-green-50/20 rounded-full blur-3xl" />
          <div className="absolute inset-10 border border-green-200/50 rounded-full animate-[spin_20s_linear_infinite]" />
          <div className="absolute inset-20 border border-green-200/50 rounded-full animate-[spin_15s_linear_infinite_reverse]" />
          <div className="absolute inset-0 flex items-center justify-center">
            <Activity className="w-24 h-24 text-green-200" />
          </div>
        </div>
      </div>

      {/* Right side: Form Container */}
      <div className="flex-1 flex flex-col relative overflow-y-auto">
        {/* Mobile Header */}
        <div className="md:hidden p-6 flex justify-center">
          <Link href="/" className="flex items-center gap-2">
            <div className="bg-green-500/10 p-2 rounded-xl">
              <Activity className="w-6 h-6 text-green-500" />
            </div>
            <span className="font-semibold text-lg tracking-tight text-gray-900">
              MedAssist <span className="text-gray-400 font-light">AI</span>
            </span>
          </Link>
        </div>

        <div className="flex-1 flex items-center justify-center p-6 sm:p-12">
          {children}
        </div>
        
        <div className="mt-auto">
          <Footer />
        </div>
      </div>
    </div>
  );
}
