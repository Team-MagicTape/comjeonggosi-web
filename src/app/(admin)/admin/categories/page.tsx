import { fetchCategories } from "@/entities/category/api/fetch-categories";
import AdminPageHeader from "@/widgets/admin/ui/AdminPageHeader";
import CategoryManagement from "@/features/category-management/ui/CategoryManagement";

const CategoriesAdminPage = async () => {
  const categories = await fetchCategories();

  return (
    <div>
      <AdminPageHeader
        title="카테고리 관리"
        description={`전체 ${categories.length}개의 카테고리`}
      />

      <CategoryManagement initialCategories={categories} />
    </div>
  );
};

export default CategoriesAdminPage;