import { Tab } from "@/widgets/tabs/types/tab";
import { create } from "zustand";

interface State {
  category: Tab;
  setCategory: (category: Tab) => void;
}

export const useArticleCategoryStore = create<State>((set) => ({
  category: { name: "디비", value: "1" },
  setCategory: (category) => set({ category }),
}));
