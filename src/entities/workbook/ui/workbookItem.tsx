import React from "react";
import { Workbook } from "../types/workbook";
import CustomLink from "@/shared/ui/CustomLink";

const WorkbookItem = ({ workbook }: { workbook: Workbook }) => {
  return (
    <CustomLink
      href={`/workbook/${workbook.id}`}
      className="w-full h-full bg-white rounded-2xl border border-border p-6 hover:shadow-md transition-all duration-200 hover:scale-[1.02] group"
    >
      <div className="flex flex-col h-full">
        {/* 상단: 문제집 정보 */}
        <div className="flex-1">
          <div className="flex items-start justify-between mb-4">
            <div className="flex-1">
              <h3 className="font-bold text-xl text-gray-900 mb-2 group-hover:text-primary transition-colors line-clamp-2">
                {workbook.name}
              </h3>
              <p className="text-gray-600 text-sm line-clamp-3 leading-relaxed">
                {workbook.description}
              </p>
            </div>
          </div>
        </div>

        {/* 하단: 문제 수와 상태 */}
        <div className="flex items-center justify-between pt-4 border-t border-gray-100">
          <div className="flex items-center gap-2">
            <div className="h-7 bg-primary inline-flex items-center justify-center rounded-full px-3">
              <span className="text-white font-semibold text-sm">
                {workbook.quizIds.length}문제
              </span>
            </div>
            <div className="h-7 bg-[#f1f3f4] inline-flex items-center justify-center rounded-full px-3">
              <span className="text-[#858586] font-semibold text-sm">
                문제집
              </span>
            </div>
          </div>
          <div className="flex items-center text-gray-400 group-hover:text-primary transition-colors">
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </div>
        </div>
      </div>
    </CustomLink>
  );
};

export default WorkbookItem;
