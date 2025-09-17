"use client";

import { useState } from "react";
import AdminSidebar from "@/widgets/admin-sidebar/ui/AdminSidebar";
import { Menu } from "lucide-react";
import EditQuizModal from "@/widgets/edit-quiz-modal/ui/QuizModal";

interface Props {
  children: React.ReactNode;
}

export default function AdminLayoutContent({ children }: Props) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50">
      <AdminSidebar 
        isOpen={isSidebarOpen} 
        onClose={() => setIsSidebarOpen(false)} 
      />
      
      <div className="lg:ml-64">
        <header className="sticky top-0 z-10 bg-white border-b border-gray-200">
          <div className="px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
            <button
              onClick={() => setIsSidebarOpen(true)}
              className="lg:hidden p-2 rounded-md text-gray-600 hover:text-gray-900 hover:bg-gray-100"
            >
              <Menu className="w-5 h-5" />
            </button>
            
            <h1 className="text-lg font-semibold text-gray-900">
              관리자 대시보드
            </h1>
            
            <div className="w-10 lg:w-0" />
          </div>
        </header>
        
        <main className="p-4 sm:p-6 lg:p-8">
          {children}
        </main>
      </div>
      
      <EditQuizModal />
    </div>
  );
}
