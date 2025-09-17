import { fetchWorkbooks } from "@/entities/workbook/api/fetch-workbooks";
import AdminPageHeader from "@/widgets/admin/ui/AdminPageHeader";
import WorkbookManagement from "@/features/workbook-management/ui/WorkbookManagement";
import { Plus } from "lucide-react";

const WorkbooksAdminPage = async () => {
  const workbooks = await fetchWorkbooks();

  return (
    <div>
      <AdminPageHeader
        title="문제집 관리"
        description={`전체 ${workbooks?.length || 0}개의 문제집`}
        action={
          <button className="inline-flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors">
            <Plus className="w-4 h-4" />
            새 문제집
          </button>
        }
      />

      <WorkbookManagement initialWorkbooks={workbooks || []} />
    </div>
  );
};

export default WorkbooksAdminPage;