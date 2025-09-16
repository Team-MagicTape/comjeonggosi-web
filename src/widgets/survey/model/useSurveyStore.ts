import { create } from "zustand";
import { persist } from "zustand/middleware";

interface SurveyState {
  isVisible: boolean;
  setIsVisible: (isVisible: boolean) => void;
}

export const useSurveyStore = create<SurveyState>()(
  persist(
    (set) => ({
      isVisible: true,
      setIsVisible: (isVisible) => set({ isVisible }),
    }),
    {
      name: "survey-storage",
      storage: {
        getItem: (name) => {
          const str = sessionStorage.getItem(name);
          return str ? JSON.parse(str) : null;
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
