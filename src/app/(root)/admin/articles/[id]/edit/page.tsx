import EditArticleForm from "@/features/edit-article/ui/EditArticleForm";
import { PathParams } from "@/shared/types/path-params";
import { getArticleDetail } from "@/entities/article/api/get-article-detail";

const EditArticlePage = async ({ params }: PathParams) => {
  const article = await getArticleDetail(Number(params));

  if (!article) {
    return <div>게시글을 찾을 수 없습니다.</div>;
  }

  return (
    <div>
      <EditArticleForm articleId={Number(params)} article={article} />
    </div>
  );
};

export default EditArticlePage;
