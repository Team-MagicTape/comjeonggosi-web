"use client";

import { useState, ChangeEvent } from "react";
import { apiClient } from "@/shared/libs/custom-axios";
import { Category } from "@/entities/category/types/category";
import AdminCard from "@/widgets/admin/ui/AdminCard";
import AdminEmptyState from "@/widgets/admin/ui/AdminEmptyState";
import { Plus, Trash2, Edit2, Check, X, FolderOpen, Loader2 } from "lucide-react";

interface Props {
  initialCategories: Category[];
}

const CategoryManagement = ({ initialCategories }: Props) => {
  const [categories, setCategories] = useState(initialCategories);
  const [newCategory, setNewCategory] = useState({ name: "", description: "" });
  const [isCreating, setIsCreating] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editingData, setEditingData] = useState({ name: "", description: "" });

  const handleNewCategoryChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewCategory(prev => ({ ...prev, [name]: value }));
  };

  const handleEditChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setEditingData(prev => ({ ...prev, [name]: value }));
  };

  const createCategory = async () => {
    if (!newCategory.name.trim()) return;

    setIsCreating(true);
    try {
      const { data } = await apiClient.post<Category>("/api/admin/categories", newCategory);
      setCategories([...categories, data]);
      setNewCategory({ name: "", description: "" });
    } catch {
      alert("카테고리 생성에 실패했습니다.");
    } finally {
      setIsCreating(false);
    }
  };

  const startEdit = (category: Category) => {
    setEditingId(category.id);
    setEditingData({ name: category.name, description: category.description || "" });
  };

  const cancelEdit = () => {
    setEditingId(null);
    setEditingData({ name: "", description: "" });
  };

  const saveEdit = async (id: number) => {
    try {
      await apiClient.put(`/api/admin/categories/${id}`, editingData);
      setCategories(categories.map(cat => 
        cat.id === id ? { ...cat, ...editingData } : cat
      ));
      setEditingId(null);
    } catch {
      alert("카테고리 수정에 실패했습니다.");
    }
  };

  const deleteCategory = async (id: number) => {
    if (!confirm("정말로 이 카테고리를 삭제하시겠습니까?")) return;

    try {
      await apiClient.delete(`/api/admin/categories/${id}`);
      setCategories(categories.filter(cat => cat.id !== id));
    } catch {
      alert("카테고리 삭제에 실패했습니다.");
    }
  };

  return (
    <div className="space-y-6">
      <AdminCard className="p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">새 카테고리 추가</h2>
        
        <div className="flex gap-3">
          <input
            type="text"
            name="name"
            placeholder="카테고리 이름"
            value={newCategory.name}
            onChange={handleNewCategoryChange}
            className="flex-1 px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary"
            disabled={isCreating}
          />
          <input
            type="text"
            name="description"
            placeholder="설명 (선택사항)"
            value={newCategory.description}
            onChange={handleNewCategoryChange}
            className="flex-1 px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary"
            disabled={isCreating}
          />
          <button
            onClick={createCategory}
            disabled={isCreating || !newCategory.name.trim()}
            className={`px-4 py-2 rounded-lg font-medium transition-colors flex items-center gap-2 ${
              isCreating || !newCategory.name.trim()
                ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                : "bg-primary text-white hover:bg-primary/90"
            }`}
          >
            {isCreating ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                추가 중...
              </>
            ) : (
              <>
                <Plus className="w-4 h-4" />
                추가
              </>
            )}
          </button>
        </div>
      </AdminCard>

      <AdminCard className="overflow-hidden">
        <div className="p-6 border-b border-gray-100">
          <h2 className="text-lg font-semibold text-gray-900">카테고리 목록</h2>
          <p className="text-sm text-gray-600 mt-1">전체 {categories.length}개의 카테고리</p>
        </div>
        
        {categories.length === 0 ? (
          <AdminEmptyState
            icon={FolderOpen}
            title="카테고리가 없습니다"
            description="새로운 카테고리를 추가해보세요"
          />
        ) : (
          <div className="divide-y divide-gray-100">
            {categories.map((category) => (
              <div key={category.id} className="p-4 hover:bg-gray-50">
                {editingId === category.id ? (
                  <div className="flex items-center gap-3">
                    <input
                      type="text"
                      name="name"
                      value={editingData.name}
                      onChange={handleEditChange}
                      className="flex-1 px-3 py-1.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary"
                    />
                    <input
                      type="text"
                      name="description"
                      value={editingData.description}
                      onChange={handleEditChange}
                      className="flex-1 px-3 py-1.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary"
                    />
                    <button
                      onClick={() => saveEdit(category.id)}
                      className="p-1.5 text-green-600 hover:bg-green-50 rounded"
                    >
                      <Check className="w-4 h-4" />
                    </button>
                    <button
                      onClick={cancelEdit}
                      className="p-1.5 text-gray-600 hover:bg-gray-100 rounded"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                ) : (
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-medium text-gray-900">{category.name}</h3>
                      {category.description && (
                        <p className="text-sm text-gray-600 mt-0.5">{category.description}</p>
                      )}
                    </div>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => startEdit(category)}
                        className="p-1.5 text-blue-600 hover:bg-blue-50 rounded transition-colors"
                      >
                        <Edit2 className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => deleteCategory(category.id)}
                        className="p-1.5 text-red-600 hover:bg-red-50 rounded transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ))
          }
          </div>
        )}
      </AdminCard>
    </div>
  );
};

export default CategoryManagement;
