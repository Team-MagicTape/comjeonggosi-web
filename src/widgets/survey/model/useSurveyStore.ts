import { create } from "zustand";
import { persist } from "zustand/middleware";

interface SurveyStore {
  isVisible: boolean;
  setIsVisible: (visible: boolean) => void;
}

export const useSurveyStore = create<SurveyStore>()(
  persist(
    (set) => ({
      isVisible: true,
      setIsVisible: (visible) => set({ isVisible: visible }),
    }),
    {
      name: "survey-storage",
      storage: {
        getItem: (name) => {
          const value = sessionStorage.getItem(name);
          return value ? JSON.parse(value) : null;
        },
        setItem: (name, value) => {
          sessionStorage.setItem(name, JSON.stringify(value));
        },
        removeItem: (name) => {
          sessionStorage.removeItem(name);
        },
      },
    }
  )
);
