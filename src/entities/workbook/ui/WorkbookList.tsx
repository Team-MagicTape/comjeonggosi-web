"use client";

import { Workbook } from "@/entities/workbook/types/workbook";
import WorkbookItem from "@/entities/workbook/ui/workbookItem";
import WorkbookSearch from "@/entities/workbook/ui/WorkbookSearch";
import { useWorkbookSearch } from "@/entities/workbook/model/useWorkbookSearch";
import { SearchIcon } from "lucide-react";

const WorkbookList = ({ workbooks }: { workbooks: Workbook[] }) => {
  const { filteredWorkbooks, setSearchQuery } = useWorkbookSearch(workbooks);

  return (
    <div className="w-full">
      {/* 검색 컴포넌트 */}
      <WorkbookSearch
        onSearch={setSearchQuery}
        placeholder="문제집 이름이나 설명으로 검색하세요..."
      />

      {/* 문제집 목록 */}
      {filteredWorkbooks.length === 0 ? (
        <div className="flex justify-center items-center min-h-[400px]">
          <div className="text-center">
            <SearchIcon />
            <p className="text-xl font-semibold text-gray-600 mb-2">
              {workbooks.length === 0
                ? "아직 문제집이 없습니다"
                : "검색 결과가 없습니다"}
            </p>
            <p className="text-gray-500">
              {workbooks.length === 0
                ? "새로운 문제집이 곧 추가될 예정입니다"
                : "다른 키워드로 검색해보세요"}
            </p>
          </div>
        </div>
      ) : (
        <>
          {/* 검색 결과 개수 표시 */}
          {workbooks.length !== filteredWorkbooks.length && (
            <div className="mb-4 text-sm text-gray-600">
              총 {workbooks.length}개 중 {filteredWorkbooks.length}개 문제집
            </div>
          )}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredWorkbooks.map((value) => (
              <WorkbookItem key={value.id} workbook={value} />
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default WorkbookList;
