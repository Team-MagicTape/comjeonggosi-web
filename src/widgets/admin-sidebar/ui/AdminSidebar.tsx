"use client";

import { usePathname } from "next/navigation";
import CustomLink from "@/shared/ui/CustomLink";
import { 
  LayoutDashboard, 
  FileText, 
  BookOpen, 
  CircleHelp,
  ListTodo,
  FolderOpen,
  LogOut,
  Bell,
  X
} from "lucide-react";
import Image from "next/image";

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

const AdminSidebar = ({ isOpen, onClose }: Props) => {
  const pathname = usePathname();

  const menuItems = [
    {
      label: "대시보드",
      href: "/admin",
      icon: LayoutDashboard,
    },
    {
      label: "아티클 관리",
      href: "/admin/articles",
      icon: FileText,
    },
    {
      label: "문제집 관리",
      href: "/admin/workbooks",
      icon: BookOpen,
    },
    {
      label: "퀴즈 관리",
      href: "/admin/quizzes",
      icon: CircleHelp,
    },
    {
      label: "카테고리 관리",
      href: "/admin/categories",
      icon: FolderOpen,
    },
    {
      label: "문제 관리",
      href: "/admin/questions",
      icon: ListTodo,
    },
    {
      label: "공지 관리",
      href: "/admin/notices",
      icon: Bell,
    },
  ];

  const isActive = (href: string) => {
    if (href === "/admin") {
      return pathname === href;
    }
    return pathname.startsWith(href);
  };

  return (
    <>
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={onClose}
        />
      )}
      
      <aside
        className={`fixed inset-y-0 left-0 z-50 w-64 bg-white border-r border-gray-200 transform transition-transform duration-200 ease-in-out lg:translate-x-0 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex flex-col h-full">
          <div className="px-6 py-4 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <CustomLink href="/" className="block">
                <Image
                  src="/assets/logo.svg"
                  alt="comjeonggosi"
                  width={140}
                  height={40}
                  className="h-8 w-auto"
                />
              </CustomLink>
              <button
                onClick={onClose}
                className="lg:hidden p-1 rounded-md text-gray-600 hover:text-gray-900 hover:bg-gray-100"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>
          
          <nav className="flex-1 px-4 py-4 overflow-y-auto">
            <ul className="space-y-1">
              {menuItems.map((item) => (
                <li key={item.href}>
                  <CustomLink
                    href={item.href}
                    className={`flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-lg transition-colors ${
                      isActive(item.href)
                        ? "bg-primary/10 text-primary"
                        : "text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                    }`}
                  >
                    <item.icon className="w-5 h-5" />
                    {item.label}
                  </CustomLink>
                </li>
              ))}
            </ul>
          </nav>
          
          <div className="p-4 border-t border-gray-200">
            <CustomLink
              href="/"
              className="flex items-center gap-3 px-3 py-2 text-sm font-medium text-gray-700 rounded-lg hover:bg-gray-100 hover:text-gray-900 transition-colors"
            >
              <LogOut className="w-5 h-5" />
              사이트로 돌아가기
            </CustomLink>
          </div>
        </div>
      </aside>
    </>
  );
};

export default AdminSidebar;
