"use client";

import { Workbook } from "@/entities/workbook/types/workbook";
import WorkbookSearch from "@/entities/workbook/ui/WorkbookSearch";
import { useWorkbookSearch } from "@/entities/workbook/model/useWorkbookSearch";
import { SearchIcon } from "lucide-react";
import WorkbookElement from "./WorkbookElement";

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
        <div className="flex justify-center items-center py-20">
          <div className="text-center">
            <p className="text-gray-400 text-sm">
              {workbooks.length === 0
                ? "아직 등록된 문제집이 없습니다"
                : "검색 결과가 없습니다"}
            </p>
          </div>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredWorkbooks.map((value) => (
              <WorkbookElement key={value.id} workbook={value} />
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default WorkbookList;
