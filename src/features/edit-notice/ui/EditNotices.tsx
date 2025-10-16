"use client";

import { useEditNotices } from "../model/useEditNotices";
import AdminCard from "@/widgets/admin/ui/AdminCard";
import { X } from "lucide-react";
import { useState, useEffect } from "react";
import { toast } from "@/shared/providers/ToastProvider";

interface Props {
  isModalOpen: boolean;
  setIsModalOpen: (open: boolean) => void;
  noticeId: string;
  Title: string;
  Content: string;
}

const EditNotice = ({
  isModalOpen,
  setIsModalOpen,
  noticeId,
  Title,
  Content,
}: Props) => {
  const { setId, setTitle, setContent, handleNotices } = useEditNotices();
  const [title, setTitleValue] = useState(Title);
  const [content, setContentValue] = useState(Content);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // 모달 열릴 때 초기값 세팅
  useEffect(() => {
    if (isModalOpen) {
      setTitleValue(Title);
      setContentValue(Content);
    }
  }, [isModalOpen, Title, Content]);

  if (!isModalOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!title.trim()) {
      toast.warning("제목을 입력해주세요.");
      return;
    }

    setId(noticeId);
    setTitle(title);
    setContent(content);
    setIsSubmitting(true);

    try {
      // 실제 API 호출 + 성공 시 모달 닫기
      await handleNotices(() => {
        setIsModalOpen(false);
      });
    } catch (error) {
      toast.error("공지사항 수정에 실패했습니다.");
      console.error("Edit notice error:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <AdminCard className="w-full max-w-md">
        <form className="p-6" onSubmit={handleSubmit}>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-900">
              공지사항 수정
            </h2>
            <button
              type="button"
              onClick={() => setIsModalOpen(false)}
              className="p-1 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                제목 <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitleValue(e.target.value)}
                className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary"
                placeholder="제목을 입력하세요"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                내용
              </label>
              <textarea
                value={content}
                onChange={(e) => setContentValue(e.target.value)}
                className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary resize-none"
                placeholder="내용을 입력하세요"
                rows={13}
              />
            </div>
          </div>

          <div className="flex gap-3 mt-6">
            <button
              type="button"
              onClick={() => setIsModalOpen(false)}
              className="flex-1 px-4 py-2 border border-gray-200 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium"
              disabled={isSubmitting}
            >
              취소
            </button>
            <button
              type="submit"
              className={`flex-1 px-4 py-2 rounded-lg font-medium transition-colors flex items-center justify-center gap-2 ${
                !title.trim()
                  ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                  : "bg-primary text-white hover:bg-primary/90"
              }`}
              disabled={isSubmitting || !title.trim()}
            >
              {isSubmitting ? "수정 중..." : "수정"}
            </button>
          </div>
        </form>
      </AdminCard>
    </div>
  );
};

export default EditNotice;
