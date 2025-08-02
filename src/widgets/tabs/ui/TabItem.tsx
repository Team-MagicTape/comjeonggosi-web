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
      className={`text-sm font-semibold py-1 px-3 rounded-full cursor-pointer ${
        isSelected ? "bg-primary text-white" : "bg-bg text-gray"
      }`}
    >
      {data.name}
    </button>
  );
};

export default TabItem;
