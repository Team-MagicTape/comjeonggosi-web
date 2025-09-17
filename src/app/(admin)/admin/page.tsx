import {
  BookOpen,
  FileText,
  CircleHelp,
  FolderOpen,
  BarChart3,
  TrendingUp,
  Users,
} from "lucide-react";
import CustomLink from "@/shared/ui/CustomLink";

const Admin = async () => {
  const stats = [
    {
      label: "전체 아티클",
      value: "156",
      change: "+12%",
      icon: FileText,
    },
    {
      label: "전체 문제집",
      value: "24",
      change: "+8%",
      icon: BookOpen,
    },
    {
      label: "전체 퀴즈",
      value: "1,234",
      change: "+15%",
      icon: CircleHelp,
    },
    {
      label: "활성 사용자",
      value: "3,456",
      change: "+24%",
      icon: Users,
    },
  ];

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
        <p className="text-gray-600">컴정고시 관리자 페이지에 오신 것을 환영합니다</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {stats.map((stat) => (
          <div key={stat.label} className="bg-white border border-gray-100 rounded-lg p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="p-2 bg-gray-100 rounded-lg">
                <stat.icon className="w-5 h-5 text-gray-700" />
              </div>
              <span className="text-sm font-medium text-green-600">{stat.change}</span>
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-1">{stat.value}</h3>
            <p className="text-sm text-gray-600">{stat.label}</p>
          </div>
        ))}
      </div>

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
                  <h3 className="font-medium text-gray-900 mb-1">{action.title}</h3>
                  <p className="text-sm text-gray-600">{action.description}</p>
                </div>
              </div>
            </CustomLink>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white border border-gray-100 rounded-lg p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-900">최근 활동</h2>
            <BarChart3 className="w-5 h-5 text-gray-400" />
          </div>
          <div className="space-y-3">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="flex items-center justify-between py-2 border-b border-gray-50 last:border-0">
                <div>
                  <p className="text-sm font-medium text-gray-900">새 퀴즈 추가됨</p>
                  <p className="text-xs text-gray-500">2분 전</p>
                </div>
                <span className="text-xs px-2 py-1 bg-green-100 text-green-700 rounded-full">생성</span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white border border-gray-100 rounded-lg p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-900">인기 콘텐츠</h2>
            <TrendingUp className="w-5 h-5 text-gray-400" />
          </div>
          <div className="space-y-3">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="flex items-center justify-between py-2">
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-900">운영체제 기초 개념</p>
                  <p className="text-xs text-gray-500">조회수 1,234회</p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium text-primary">+23%</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Admin;
