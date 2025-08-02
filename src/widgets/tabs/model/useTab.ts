import { Tab } from "../types/tab";

export const useTab = (selected: Tab, setSelected: (selected: Tab) => void) => {
  const handleClick = (data: Tab) => {
    if(selected.value === data.value) {
      return;
    }

    setSelected(data);
  }

  return handleClick;
}