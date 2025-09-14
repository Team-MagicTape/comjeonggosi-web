"use client";

import { apiClient } from "@/shared/libs/custom-axios";
import { Workbook } from "@/entities/workbook/types/workbook";
import { useState, useEffect, ChangeEvent } from "react";
import { BookOpen, Plus, Search, Loader2 } from "lucide-react";

const WorkbookAdmin = () => {
  // 워크북 리스트 상태
  const [workbooks, setWorkbooks] = useState<Workbook[]>([]);
  const [filteredWorkbooks, setFilteredWorkbooks] = useState<Workbook[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoadingWorkbooks, setIsLoadingWorkbooks] = useState(true);

  // 워크북 생성 상태
  const [newWorkbook, setNewWorkbook] = useState({
    name: "",
    description: "",
  });
  const [isCreating, setIsCreating] = useState(false);

  // 퀴즈 추가 상태
  const [selectedWorkbookId, setSelectedWorkbookId] = useState<number | null>(
    null
  );
  const [newQuizId, setNewQuizId] = useState("");
  const [isAddingQuiz, setIsAddingQuiz] = useState(false);

  // 워크북 목록 로드
  const loadWorkbooks = async () => {
    setIsLoadingWorkbooks(true);
    try {
      const { data } = await apiClient.get<Workbook[]>("/api/workbooks");
      setWorkbooks(data || []);
      setFilteredWorkbooks(data || []);
    } catch (error) {
      console.error("워크북 로드 실패:", error);
      setWorkbooks([]);
      setFilteredWorkbooks([]);
    } finally {
      setIsLoadingWorkbooks(false);
    }
  };

  // 검색 기능
  const handleSearch = (query: string) => {
    setSearchQuery(query);
    if (!query.trim()) {
      setFilteredWorkbooks(workbooks);
    } else {
      const lowercasedQuery = query.toLowerCase();
      const filtered = workbooks.filter(
        (workbook) =>
          workbook.name.toLowerCase().includes(lowercasedQuery) ||
          workbook.description.toLowerCase().includes(lowercasedQuery)
      );
      setFilteredWorkbooks(filtered);
    }
  };

  // 워크북 생성
  const handleWorkbookChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setNewWorkbook((prev) => ({ ...prev, [name]: value }));
  };

  const createWorkbook = async () => {
    if (!newWorkbook.name.trim()) {
      alert("워크북 이름을 입력해주세요.");
      return;
    }

    setIsCreating(true);
    try {
      await apiClient.post("/api/workbooks", newWorkbook);
      alert("워크북이 성공적으로 생성되었습니다!");
      setNewWorkbook({ name: "", description: "" });
      await loadWorkbooks(); // 목록 새로고침
    } catch (error) {
      console.error("워크북 생성 실패:", error);
      alert("워크북 생성에 실패했습니다.");
    } finally {
      setIsCreating(false);
    }
  };

  // 퀴즈 추가
  const addQuizToWorkbook = async () => {
    if (!selectedWorkbookId || !newQuizId.trim()) {
      alert("워크북과 퀴즈 ID를 모두 선택/입력해주세요.");
      return;
    }

    setIsAddingQuiz(true);
    try {
      await apiClient.post(`/api/workbooks/${selectedWorkbookId}/quizzes`, {
        quizId: newQuizId.trim(),
      });
      alert("퀴즈가 성공적으로 추가되었습니다!");
      setNewQuizId("");
      setSelectedWorkbookId(null);
      await loadWorkbooks(); // 목록 새로고침
    } catch (error) {
      console.error("퀴즈 추가 실패:", error);
      alert("퀴즈 추가에 실패했습니다.");
    } finally {
      setIsAddingQuiz(false);
    }
  };

  useEffect(() => {
    loadWorkbooks();
  }, []);

  return (
    <div className="max-w-6xl mx-auto mt-8 p-6 space-y-8">
      {/* 헤더 */}
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">워크북 관리</h1>
        <p className="text-gray-600">워크북을 생성하고 퀴즈를 관리해보세요</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* 워크북 생성 섹션 */}
        <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-6">
          <div className="flex items-center mb-4">
            <Plus className="w-5 h-5 text-blue-600 mr-2" />
            <h2 className="text-xl font-bold text-gray-800">워크북 생성</h2>
          </div>

          <div className="space-y-4">
            <div>
              <label
                htmlFor="workbook-name"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                워크북 이름 <span className="text-red-500">*</span>
              </label>
              <input
                id="workbook-name"
                type="text"
                placeholder="워크북 이름을 입력하세요"
                name="name"
                value={newWorkbook.name}
                onChange={handleWorkbookChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                disabled={isCreating}
              />
            </div>

            <div>
              <label
                htmlFor="workbook-description"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                설명
              </label>
              <textarea
                id="workbook-description"
                placeholder="워크북에 대한 설명을 입력하세요 (선택사항)"
                name="description"
                value={newWorkbook.description}
                onChange={handleWorkbookChange}
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors resize-none"
                disabled={isCreating}
              />
            </div>
          </div>

          <button
            onClick={createWorkbook}
            disabled={isCreating || !newWorkbook.name.trim()}
            className={`w-full mt-6 py-2 px-4 rounded-lg font-medium transition-all duration-200 ${
              isCreating || !newWorkbook.name.trim()
                ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                : "bg-blue-600 text-white hover:bg-blue-700 active:bg-blue-800 shadow-md hover:shadow-lg"
            }`}
          >
            {isCreating ? (
              <div className="flex items-center justify-center">
                <Loader2 className="w-4 h-4 animate-spin mr-2" />
                생성 중...
              </div>
            ) : (
              "워크북 생성"
            )}
          </button>
        </div>

        {/* 퀴즈 추가 섹션 */}
        <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-6">
          <div className="flex items-center mb-4">
            <BookOpen className="w-5 h-5 text-green-600 mr-2" />
            <h2 className="text-xl font-bold text-gray-800">퀴즈 추가</h2>
          </div>

          <div className="space-y-4">
            <div>
              <label
                htmlFor="select-workbook"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                워크북 선택 <span className="text-red-500">*</span>
              </label>
              <select
                id="select-workbook"
                value={selectedWorkbookId || ""}
                onChange={(e) =>
                  setSelectedWorkbookId(e.target.value ? Number(e.target.value) : null)
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-colors"
                disabled={isAddingQuiz || isLoadingWorkbooks}
              >
                <option value="">워크북을 선택하세요</option>
                {workbooks.map((workbook) => (
                  <option key={workbook.id} value={workbook.id}>
                    {workbook.name} (퀴즈 {workbook.quizIds.length}개)
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label
                htmlFor="quiz-id"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                퀴즈 ID <span className="text-red-500">*</span>
              </label>
              <input
                id="quiz-id"
                type="text"
                placeholder="추가할 퀴즈 ID를 입력하세요"
                value={newQuizId}
                onChange={(e) => setNewQuizId(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-colors"
                disabled={isAddingQuiz}
              />
            </div>
          </div>

          <button
            onClick={addQuizToWorkbook}
            disabled={isAddingQuiz || !selectedWorkbookId || !newQuizId.trim()}
            className={`w-full mt-6 py-2 px-4 rounded-lg font-medium transition-all duration-200 ${
              isAddingQuiz || !selectedWorkbookId || !newQuizId.trim()
                ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                : "bg-green-600 text-white hover:bg-green-700 active:bg-green-800 shadow-md hover:shadow-lg"
            }`}
          >
            {isAddingQuiz ? (
              <div className="flex items-center justify-center">
                <Loader2 className="w-4 h-4 animate-spin mr-2" />
                추가 중...
              </div>
            ) : (
              "퀴즈 추가"
            )}
          </button>
        </div>
      </div>

      {/* 워크북 목록 섹션 */}
      <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-gray-800">워크북 목록</h2>
          <button
            onClick={loadWorkbooks}
            disabled={isLoadingWorkbooks}
            className="px-4 py-2 text-sm bg-gray-100 text-gray-600 rounded-lg hover:bg-gray-200 transition-colors disabled:opacity-50"
          >
            {isLoadingWorkbooks ? "로딩..." : "새로고침"}
          </button>
        </div>

        {/* 검색 */}
        <div className="mb-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              placeholder="워크북 이름이나 설명으로 검색..."
              value={searchQuery}
              onChange={(e) => handleSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </div>

        {/* 워크북 목록 */}
        {isLoadingWorkbooks ? (
          <div className="flex justify-center items-center py-12">
            <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
          </div>
        ) : filteredWorkbooks.length === 0 ? (
          <div className="text-center py-12">
            <BookOpen className="w-12 h-12 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-500 text-lg mb-2">
              {workbooks.length === 0
                ? "아직 워크북이 없습니다"
                : "검색 결과가 없습니다"}
            </p>
            <p className="text-gray-400 text-sm">
              {workbooks.length === 0
                ? "새로운 워크북을 생성해보세요"
                : "다른 키워드로 검색해보세요"}
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {/* 검색 결과 개수 */}
            {workbooks.length !== filteredWorkbooks.length && (
              <div className="text-sm text-gray-600 mb-4">
                총 {workbooks.length}개 중 {filteredWorkbooks.length}개 워크북
              </div>
            )}

            {/* 워크북 카드들 */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredWorkbooks.map((workbook) => (
                <div
                  key={workbook.id}
                  className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow"
                >
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="font-semibold text-gray-800 text-lg truncate">
                      {workbook.name}
                    </h3>
                    <span className="text-xs bg-blue-100 text-blue-600 px-2 py-1 rounded-full whitespace-nowrap ml-2">
                      ID: {workbook.id}
                    </span>
                  </div>

                  {workbook.description && (
                    <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                      {workbook.description}
                    </p>
                  )}

                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-500">
                      퀴즈 {workbook.quizIds.length}개
                    </span>
                    {workbook.quizIds.length > 0 && (
                      <div className="text-xs text-gray-400">
                        ID: {workbook.quizIds.slice(0, 3).join(", ")}
                        {workbook.quizIds.length > 3 && "..."}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      <p className="text-xs text-gray-500 text-center">* 필수 입력 항목</p>
    </div>
  );
};

export default WorkbookAdmin;
