"use client";

import { useTab } from "../model/useTab";
import { Tab } from "../types/tab";
import TabItem from "./TabItem";

interface Props {
  tabs: Tab[];
  selected: Tab;
  setSelected: (selected: Tab) => void;
}

const Tabs = ({ tabs, selected, setSelected }: Props) => {
  const handleClick = useTab(selected, setSelected);

  return (
    <div className="flex items-center gap-2 flex-wrap">
      {
        tabs.map((item, idx) => (
          <TabItem data={item} onClick={handleClick} isSelected={item.value === selected.value} key={idx} />
        ))
      }
    </div>
  )
}

export default Tabs