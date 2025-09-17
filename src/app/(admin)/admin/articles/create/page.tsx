import CreateArticleForm from "@/features/create-article/ui/CreateArticleForm";
import { fetchCategory } from "@/entities/category/api/fetch-category";

const CreateArticle = async () => {
  const categories = await fetchCategory();

  return <CreateArticleForm categories={categories} />;
};

export default CreateArticle;
