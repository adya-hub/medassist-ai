"use client";

import { useState, useRef, useEffect } from "react";
import ChatBubble from "./ChatBubble";
import MessageInput from "./MessageInput";
import SuggestionChips from "./SuggestionChips";
import FileUpload from "./FileUpload";
import AnalysisCard from "./AnalysisCard";
import Disclaimer from "./Disclaimer";
import { Activity, Trash2 } from "lucide-react";

type Message = {
  id: string;
  text: string;
  isUser: boolean;
  fileName?: string;
  isAnalyzing?: boolean;
};

export default function ChatInterface() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isUploadOpen, setIsUploadOpen] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const fetchWithTimeout = async (url: string, options: RequestInit, timeout = 30000) => {
    const controller = new AbortController();
    const id = setTimeout(() => controller.abort(), timeout);
    const response = await fetch(url, {
      ...options,
      signal: controller.signal  
    });
    clearTimeout(id);
    return response;
  };

  const handleSendMessage = async (text: string, retryCount = 0) => {
    if (text.length > 800) {
      alert("Please limit your message to 800 characters.");
      return;
    }

    if (retryCount === 0) {
      const newMessage: Message = { id: Date.now().toString(), text, isUser: true };
      setMessages((prev) => [...prev, newMessage]);
    }
    
    setIsTyping(true);
    
    // Prepare history
    const history = messages.filter(m => !m.fileName && !m.isAnalyzing).map(m => ({
      role: m.isUser ? "user" : "model",
      text: m.text
    }));

    const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5001";

    try {
      const response = await fetchWithTimeout(`${API_URL}/chat`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: text, history })
      });
      const data = await response.json();
      
      const aiResponse: Message = {
        id: (Date.now() + 1).toString(),
        text: data.reply || "Sorry, I couldn't process that.",
        isUser: false,
      };
      setMessages((prev) => [...prev, aiResponse]);
    } catch (error: any) {
      console.error(error);
      if (retryCount < 1 && error.name !== 'AbortError') {
        // Retry once
        return handleSendMessage(text, retryCount + 1);
      }
      
      const errorMsg: Message = {
        id: (Date.now() + 1).toString(),
        text: "Error connecting to the server or request timed out. Please try again.",
        isUser: false,
      };
      setMessages((prev) => [...prev, errorMsg]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleFileUpload = async (file: File) => {
    const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5001";
    // 10 MB limit check
    if (file.size > 10 * 1024 * 1024) {
      alert("File size exceeds 10MB limit. Please upload a smaller file.");
      return;
    }

    const fileName = file.name;
    const uploadMessage: Message = {
      id: Date.now().toString(),
      text: `Uploaded report: ${fileName}`,
      isUser: true,
    };
    
    const analysisMessage: Message = {
      id: (Date.now() + 1).toString(),
      text: "",
      isUser: false,
      fileName,
      isAnalyzing: true,
    };

    setMessages((prev) => [...prev, uploadMessage, analysisMessage]);
    setIsTyping(true);

    try {
      const formData = new FormData();
      formData.append("report", file);

      const response = await fetchWithTimeout(`${API_URL}/analyze`, {
        method: "POST",
        body: formData,
      }, 45000); // 45s timeout for analysis
      
      const data = await response.json();

      setMessages((prev) => 
        prev.map((msg) => 
          msg.id === analysisMessage.id 
            ? { ...msg, isAnalyzing: false, text: data.result || "Failed to analyze" } 
            : msg
        )
      );
    } catch (error) {
      console.error(error);
      setMessages((prev) => 
        prev.map((msg) => 
          msg.id === analysisMessage.id 
            ? { ...msg, isAnalyzing: false, text: "Error analyzing the file. Server might be busy." } 
            : msg
        )
      );
    } finally {
      setIsTyping(false);
    }
  };

  const clearChat = () => {
    if (window.confirm("Are you sure you want to clear the chat history?")) {
      setMessages([]);
    }
  };

  return (
    <div className="flex-1 flex flex-col w-full max-w-5xl mx-auto relative h-[calc(100vh-4rem)]">
      
      {/* Top Action Bar */}
      {messages.length > 0 && (
        <div className="absolute top-4 right-4 z-10">
          <button 
            onClick={clearChat}
            className="flex items-center gap-2 px-3 py-1.5 text-xs font-medium text-red-600 bg-red-50 hover:bg-red-100 rounded-full transition-colors border border-red-100"
          >
            <Trash2 className="w-3.5 h-3.5" />
            Clear Chat
          </button>
        </div>
      )}

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto px-4 py-8 space-y-6">
        {messages.length === 0 ? (
          <div className="h-full flex flex-col items-center justify-center pt-10 pb-20">
            <div className="w-16 h-16 bg-green-50 rounded-2xl flex items-center justify-center mb-6 shadow-sm">
              <Activity className="w-8 h-8 text-green-500" />
            </div>
            <h1 className="text-2xl sm:text-3xl font-semibold text-gray-900 mb-2">
              Hello, I'm MedAssist <span className="text-gray-400 font-light">AI</span>
            </h1>
            <p className="text-gray-500 text-center max-w-md mb-8">
              I can help explain medical reports, answer health queries, and guide you. How can I assist you today?
            </p>
            <SuggestionChips onSelect={handleSendMessage} />
          </div>
        ) : (
          <div className="max-w-4xl mx-auto w-full pt-6">
            {messages.map((msg) => {
              if (msg.fileName && !msg.isUser) {
                return (
                  <div key={msg.id} className="flex justify-start mb-6">
                    <AnalysisCard 
                      fileName={msg.fileName} 
                      isAnalyzing={!!msg.isAnalyzing} 
                      resultText={msg.text} 
                    />
                  </div>
                );
              }
              return (
                <ChatBubble 
                  key={msg.id} 
                  message={msg.text} 
                  isUser={msg.isUser} 
                />
              );
            })}
            
            {isTyping && (
              <div className="flex justify-start mb-6">
                <div className="flex gap-3">
                  <div className="shrink-0 w-8 h-8 rounded-full bg-white shadow-sm border border-gray-100 flex items-center justify-center mt-1">
                    <Activity className="w-4 h-4 text-green-500" />
                  </div>
                  <div className="px-5 py-4 rounded-2xl bg-white border border-gray-50 text-gray-800 rounded-tl-sm premium-shadow flex items-center gap-1.5">
                    <span className="w-2 h-2 bg-gray-300 rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
                    <span className="w-2 h-2 bg-gray-300 rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
                    <span className="w-2 h-2 bg-gray-300 rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} className="h-4" />
          </div>
        )}
      </div>

      {/* Input Area */}
      <div className="sticky bottom-0 w-full bg-gradient-to-t from-gray-50 via-gray-50 to-transparent pt-10">
        <MessageInput 
          onSendMessage={handleSendMessage} 
          onAttachClick={() => setIsUploadOpen(true)} 
          disabled={isTyping}
        />
        <Disclaimer />
      </div>

      <FileUpload 
        isOpen={isUploadOpen} 
        onClose={() => setIsUploadOpen(false)} 
        onUpload={handleFileUpload} 
      />
    </div>
  );
}
