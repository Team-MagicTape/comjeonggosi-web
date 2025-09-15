"use client";

import { apiClient } from "@/shared/libs/custom-axios";
import { ChangeEvent, useState } from "react";
import { ArrowLeft } from "lucide-react";
import CustomLink from "@/shared/ui/CustomLink";

const CreateCategory = () => {
  const [data, setData] = useState({ name: "", description: "" });
  const [isLoading, setIsLoading] = useState(false);

  const handleData = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { value, name } = e.target;
    setData((prev) => ({ ...prev, [name]: value }));
  };

  const submit = async () => {
    if (!data.name.trim()) {
      alert("카테고리 이름을 입력해주세요.");
      return;
    }

    setIsLoading(true);
    try {
      await apiClient.post("/api/admin/categories", data);
      alert("카테고리 등록 성공");
      setData({ name: "", description: "" });
    } catch {
      alert("카테고리 등록 실패");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-8 p-6 bg-white rounded-xl shadow-lg border border-gray-100">
      {/* 뒤로가기 버튼 */}
      <div className="mb-6">
        <CustomLink
          href="/admin"
          className="inline-flex items-center text-gray-600 hover:text-primary transition-colors"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          관리자 대시보드로 돌아가기
        </CustomLink>
      </div>

      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">카테고리 생성</h2>
        <p className="text-gray-600 text-sm">새로운 카테고리를 추가해보세요</p>
      </div>

      <div className="space-y-4">
        <div>
          <label
            htmlFor="name"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            카테고리 이름 <span className="text-red-500">*</span>
          </label>
          <input
            id="name"
            type="text"
            placeholder="카테고리 이름을 입력하세요"
            name="name"
            value={data.name}
            onChange={handleData}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
            disabled={isLoading}
          />
        </div>

        <div>
          <label
            htmlFor="description"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            설명
          </label>
          <textarea
            id="description"
            placeholder="카테고리에 대한 설명을 입력하세요 (선택사항)"
            name="description"
            value={data.description}
            onChange={handleData}
            rows={3}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors resize-none"
            disabled={isLoading}
          />
        </div>
      </div>

      <button
        onClick={submit}
        disabled={isLoading || !data.name.trim()}
        className={`w-full mt-6 py-2 px-4 rounded-lg font-medium transition-all duration-200 ${
          isLoading || !data.name.trim()
            ? "bg-gray-300 text-gray-500 cursor-not-allowed"
            : "bg-blue-600 text-white hover:bg-blue-700 active:bg-blue-800 shadow-md hover:shadow-lg"
        }`}
      >
        {isLoading ? (
          <div className="flex items-center justify-center">
            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
            등록 중...
          </div>
        ) : (
          "카테고리 생성"
        )}
      </button>

      <p className="text-xs text-gray-500 mt-3 text-center">* 필수 입력 항목</p>
    </div>
  );
};

export default CreateCategory;
