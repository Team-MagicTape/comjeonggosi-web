"use client";

import { useState, useEffect } from "react";
import { Workbook } from "@/entities/workbook/types/workbook";
import AdminCard from "@/widgets/admin/ui/AdminCard";
import AdminEmptyState from "@/widgets/admin/ui/AdminEmptyState";
import { BookOpen, Search, Plus, Edit2, Trash2, Eye, Loader2 } from "lucide-react";
import { apiClient } from "@/shared/libs/custom-axios";
import { useCustomRouter } from "@/shared/model/useCustomRouter";

interface Props {
  initialWorkbooks: Workbook[];
}

const WorkbookManagement = ({ initialWorkbooks }: Props) => {
  const [workbooks, setWorkbooks] = useState(initialWorkbooks);
  const [filteredWorkbooks, setFilteredWorkbooks] = useState(initialWorkbooks);
  const [searchQuery, setSearchQuery] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isCreating, setIsCreating] = useState(false);
  const [newWorkbook, setNewWorkbook] = useState({ name: "", description: "" });
  const router = useCustomRouter();

  useEffect(() => {
    if (!searchQuery.trim()) {
      setFilteredWorkbooks(workbooks);
    } else {
      const query = searchQuery.toLowerCase();
      const filtered = workbooks.filter(
        (workbook) =>
          workbook.name.toLowerCase().includes(query) ||
          (workbook.description || "").toLowerCase().includes(query)
      );
      setFilteredWorkbooks(filtered);
    }
  }, [searchQuery, workbooks]);

  const handleCreate = async () => {
    if (!newWorkbook.name.trim()) return;

    setIsCreating(true);
    try {
      const { data } = await apiClient.post<Workbook>("/api/workbooks", newWorkbook);
      setWorkbooks([data, ...workbooks]);
      setNewWorkbook({ name: "", description: "" });
      setIsModalOpen(false);
    } catch {
      alert("문제집 생성에 실패했습니다.");
    } finally {
      setIsCreating(false);
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm("정말로 이 문제집을 삭제하시겠습니까?")) return;

    try {
      await apiClient.delete(`/api/workbooks/${id}`);
      setWorkbooks(workbooks.filter(w => w.id !== id));
    } catch {
      alert("문제집 삭제에 실패했습니다.");
    }
  };

  return (
    <>
      <div className="flex gap-4 mb-6">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="문제집 검색..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary"
          />
        </div>
        <button
          onClick={() => setIsModalOpen(true)}
          className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors flex items-center gap-2"
        >
          <Plus className="w-4 h-4" />
          새 문제집
        </button>
      </div>

      <AdminCard>
        {filteredWorkbooks.length === 0 ? (
          <AdminEmptyState
            icon={BookOpen}
            title={workbooks.length === 0 ? "문제집이 없습니다" : "검색 결과가 없습니다"}
            description={workbooks.length === 0 ? "새로운 문제집을 만들어보세요" : "다른 검색어로 시도해보세요"}
          />
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-100">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    문제집
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    설명
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    문제 수
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    관리
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {filteredWorkbooks.map((workbook) => (
                  <tr key={workbook.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4">
                      <div>
                        <div className="text-sm font-medium text-gray-900">
                          {workbook.name}
                        </div>
                        <div className="text-xs text-gray-500">
                          ID: {workbook.id}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm text-gray-600 max-w-xs truncate">
                        {workbook.description || "-"}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                        {workbook.quizIds.length}개
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center justify-end gap-1">
                        <button
                          onClick={() => router.push(`/workbook/${workbook.id}`)}
                          className="p-1.5 text-gray-600 hover:bg-gray-100 rounded transition-colors"
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => router.push(`/admin/workbooks/${workbook.id}`)}
                          className="p-1.5 text-blue-600 hover:bg-blue-50 rounded transition-colors"
                        >
                          <Edit2 className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDelete(workbook.id)}
                          className="p-1.5 text-red-600 hover:bg-red-50 rounded transition-colors"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </AdminCard>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <AdminCard className="w-full max-w-md">
            <div className="p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">
                새 문제집 만들기
              </h2>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    문제집 이름 <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={newWorkbook.name}
                    onChange={(e) => setNewWorkbook({ ...newWorkbook, name: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary"
                    placeholder="예: 운영체제 기초"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    설명
                  </label>
                  <textarea
                    value={newWorkbook.description}
                    onChange={(e) => setNewWorkbook({ ...newWorkbook, description: e.target.value })}
                    rows={3}
                    className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary resize-none"
                    placeholder="문제집에 대한 간단한 설명"
                  />
                </div>
              </div>

              <div className="flex gap-3 mt-6">
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="flex-1 px-4 py-2 border border-gray-200 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  취소
                </button>
                <button
                  onClick={handleCreate}
                  disabled={isCreating || !newWorkbook.name.trim()}
                  className={`flex-1 px-4 py-2 rounded-lg font-medium transition-colors flex items-center justify-center gap-2 ${
                    isCreating || !newWorkbook.name.trim()
                      ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                      : "bg-primary text-white hover:bg-primary/90"
                  }`}
                >
                  {isCreating ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      생성 중...
                    </>
                  ) : (
                    "생성하기"
                  )}
                </button>
              </div>
            </div>
          </AdminCard>
        </div>
      )}
    </>
  );
};

export default WorkbookManagement;
