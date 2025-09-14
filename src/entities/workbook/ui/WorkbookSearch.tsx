"use client";

import { SearchIcon, X } from "lucide-react";
import { useState } from "react";

interface Props {
  onSearch: (query: string) => void;
  placeholder?: string;
}

const WorkbookSearch = ({
  onSearch,
  placeholder = "문제집 검색...",
}: Props) => {
  const [searchQuery, setSearchQuery] = useState("");

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchQuery(value);
    onSearch(value);
  };

  const clearSearch = () => {
    setSearchQuery("");
    onSearch("");
  };

  return (
    <div className="w-full max-w-md mx-auto mb-8">
      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <SearchIcon />
        </div>
        <input
          type="text"
          value={searchQuery}
          onChange={handleInputChange}
          placeholder={placeholder}
          className="w-full pl-10 pr-10 py-3 bg-white border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-200 text-gray-900 placeholder-gray-500"
        />
        {searchQuery && (
          <button
            onClick={clearSearch}
            className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600 transition-colors cursor-pointer"
          >
            <X />
          </button>
        )}
      </div>

      {searchQuery && (
        <div className="mt-2 text-sm text-gray-600 text-center">
          &ldquo;{searchQuery}&rdquo;에 대한 검색 결과
        </div>
      )}
    </div>
  );
};

export default WorkbookSearch;
