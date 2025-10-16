"use client";

import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import { Notice } from "../types/notice";
import { useDeleteNotice } from "@/features/delete-notice/model/useDeleteNotice";
import EditNotice from "@/features/edit-notice/ui/EditNotices";

interface Props {
  notices: Notice[];
}

const AdminNoticeList = ({ notices }: Props) => {
  const [localNotices, setLocalNotices] = useState(notices);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [noticeId, setNoticeId] = useState<string>("");
  const [expandedId, setExpandedId] = useState<string | null>(null);

  // 삭제 후 상태 갱신 콜백
  const { deleteNotice } = useDeleteNotice({
    onSuccess: () => {
      setLocalNotices(prev => prev.filter(n => n.id !== noticeId));
    },
  });

  const handleDelete = (id: string) => {
    setNoticeId(id);
    deleteNotice(id);
  };

  const toggleExpand = (id: string) => {
    setExpandedId(expandedId === id ? null : id);
  };

  const sortedNotices = [...localNotices].sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );

  return (
    <div className="w-full max-w-4xl mx-auto py-8 px-4">
      <div className="bg-white border border-gray-100 rounded-lg overflow-hidden">
        {sortedNotices.length === 0 ? (
          <div className="py-16 text-center">
            <p className="text-gray-400">등록된 공지사항이 없습니다</p>
          </div>
        ) : (
          <div className="divide-y divide-gray-100">
            {sortedNotices.map((notice) => (
              <div key={notice.id}>
                <button
                  onClick={() => toggleExpand(notice.id)}
                  className="w-full p-4 hover:bg-gray-50 transition-colors text-left"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex-1 min-w-0">
                      <h2 className="text-lg font-semibold text-gray-900 mb-2">
                        {notice.title}
                      </h2>
                      <p className="text-xs text-gray-400">
                        {new Date(notice.createdAt).toLocaleDateString('ko-KR', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric'
                        })}
                      </p>
                    </div>
                    <div className="flex justify-end gap-3">
                      <button
                        onClick={() => (setIsModalOpen(true), setNoticeId(notice.id))}
                        className="px-4 py-2 border border-primary text-black rounded-lg flex items-center gap-2 font-medium"
                      >
                        수정
                      </button>
                      <button
                        onClick={() => handleDelete(notice.id)}
                        className="px-4 py-2 bg-primary text-white rounded-lg flex items-center gap-2 font-medium"
                      >
                        삭제
                      </button>
                    </div>
                    {expandedId === notice.id ? (
                      <ChevronUp className="w-5 h-5 text-gray-400 shrink-0 mt-1" />
                    ) : (
                      <ChevronDown className="w-5 h-5 text-gray-400 shrink-0 mt-1" />
                    )}
                  </div>
                </button>

                {expandedId === notice.id && (
                  <div className="px-6 pb-6 pt-2">
                    <div className="text-gray-700 whitespace-pre-wrap leading-relaxed border-l-2 border-primary/20 pl-4">
                      {notice.content}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>

      <EditNotice
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
        noticeId={noticeId}
        Title={localNotices.find(n => n.id === noticeId)?.title || ""}
        Content={localNotices.find(n => n.id === noticeId)?.content || ""}
      />
    </div>
  );
};

export default AdminNoticeList;
