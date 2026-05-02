"use client";

import { motion } from "framer-motion";
import { FileText, CheckCircle, Info, Copy, Check } from "lucide-react";
import ReactMarkdown from "react-markdown";
import { useState } from "react";

interface AnalysisCardProps {
  fileName: string;
  isAnalyzing: boolean;
  resultText?: string;
}

export default function AnalysisCard({ fileName, isAnalyzing, resultText }: AnalysisCardProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    if (resultText) {
      navigator.clipboard.writeText(resultText);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  if (isAnalyzing) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-[85%] sm:max-w-[75%] bg-white rounded-2xl p-6 premium-shadow border border-gray-50 mb-6"
      >
        <div className="flex items-center gap-4 mb-4">
          <div className="w-12 h-12 bg-green-50 rounded-xl flex items-center justify-center">
            <FileText className="w-6 h-6 text-green-500 animate-pulse" />
          </div>
          <div>
            <h4 className="font-semibold text-gray-800">{fileName}</h4>
            <p className="text-sm text-gray-500 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-green-500 animate-ping"></span>
              Analyzing report...
            </p>
          </div>
        </div>
        <div className="space-y-3 mt-6">
          <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
            <motion.div 
              className="h-full bg-green-500 rounded-full"
              initial={{ width: "0%" }}
              animate={{ width: "100%" }}
              transition={{ duration: 3, ease: "linear" }}
            />
          </div>
          <div className="flex justify-between text-xs text-gray-400">
            <span>Sending to AI</span>
            <span>Generating Insights</span>
          </div>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.4 }}
      className="w-full max-w-[85%] sm:max-w-[75%] bg-white rounded-2xl overflow-hidden premium-shadow border border-gray-100 mb-6 relative group"
    >
      <div className="p-4 border-b border-gray-50 bg-gray-50/50 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <FileText className="w-5 h-5 text-green-600" />
          <span className="font-medium text-gray-800 text-sm">{fileName}</span>
        </div>
        <button
          onClick={handleCopy}
          className="p-1.5 text-gray-400 hover:text-green-600 bg-white rounded-md transition-colors border border-gray-100 shadow-sm"
          title="Copy to clipboard"
        >
          {copied ? <Check className="w-3.5 h-3.5 text-green-500" /> : <Copy className="w-3.5 h-3.5" />}
        </button>
      </div>
      
      <div className="p-6 space-y-4">
        {!resultText ? (
          <p className="text-gray-600 text-sm">Failed to generate insights. Please try again.</p>
        ) : (
          <div className="text-gray-700 text-[15px] leading-relaxed markdown-body">
            <ReactMarkdown
              components={{
                p: ({node, ...props}) => <p className="mb-3 last:mb-0" {...props} />,
                ul: ({node, ...props}) => <ul className="list-disc pl-5 mb-3 space-y-1" {...props} />,
                ol: ({node, ...props}) => <ol className="list-decimal pl-5 mb-3 space-y-1" {...props} />,
                h1: ({node, ...props}) => <h1 className="text-xl font-bold mt-4 mb-2 text-gray-900" {...props} />,
                h2: ({node, ...props}) => {
                  const idText = (props.children?.toString() || "").toLowerCase();
                  if (idText.includes("when to see a doctor")) {
                    return (
                      <div className="bg-red-50 border border-red-100 rounded-t-xl p-3 mt-5 flex items-center gap-2">
                        <Info className="w-5 h-5 text-red-500" />
                        <h2 className="text-md font-bold text-red-800 m-0" {...props} />
                      </div>
                    );
                  }
                  if (idText.includes("summary")) {
                    return (
                      <h2 className="text-md font-bold mt-4 mb-2 text-green-700 flex items-center gap-2 border-b border-gray-100 pb-1">
                        <CheckCircle className="w-4 h-4" /> {props.children}
                      </h2>
                    );
                  }
                  return <h2 className="text-md font-bold mt-4 mb-2 text-green-700 border-b border-gray-100 pb-1" {...props} />;
                },
                h3: ({node, ...props}) => <h3 className="text-base font-semibold mt-3 mb-1 text-gray-800" {...props} />,
                strong: ({node, ...props}) => <strong className="font-semibold text-gray-900" {...props} />,
              }}
            >
              {resultText}
            </ReactMarkdown>
          </div>
        )}
      </div>
    </motion.div>
  );
}
