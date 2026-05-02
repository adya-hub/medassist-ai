"use client";

import { useState, useRef, useEffect } from "react";
import { Send, Paperclip } from "lucide-react";
import { motion } from "framer-motion";

interface MessageInputProps {
  onSendMessage: (message: string) => void;
  onAttachClick: () => void;
  disabled?: boolean;
}

export default function MessageInput({ onSendMessage, onAttachClick, disabled }: MessageInputProps) {
  const [message, setMessage] = useState("");
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleSend = () => {
    if (message.trim() && !disabled) {
      onSendMessage(message.trim());
      setMessage("");
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  // Auto-resize textarea
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = `${Math.min(textareaRef.current.scrollHeight, 150)}px`;
    }
  }, [message]);

  return (
    <div className="w-full max-w-4xl mx-auto px-4 pb-6 pt-2">
      <motion.div 
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="relative flex items-end gap-2 bg-white rounded-3xl p-2 premium-shadow border border-gray-100 transition-all focus-within:border-green-300 focus-within:ring-4 focus-within:ring-green-50"
      >
        <button
          onClick={onAttachClick}
          disabled={disabled}
          className="p-3 text-gray-400 hover:text-green-600 transition-colors rounded-full hover:bg-gray-50 flex-shrink-0"
        >
          <Paperclip className="w-5 h-5" />
        </button>
        
        <textarea
          ref={textareaRef}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Ask MedAssist AI anything..."
          disabled={disabled}
          maxLength={800}
          className="w-full max-h-[150px] bg-transparent resize-none outline-none py-3 px-2 text-gray-800 placeholder:text-gray-400 m-0"
          rows={1}
        />
        
        <button
          onClick={handleSend}
          disabled={!message.trim() || disabled}
          className={`p-3 rounded-full flex-shrink-0 transition-all ${
            message.trim() && !disabled
              ? "bg-green-500 text-white hover:bg-green-600 shadow-md"
              : "bg-gray-100 text-gray-400"
          }`}
        >
          <Send className="w-5 h-5 ml-0.5" />
        </button>
      </motion.div>
    </div>
  );
}
