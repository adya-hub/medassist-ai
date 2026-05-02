import { AlertCircle } from "lucide-react";

export default function Disclaimer() {
  return (
    <div className="w-full max-w-5xl mx-auto px-4 py-4 mt-auto">
      <div className="flex flex-col items-center justify-center">
        <div className="flex items-start sm:items-center justify-center gap-2 text-xs sm:text-sm text-gray-400 text-center text-balance mb-4 sm:mb-6">
          <AlertCircle className="w-4 h-4 shrink-0 mt-0.5 sm:mt-0" />
          <p>
            This AI tool is for educational purposes only and is not a substitute for professional medical advice, diagnosis, or treatment.
          </p>
        </div>
        
        <p className="text-xs text-gray-400 text-center tracking-wide mt-2 mb-4">
          Crafted with care &bull; By Adya Sharma
        </p>
      </div>
    </div>
  );
}
