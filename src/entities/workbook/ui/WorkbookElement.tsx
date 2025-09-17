"use client"

import { Workbook } from "../types/workbook";
import CustomLink from "@/shared/ui/CustomLink";

interface Props {
  workbook: Workbook;
}

const WorkbookElement = ({ workbook }: Props) => {
  return (
    <CustomLink
      href={`/workbooks/${workbook.id}`}
      className="w-full h-full bg-white rounded-lg border border-gray-100 p-4 lg:p-5 hover:border-gray-200 transition-colors group cursor-pointer"
    >
      <div className="flex flex-col h-full">
        {/* 상단: 문제집 정보 */}
        <div className="flex-1">
          <div className="flex items-start justify-between mb-4">
            <div className="flex-1">
              <h3 className="font-semibold text-lg text-gray-900 mb-2 line-clamp-2">
                {workbook.name}
              </h3>
              <p className="text-gray-600 text-sm line-clamp-2">
                {workbook.description}
              </p>
            </div>
          </div>
        </div>

        {/* 하단: 문제 수와 상태 */}
        <div className="flex items-center justify-between pt-4 border-t border-gray-100">
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-600">
              {workbook.quizIds.length}개 문제
            </span>
          </div>
          <span className="text-sm text-gray-400">
            →
          </span>
        </div>
      </div>
    </CustomLink>
  );
};

export default WorkbookElement;
