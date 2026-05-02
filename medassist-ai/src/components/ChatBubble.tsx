"use client";

import { motion } from "framer-motion";
import { Activity, User, Copy, Check } from "lucide-react";
import ReactMarkdown from "react-markdown";
import { useState } from "react";

interface ChatBubbleProps {
  message: string;
  isUser: boolean;
}

export default function ChatBubble({ message, isUser }: ChatBubbleProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(message);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      className={`flex w-full ${isUser ? "justify-end" : "justify-start"} mb-6 relative group`}
    >
      <div className={`flex gap-3 max-w-[85%] sm:max-w-[75%] ${isUser ? "flex-row-reverse" : "flex-row"}`}>
        <div className={`shrink-0 w-8 h-8 rounded-full flex items-center justify-center mt-1 ${isUser ? "bg-green-100" : "bg-white shadow-sm border border-gray-100"}`}>
          {isUser ? (
            <User className="w-4 h-4 text-green-600" />
          ) : (
            <Activity className="w-4 h-4 text-green-500" />
          )}
        </div>
        <div
          className={`px-5 py-3.5 rounded-2xl text-[15px] leading-relaxed premium-shadow relative ${
            isUser
              ? "bg-green-500 text-white rounded-tr-sm whitespace-pre-wrap"
              : "bg-white text-gray-800 rounded-tl-sm border border-gray-50 markdown-body"
          }`}
        >
          {!isUser && (
            <button
              onClick={handleCopy}
              className="absolute -right-10 top-2 p-1.5 text-gray-400 hover:text-green-600 bg-white rounded-md opacity-0 group-hover:opacity-100 transition-opacity border border-gray-100 shadow-sm"
              title="Copy to clipboard"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-green-500" /> : <Copy className="w-3.5 h-3.5" />}
            </button>
          )}

          {isUser ? (
            message
          ) : (
            <ReactMarkdown
              components={{
                p: ({node, ...props}) => <p className="mb-2 last:mb-0" {...props} />,
                ul: ({node, ...props}) => <ul className="list-disc pl-4 mb-2 space-y-1" {...props} />,
                ol: ({node, ...props}) => <ol className="list-decimal pl-4 mb-2 space-y-1" {...props} />,
                li: ({node, ...props}) => <li className="" {...props} />,
                h1: ({node, ...props}) => <h1 className="text-lg font-bold mt-3 mb-1 text-gray-900" {...props} />,
                h2: ({node, ...props}) => <h2 className="text-md font-bold mt-4 mb-2 text-green-700 border-b border-gray-100 pb-1" {...props} />,
                h3: ({node, ...props}) => <h3 className="text-base font-semibold mt-2 mb-1 text-gray-800" {...props} />,
                strong: ({node, ...props}) => <strong className="font-semibold text-gray-900" {...props} />,
              }}
            >
              {message}
            </ReactMarkdown>
          )}
        </div>
      </div>
    </motion.div>
  );
}
