import { fetchWorkbooks } from "@/entities/workbook/api/fetch-workbooks";
import AdminHeader from "@/widgets/admin/ui/AdminHeader";
import WorkbookManagement from "@/widgets/workbook-management/ui/WorkbookManagement";
import { Plus } from "lucide-react";

const WorkbooksAdmin = async () => {
  const workbooks = await fetchWorkbooks();

  return (
    <div>
      <AdminHeader
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

export default WorkbooksAdmin;