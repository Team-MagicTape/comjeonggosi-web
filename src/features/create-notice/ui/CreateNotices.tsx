"use client";

import { useCreateNotices } from "../model/useCreateNotices";
import AdminCard from "@/widgets/admin/ui/AdminCard";

interface Props {
  isModalOpen: boolean;
  setIsModalOpen: (open: boolean) => void;
  onSuccess?: () => void; // 추가
}

const CreateNotices = ({ isModalOpen, setIsModalOpen, onSuccess }: Props) => {
  const { setTitle, setContent, handleNotices } = useCreateNotices({
    onSuccess,
  });

  if (!isModalOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <AdminCard className="w-full max-w-md h-auto">
        <form
          onSubmit={handleNotices}
          className="flex flex-col p-6 space-y-6"
        >
          <h2 className="text-lg font-semibold text-gray-900">
            공지사항 생성
          </h2>

          <div className="flex flex-col">
            <label className="text-sm font-medium text-gray-700 mb-1">
              제목 <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary"
              placeholder="공지사항 제목을 입력하세요"
            />
          </div>

          <div className="flex flex-col flex-1">
            <label className="text-sm font-medium text-gray-700 mb-1">
              내용
            </label>
            <textarea
              onChange={(e) => setContent(e.target.value)}
              className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary resize-none"
              placeholder="공지사항에 대한 간단한 설명"
              rows={13}
            />
          </div>

          <div className="flex gap-3 pt-2">
            <button
              type="button"
              onClick={() => setIsModalOpen(false)}
              className="flex-1 px-4 py-2 border border-gray-200 text-gray-700 rounded-lg hover:bg-gray-50 transition"
            >
              취소
            </button>
            <button
              type="submit"
              className="flex-1 px-4 py-2 bg-primary text-white rounded-lg hover:opacity-90 transition"
            >
              생성
            </button>
          </div>
        </form>
      </AdminCard>
    </div>
  );
};

export default CreateNotices;