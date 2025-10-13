import { BarChart3 } from "lucide-react";
import { fetchInitialCategory } from "../api/fetch-initial-category";

const CategoryPerformance = async () => {
    const categoryPerformance = await fetchInitialCategory();

    return (
        <div>
            <div className="bg-white border border-gray-100 rounded-lg p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-gray-900">카테고리별 성과</h2>
            <BarChart3 className="w-5 h-5 text-gray-400" />
          </div>
          <div className="space-y-5">
            {categoryPerformance.map((category) => (
              <div key={category.categoryId} className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <p className="text-lg font-medium text-gray-900">{category.categoryName}</p>
                    <p className="text-sm text-gray-500">
                      {category.totalAttempts.toLocaleString()}회 응시
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-xl font-bold text-orange-600">
                      {category.averageScore.toFixed(1)}점
                    </p>
                  </div>
                </div>
                <div className="w-full bg-gray-100 rounded-full h-3.5">
                  <div
                    className="bg-gradient-to-r from-orange-500 to-orange-600 rounded-full h-3.5 transition-all duration-500"
                    style={{ width: `${category.averageScore}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
};

export default CategoryPerformance;
