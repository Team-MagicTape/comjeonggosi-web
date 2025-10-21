"use client";

import { useState } from "react";
import {ChevronDown, ChevronUp } from "lucide-react";
import { Notice } from "../types/notice";

interface Props {
  notices: Notice[];
}

const NoticesList = ({ notices }: Props) => {
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const sortedNotices = [...notices].sort((a, b) => {
    return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
  });

  const toggleExpand = (id: string) => {
    setExpandedId(expandedId === id ? null : id);
  };

  return (
    <div className="w-full max-w-4xl mx-auto py-8 px-4">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">공지사항</h1>
        <p className="text-gray-600">
          컴정고시의 새로운 소식과 업데이트를 확인하세요
        </p>
      </div>

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
    </div>
  );
};

export default NoticesList;