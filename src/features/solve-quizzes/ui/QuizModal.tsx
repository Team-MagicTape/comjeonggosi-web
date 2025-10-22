"use client";

import { useEffect } from "react";
import { createPortal } from "react-dom";
import { X } from "lucide-react";

interface QuizModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

export const QuizModal = ({ isOpen, onClose, children }: QuizModalProps) => {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
      
      const handleEscape = (e: KeyboardEvent) => {
        if (e.key === "Escape") {
          onClose();
        }
      };
      
      window.addEventListener("keydown", handleEscape);
      
      return () => {
        document.body.style.overflow = "unset";
        window.removeEventListener("keydown", handleEscape);
      };
    }
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return createPortal(
    <div className="fixed inset-0 z-50 bg-white">
      {/* 헤더 */}
      <div className="h-16 border-b border-gray-200 flex items-center justify-between px-6">
        <h2 className="text-lg font-bold text-gray-900">퀴즈</h2>
        <button
          onClick={onClose}
          className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          aria-label="닫기"
        >
          <X className="w-5 h-5 text-gray-600" />
        </button>
      </div>

      {/* 컨텐츠 */}
      <div className="h-[calc(100vh-4rem)] overflow-y-auto">
        {children}
      </div>
    </div>,
    document.body
  );
};
