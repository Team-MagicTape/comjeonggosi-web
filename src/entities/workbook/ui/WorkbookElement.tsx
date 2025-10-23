"use client";

import { Workbook } from "../types/workbook";
import CustomLink from "@/shared/ui/CustomLink";

interface Props {
  workbook: Workbook;
}

const WorkbookElement = ({ workbook }: Props) => {
  return (
    <CustomLink
      href={`/workbooks/${workbook.id}`}
      className="w-full h-full p-4 transition-colors bg-white border border-gray-100 rounded-lg cursor-pointer lg:p-5 hover:border-gray-200 group"
    >
      <div className="flex flex-col h-full">
        {/* 상단: 문제집 정보 */}
        <div className="flex-1">
          <div className="flex items-start justify-between mb-4">
            <div className="flex-1">
              <h3 className="mb-2 text-lg font-semibold text-gray-900 line-clamp-2">
                {workbook.name}
              </h3>
              <p className="text-sm text-gray-600 line-clamp-2">
                {workbook.description}
              </p>
            </div>
          </div>
        </div>

        {/* 하단: 문제 수와 상태 */}
        <div className="flex items-center justify-between pt-4 border-t border-gray-100">
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-600">
              {workbook.quizCount || 0}개 문제
            </span>
          </div>
          <span className="text-sm text-gray-400">→</span>
        </div>
      </div>
    </CustomLink>
  );
};

export default WorkbookElement;
