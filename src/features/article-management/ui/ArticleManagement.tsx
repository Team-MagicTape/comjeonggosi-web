"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Article } from "@/entities/article/types/article";
import AdminCard from "@/widgets/admin/ui/AdminCard";
import AdminEmptyState from "@/widgets/admin/ui/AdminEmptyState";
import { FileText, Search, Eye, Edit2, Trash2 } from "lucide-react";
import CustomLink from "@/shared/ui/CustomLink";
import { apiClient } from "@/shared/libs/custom-axios";

interface Props {
  articles: Article[];
}

const ArticleManagement = ({ articles }: Props) => {
  const router = useRouter();
  const [filteredArticles, setFilteredArticles] = useState(articles);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");

  const categories = Array.from(
    new Set(articles.map(article => article.category.name))
  );

  useEffect(() => {
    let filtered = articles;

    if (selectedCategory !== "all") {
      filtered = filtered.filter(article => article.category.name === selectedCategory);
    }

    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        article =>
          article.title.toLowerCase().includes(query) ||
          article.content.toLowerCase().includes(query)
      );
    }

    setFilteredArticles(filtered);
  }, [searchQuery, selectedCategory, articles]);

  const handleDelete = async (id: number) => {
    if (!confirm("정말로 이 아티클을 삭제하시겠습니까?")) return;

    try {
      await apiClient.delete(`/api/articles/${id}`);
      router.refresh();
    } catch {
      alert("아티클 삭제에 실패했습니다.");
    }
  };

  return (
    <>
      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="아티클 검색..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary"
          />
        </div>
        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary"
        >
          <option value="all">모든 카테고리</option>
          {categories.map(category => (
            <option key={category} value={category}>{category}</option>
          ))}
        </select>
      </div>

      <AdminCard className="overflow-hidden">
        {filteredArticles.length === 0 ? (
          <AdminEmptyState
            icon={FileText}
            title="아티클이 없습니다"
            description="검색 조건을 변경하거나 새 아티클을 작성해보세요"
          />
        ) : (
          <div className="divide-y divide-gray-100">
            {filteredArticles.map((article) => (
              <div key={article.id} className="p-4 hover:bg-gray-50 transition-colors">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1 min-w-0">
                    <h3 className="font-medium text-gray-900 mb-1 truncate">
                      {article.title}
                    </h3>
                    <p className="text-sm text-gray-600 line-clamp-2 mb-2">
                      {article.content}
                    </p>
                    <div className="flex items-center gap-4 text-xs text-gray-500">
                      <span className="px-2 py-0.5 bg-gray-100 text-gray-700 rounded-full">
                        {article.category.name}
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center gap-1 flex-shrink-0">
                    <CustomLink
                      href={`/articles/${article.id}`}
                      className="p-1.5 text-gray-600 hover:bg-gray-100 rounded transition-colors"
                    >
                      <Eye className="w-4 h-4" />
                    </CustomLink>
                    <CustomLink
                      href={`/admin/articles/${article.id}/edit`}
                      className="p-1.5 text-blue-600 hover:bg-blue-50 rounded transition-colors"
                    >
                      <Edit2 className="w-4 h-4" />
                    </CustomLink>
                    <button
                      onClick={() => handleDelete(article.id)}
                      className="p-1.5 text-red-600 hover:bg-red-50 rounded transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </AdminCard>
    </>
  );
};

export default ArticleManagement;
