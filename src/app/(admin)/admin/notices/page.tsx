"use client";

import { useEffect, useState } from "react";
import CreateNotices from "@/features/create-notice/ui/CreateNotices";
import AdminCard from "@/widgets/admin/ui/AdminCard";
import AdminHeader from "@/widgets/admin/ui/AdminHeader";
import { Plus } from "lucide-react";
import AdminNoticeList from "@/entities/notices/ui/AdminNoticeList";
import { fetchNotices } from "@/entities/notices/api/fetch-notices";
import { Notice } from "@/entities/notices/types/notice";

const Notices = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [notices, setNotices] = useState<Notice[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      try {
        const data = await fetchNotices();
        setNotices(data);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  return (
    <div>
      <AdminHeader
        title="공지사항 관리"
        description="공지사항을 생성하고 복원합니다"
      />

      <div className="space-y-6">
        <AdminCard className="p-6">
          <div className="mb-6 flex items-center justify-between">
            <p className="text-xl font-semibold text-gray-900">
              공지사항 목록
            </p>

            <div className="flex justify-end">
              <button
                onClick={() => setIsModalOpen(true)}
                className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors flex items-center gap-2 font-medium"
              >
                <Plus className="w-4 h-4" />
                공지사항 작성
              </button>
            </div>
          </div>

          {loading ? (
            <p>로딩 중...</p>
          ) : (
            <AdminNoticeList notices={notices} />
          )}
        </AdminCard>
      </div>

      <CreateNotices
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
      />
    </div>
  );
};

export default Notices;
