import { Tab } from "@/widgets/tabs/types/tab";
import { create } from "zustand";

interface State {
  category: Tab | null;
  setCategory: (category: Tab | null) => void;
}

export const useArticleCategoryStore = create<State>((set) => ({
  category: null,
  setCategory: (category) => set({ category }),
}));
