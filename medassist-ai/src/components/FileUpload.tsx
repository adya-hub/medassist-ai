"use client";

import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { UploadCloud, X, File, Image as ImageIcon } from "lucide-react";

interface FileUploadProps {
  isOpen: boolean;
  onClose: () => void;
  onUpload: (file: File) => void;
}

export default function FileUpload({ isOpen, onClose, onUpload }: FileUploadProps) {
  const [isDragging, setIsDragging] = useState(false);

  const handleDrag = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setIsDragging(true);
    } else if (e.type === "dragleave") {
      setIsDragging(false);
    }
  }, []);

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      e.stopPropagation();
      setIsDragging(false);
      
      if (e.dataTransfer.files && e.dataTransfer.files[0]) {
        onUpload(e.dataTransfer.files[0]);
        onClose();
      }
    },
    [onUpload, onClose]
  );

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      onUpload(e.target.files[0]);
      onClose();
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-gray-900/40 backdrop-blur-sm z-50"
          />
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="w-full max-w-md bg-white rounded-3xl shadow-2xl pointer-events-auto overflow-hidden border border-gray-100"
            >
              <div className="flex items-center justify-between p-6 border-b border-gray-50">
                <h3 className="text-xl font-semibold text-gray-900">Upload Report</h3>
                <button
                  onClick={onClose}
                  className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="p-6">
                <div
                  onDragEnter={handleDrag}
                  onDragLeave={handleDrag}
                  onDragOver={handleDrag}
                  onDrop={handleDrop}
                  className={`
                    border-2 border-dashed rounded-2xl p-10 flex flex-col items-center justify-center gap-4 transition-all
                    ${isDragging ? "border-green-500 bg-green-50/50" : "border-gray-200 bg-gray-50/30 hover:bg-gray-50"}
                  `}
                >
                  <div className={`p-4 rounded-full ${isDragging ? "bg-green-100" : "bg-gray-100"}`}>
                    <UploadCloud className={`w-8 h-8 ${isDragging ? "text-green-600" : "text-gray-500"}`} />
                  </div>
                  
                  <div className="text-center space-y-1">
                    <p className="text-gray-800 font-medium">
                      Drag & drop your file here
                    </p>
                    <p className="text-sm text-gray-500">
                      Supports PDF, JPG, PNG (max 10MB)
                    </p>
                  </div>

                  <div className="relative mt-2">
                    <input
                      type="file"
                      id="file-upload"
                      className="sr-only"
                      accept=".pdf,image/*"
                      onChange={handleFileChange}
                    />
                    <label
                      htmlFor="file-upload"
                      className="px-6 py-2.5 bg-white border border-gray-200 text-gray-700 rounded-full text-sm font-medium hover:bg-gray-50 hover:text-green-600 hover:border-green-200 transition-all cursor-pointer shadow-sm inline-block"
                    >
                      Browse Files
                    </label>
                  </div>
                </div>

                <div className="mt-6 flex justify-center gap-6 text-sm text-gray-400">
                  <span className="flex items-center gap-1.5"><File className="w-4 h-4"/> PDF</span>
                  <span className="flex items-center gap-1.5"><ImageIcon className="w-4 h-4"/> Images</span>
                </div>
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}
