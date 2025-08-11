"use client";

import { useTab } from "../model/useTab";
import { Tab } from "../types/tab";
import TabItem from "./TabItem";
import { Category } from "@/entities/category/types/category";

interface Props {
  tabs: Category[];
  selected: Category;
  setSelected: (selected: Category) => void;
}

const Tabs = ({ tabs, selected, setSelected }: Props) => {
  const handleClick = (tab: Category) => {
    if (tab.id !== selected.id) {
      setSelected(tab);
    }
  };

  return (
    <div className="flex items-center gap-2 flex-wrap">
      {tabs.map((item) => (
        <TabItem
          data={item}
          onClick={handleClick}
          isSelected={item.id === selected.id}
          key={item.id}
        />
      ))}
    </div>
  );
};


export default Tabs