"use client";

import { Tab } from "../types/tab";

interface Props {
  data: Tab;
  onClick: (data: Tab) => void;
  isSelected: boolean;
}

const TabItem = ({ data, onClick, isSelected }: Props) => {
  return (
    <button
      onClick={() => onClick(data)}
      className={`text-sm font-medium py-1.5 px-3 rounded-md transition-colors cursor-pointer ${
        isSelected 
          ? "bg-primary text-white" 
          : "text-gray-600 hover:text-gray-900"
      }`}
    >
      {data.name}
    </button>
  );
};

export default TabItem;