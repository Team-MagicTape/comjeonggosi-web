import { BookOpen, FileText, CircleHelp, FolderOpen } from "lucide-react";
import CustomLink from "@/shared/ui/CustomLink";
import { fetchInitialStates } from "@/entities/dashboard/api/fetch-initial-states";
import States from "@/entities/dashboard/ui/Stats";
import UserGrowth from "@/entities/dashboard/ui/UserGrowth";
import CategoryPerformance from "@/entities/dashboard/ui/CategoryPerformance";
import SubscriptionState from "@/entities/dashboard/ui/SubscriptionState";

const Admin = async () => {
  const initialStats = await fetchInitialStates({ period: "day" });

  const quickActions = [
    {
      title: "새 아티클 작성",
      description: "학습 콘텐츠를 추가합니다",
      icon: FileText,
      href: "/admin/articles/create",
    },
    {
      title: "퀴즈 생성",
      description: "새로운 퀴즈를 만듭니다",
      icon: CircleHelp,
      href: "/admin/quizzes",
    },
    {
      title: "문제집 관리",
      description: "문제집을 생성하고 관리합니다",
      icon: BookOpen,
      href: "/admin/workbooks",
    },
    {
      title: "카테고리 설정",
      description: "카테고리를 추가하고 편집합니다",
      icon: FolderOpen,
      href: "/admin/categories",
    },
  ];

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">대시보드</h1>
        <p className="text-gray-600">
          컴정고시 관리자 페이지에 오신 것을 환영합니다
        </p>
      </div>

      <States initialStats={initialStats} />

      <div className="mb-8">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">빠른 실행</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {quickActions.map((action) => (
            <CustomLink
              key={action.href}
              href={action.href}
              className="group bg-white border border-gray-100 rounded-lg p-4 hover:border-gray-200 transition-colors"
            >
              <div className="flex items-start gap-3">
                <div className="p-2 bg-primary/10 rounded-lg group-hover:bg-primary/20 transition-colors">
                  <action.icon className="w-5 h-5 text-primary" />
                </div>
                <div className="flex-1">
                  <h3 className="font-medium text-gray-900 mb-1">
                    {action.title}
                  </h3>
                  <p className="text-sm text-gray-600">{action.description}</p>
                </div>
              </div>
            </CustomLink>
          ))}
        </div>
      </div>
      <div className="grid grid-rows-1 gap-8 mb-8">
        <UserGrowth />
        <CategoryPerformance />
        <SubscriptionState />
      </div>
    </div>
  );
};

export default Admin;
