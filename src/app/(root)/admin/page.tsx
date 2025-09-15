"use client";

import CustomLink from "@/shared/ui/CustomLink";
import {
  BookOpen,
  FileText,
  HelpCircle,
  Layers,
  Settings,
  Users,
} from "lucide-react";

const AdminPage = () => {
  const adminPages = [
    {
      title: "문제집 관리",
      description: "현재 있는 문제집 확인, 문제집 생성 및 퀴즈 추가",
      icon: BookOpen,
      href: "/admin/workbook",
      color: "bg-blue-500",
    },
    {
      title: "퀴즈 생성",
      description: "새로운 퀴즈 생성 페이지",
      icon: HelpCircle,
      href: "/admin/quizzes",
      color: "bg-green-500",
    },
    {
      title: "퀴즈 관리",
      description: "현재 있는 퀴즈 편집 및 삭제",
      icon: HelpCircle,
      href: "/admin/quizzes/edit",
      color: "bg-green-500",
    },
    {
      title: "아티클 추가",
      description: "학습 아티클을 작성",
      icon: FileText,
      href: "/admin/articles/create",
      color: "bg-purple-500",
    },
    {
      title: "아티클 삭제",
      description: "현재 존재하는 학습 아티클 확인 및 삭제",
      icon: FileText,
      href: "/admin/articles/create",
      color: "bg-purple-500",
    },
    {
      title: "카테고리 추가",
      description: "퀴즈 카테고리 생성",
      icon: Layers,
      href: "/admin/category",
      color: "bg-orange-500",
    },
    {
      title: "질문 생성",
      description: "질문 생성",
      icon: Users,
      href: "/admin/questions",
      color: "bg-red-500",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* 헤더 */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center mb-4">
            <Settings className="w-12 h-12 text-primary mr-3" />
            <h1 className="text-4xl font-bold text-gray-900">
              관리자 대시보드
            </h1>
          </div>
          <p className="text-xl text-gray-600">
            컴정고시 플랫폼의 모든 콘텐츠를 관리할 수 있습니다
          </p>
        </div>

        {/* 관리 페이지 그리드 */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {adminPages.map((page) => {
            const IconComponent = page.icon;
            return (
              <CustomLink
                key={page.href}
                href={page.href}
                className="group block bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
              >
                <div className="p-6">
                  <div className="flex items-center mb-4">
                    <div
                      className={`p-3 rounded-lg ${page.color} text-white mr-4`}
                    >
                      <IconComponent className="w-6 h-6" />
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900 group-hover:text-primary transition-colors">
                      {page.title}
                    </h3>
                  </div>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    {page.description}
                  </p>
                  <div className="mt-4 flex items-center text-primary text-sm font-medium">
                    관리하기
                    <svg
                      className="w-4 h-4 ml-1 transition-transform group-hover:translate-x-1"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                  </div>
                </div>
              </CustomLink>
            );
          })}
        </div>
        
      </div>
    </div>
  );
};

export default AdminPage;
