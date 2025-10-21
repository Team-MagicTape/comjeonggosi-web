"use client";

import { useEffect, useState } from "react";
import CustomLink from "@/shared/ui/CustomLink";
import { fetchNotices } from "../api/fetch-notices";
import { Notice } from "../types/notice";

const MainNotice = () => {
  const [notices, setNotices] = useState<Notice[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadNotices = async () => {
      try {
        const data = await fetchNotices();
        setNotices(data); 
      } catch (error) {
        console.error("공지사항 로딩 실패:", error);
      } finally {
        setIsLoading(false);
      }
    };

    loadNotices();
  }, []);

  return (
    <div className="w-full bg-white border border-gray-100 rounded-lg p-4 lg:p-6 mt-5">
      {/* 상단 제목 + 전체보기 */}
      <div className="flex items-center justify-between mb-3">
        <h2 className="text-lg font-semibold">공지사항</h2>
        <CustomLink
          href="/notices"
          className="text-sm text-primary font-medium hover:underline cursor-pointer"
        >
          전체보기 →
        </CustomLink>
      </div>

      <div className="space-y-2 max-h-44 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100">
        {isLoading ? (
          Array.from({ length: 3 }).map((_, idx) => (
            <div key={idx} className="p-2 rounded animate-pulse">
              <div className="h-5 bg-gray-200 rounded w-3/4"></div>
            </div>
          ))
        ) : notices.length === 0 ? (
          <div className="p-4 text-center">
            <p className="text-sm text-gray-400">등록된 공지사항이 없습니다</p>
          </div>
        ) : (
          <CustomLink
            href="/notices"
            className="flex flex-col gap-2 p-2 rounded hover:bg-gray-50 transition-colors group"
          >
            {notices.slice(0, 5).map((notice, index) => (
              <div key={notice.id} className="flex min-w-0 gap-5">
                <p className="text-sm text-primary font-bold">{index + 1}</p>
                <p className="text-sm text-gray-900 group-hover:text-primary transition-colors truncate">
                  {notice.title}
                </p>
              </div>
            ))}
          </CustomLink>
        )}
      </div>
    </div>
  );
};

export default MainNotice;
