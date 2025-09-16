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
    <div className="w-full mb-6">
      <div className="relative max-w-md">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <SearchIcon className="w-4 h-4 text-gray-400" />
        </div>
        <input
          type="text"
          value={searchQuery}
          onChange={handleInputChange}
          placeholder={placeholder}
          className="w-full pl-10 pr-10 py-2 bg-white border border-gray-200 rounded-lg focus:outline-none focus:border-gray-300 transition-colors text-gray-900 placeholder-gray-500 text-sm"
        />
        {searchQuery && (
          <button
            onClick={clearSearch}
            className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600 transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </div>

    </div>
  );
};

export default WorkbookSearch;
