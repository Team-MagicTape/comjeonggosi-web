import EditArticleForm from "@/features/edit-article/ui/EditArticleForm";
import { PathParams } from "@/shared/types/path-params";
import { getArticleDetail } from "@/entities/article/api/get-article-detail";

const EditArticlePage = async ({ params }: PathParams) => {
  const { id } = await params;
  const articleId = Number(id);
  const article = await getArticleDetail(articleId);

  if (!article) {
    return <div>게시글을 찾을 수 없습니다.</div>;
  }

  return (
    <div className="h-full">
      <EditArticleForm articleId={Number(params)} article={article} />
    </div>
  );
};

export default EditArticlePage;
