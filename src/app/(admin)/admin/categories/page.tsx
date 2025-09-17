import { fetchCategories } from "@/entities/category/api/fetch-categories";
import AdminHeader from "@/widgets/admin/ui/AdminHeader";
import CategoryManagement from "@/features/category-management/ui/CategoryManagement";

const CategoriesAdmin = async () => {
  const categories = await fetchCategories();

  return (
    <div>
      <AdminHeader
        title="카테고리 관리"
        description={`전체 ${categories.length}개의 카테고리`}
      />

      <CategoryManagement initialCategories={categories} />
    </div>
  );
};

export default CategoriesAdmin;