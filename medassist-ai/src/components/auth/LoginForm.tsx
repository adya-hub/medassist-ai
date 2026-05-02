"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import Link from "next/link";
import { Loader2, CheckCircle2, AlertCircle } from "lucide-react";
import InputField from "./InputField";

// ---------- Validation helpers ----------
function validateEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function validatePassword(password: string) {
  const rules = [
    { label: "At least 8 characters", pass: password.length >= 8 },
    { label: "One uppercase letter (A–Z)", pass: /[A-Z]/.test(password) },
    { label: "One lowercase letter (a–z)", pass: /[a-z]/.test(password) },
    { label: "One number (0–9)", pass: /[0-9]/.test(password) },
    { label: "One special character (!@#$%^&*)", pass: /[!@#$%^&*]/.test(password) },
  ];
  return rules;
}

export default function LoginForm() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [touched, setTouched] = useState({ email: false, password: false });
  const [isLoading, setIsLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const emailError = touched.email && !validateEmail(email) ? "Please enter a valid email address." : "";
  const passwordRules = validatePassword(password);
  const passwordValid = passwordRules.every((r) => r.pass);
  const passwordError = touched.password && !passwordValid ? "Password does not meet requirements." : "";

  const isFormValid = validateEmail(email) && passwordValid;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setTouched({ email: true, password: true });
    if (!isFormValid) return;

    setIsLoading(true);
    // Simulate API call
    await new Promise((res) => setTimeout(res, 1500));
    setIsLoading(false);
    setSuccess(true);
    // Redirect to home after brief success message
    await new Promise((res) => setTimeout(res, 800));
    router.push("/");
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="w-full max-w-md bg-white p-8 rounded-3xl premium-shadow border border-gray-100"
    >
      <div className="mb-8 text-center sm:text-left">
        <h2 className="text-2xl font-bold text-gray-900 tracking-tight mb-1">Welcome back</h2>
        <p className="text-gray-500 text-sm">Sign in to continue to MedAssist AI.</p>
      </div>

      {success && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="mb-6 flex items-center gap-2 p-3 bg-green-50 border border-green-200 rounded-xl text-green-700 text-sm"
        >
          <CheckCircle2 className="w-4 h-4 shrink-0" />
          Signed in successfully! Redirecting…
        </motion.div>
      )}

      <form onSubmit={handleSubmit} noValidate className="space-y-5">
        {/* Email */}
        <div className="space-y-1.5">
          <label className="block text-sm font-medium text-gray-700">Email address</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            onBlur={() => setTouched((t) => ({ ...t, email: true }))}
            placeholder="you@example.com"
            className={`w-full px-4 py-3 rounded-xl border text-gray-900 placeholder-gray-400 bg-gray-50/50 outline-none transition-all
              ${emailError
                ? "border-red-400 focus:ring-2 focus:ring-red-200"
                : "border-gray-200 focus:ring-2 focus:ring-green-500/20 focus:border-green-500"
              }`}
          />
          {emailError && (
            <p className="text-xs text-red-500 flex items-center gap-1 mt-1">
              <AlertCircle className="w-3.5 h-3.5" /> {emailError}
            </p>
          )}
        </div>

        {/* Password */}
        <div className="space-y-1.5">
          <label className="block text-sm font-medium text-gray-700">Password</label>
          <InputField
            label=""
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            onBlur={() => setTouched((t) => ({ ...t, password: true }))}
            placeholder="••••••••"
            className={`w-full px-4 py-3 rounded-xl border text-gray-900 placeholder-gray-400 bg-gray-50/50 outline-none transition-all
              ${passwordError
                ? "border-red-400 focus:ring-2 focus:ring-red-200"
                : "border-gray-200 focus:ring-2 focus:ring-green-500/20 focus:border-green-500"
              }`}
          />
          {touched.password && (
            <ul className="mt-2 space-y-1">
              {passwordRules.map((r) => (
                <li key={r.label} className={`text-xs flex items-center gap-1.5 ${r.pass ? "text-green-600" : "text-gray-400"}`}>
                  <CheckCircle2 className={`w-3.5 h-3.5 ${r.pass ? "text-green-500" : "text-gray-300"}`} />
                  {r.label}
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className="flex items-center justify-between text-sm">
          <label className="flex items-center gap-2 cursor-pointer group">
            <input type="checkbox" className="w-4 h-4 rounded border-gray-300 text-green-500 cursor-pointer" />
            <span className="text-gray-600">Remember me</span>
          </label>
          <Link href="#" className="font-medium text-green-600 hover:text-green-500 transition-colors">
            Forgot password?
          </Link>
        </div>

        <button
          type="submit"
          disabled={isLoading || success}
          className="w-full py-3 px-4 bg-green-500 hover:bg-green-600 text-white font-medium rounded-xl transition-all active:scale-[0.98] flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
        >
          {isLoading ? (
            <><Loader2 className="w-5 h-5 animate-spin" /> Signing in…</>
          ) : success ? (
            <><CheckCircle2 className="w-5 h-5" /> Done!</>
          ) : "Sign in"}
        </button>

        <div className="relative py-3 flex items-center">
          <div className="flex-grow border-t border-gray-100" />
          <span className="flex-shrink-0 mx-4 text-gray-400 text-sm">Or</span>
          <div className="flex-grow border-t border-gray-100" />
        </div>

        <button
          type="button"
          className="w-full py-3 px-4 bg-white hover:bg-gray-50 border border-gray-200 text-gray-700 font-medium rounded-xl transition-all active:scale-[0.98] flex items-center justify-center gap-2"
        >
          <svg className="w-5 h-5" viewBox="0 0 24 24">
            <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
            <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
            <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
            <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
          </svg>
          Continue with Google
        </button>
      </form>

      <p className="mt-8 text-center text-sm text-gray-500">
        Don&apos;t have an account?{" "}
        <Link href="/signup" className="font-medium text-green-600 hover:text-green-500 transition-colors">
          Sign up
        </Link>
      </p>
    </motion.div>
  );
}
