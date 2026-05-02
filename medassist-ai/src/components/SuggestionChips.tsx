"use client";

import { motion } from "framer-motion";

interface SuggestionChipsProps {
  onSelect: (prompt: string) => void;
}

const prompts = [
  "Explain my blood test report",
  "What does high cholesterol mean?",
  "Common causes of headache",
  "When should I consult a doctor?",
];

export default function SuggestionChips({ onSelect }: SuggestionChipsProps) {
  return (
    <div className="flex flex-wrap gap-2 justify-center mt-8 mb-4 max-w-2xl mx-auto">
      {prompts.map((prompt, index) => (
        <motion.button
          key={prompt}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: index * 0.1 }}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => onSelect(prompt)}
          className="px-4 py-2 bg-white border border-gray-100 rounded-full text-sm text-gray-600 hover:text-green-600 hover:border-green-200 hover:bg-green-50/50 transition-all shadow-sm"
        >
          {prompt}
        </motion.button>
      ))}
    </div>
  );
}
