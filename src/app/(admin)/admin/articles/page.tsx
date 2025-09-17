import { fetchArticles } from "@/entities/article/api/fetch-articles";
import AdminHeader from "@/widgets/admin/ui/AdminHeader";
import ArticleManagement from "@/features/article-management/ui/ArticleManagement";
import CustomLink from "@/shared/ui/CustomLink";
import { Plus } from "lucide-react";

const AdminArticles = async () => {
  const articles = await fetchArticles("0");

  return (
    <div>
      <AdminHeader
        title="아티클 관리"
        description={`전체 ${articles.length}개의 아티클`}
        action={
          <CustomLink
            href="/admin/articles/create"
            className="inline-flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors"
          >
            <Plus className="w-4 h-4" />
            새 아티클 작성
          </CustomLink>
        }
      />

      <ArticleManagement articles={articles} />
    </div>
  );
};

export default AdminArticles;
