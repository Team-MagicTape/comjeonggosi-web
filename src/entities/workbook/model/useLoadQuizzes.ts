import { Quiz } from "@/entities/quiz/types/quiz";
import { useState, useEffect } from "react";
import { Workbook } from "../types/workbook";
import { fetchWorkbookQuizzes } from "../api/fetch-workbook-quizzes";

const ITEMS_PER_SECTION = 25;

export const useLoadQuizzes = (workbook: Workbook) => {
  const [quizzesBySection, setQuizzesBySection] = useState<Record<number, Quiz[]>>({});

  const [loadedSections, setLoadedSections] = useState<Set<number>>(new Set());
  
  const [isInitialLoading, setIsInitialLoading] = useState(false);
  
  const [isLoadingSection, setIsLoadingSection] = useState<number | null>(null);

  const totalSections = Math.ceil(workbook.quizIds.length / ITEMS_PER_SECTION);

  const loadSection = async (sectionIndex: number) => {
    if (loadedSections.has(sectionIndex)) {
      return;
    }

    setIsLoadingSection(sectionIndex);
    
    try {
      const startIndex = sectionIndex * ITEMS_PER_SECTION;
      const endIndex = Math.min(startIndex + ITEMS_PER_SECTION, workbook.quizIds.length);
      const sectionQuizIds = workbook.quizIds.slice(startIndex, endIndex);

      const sectionQuizzes = await fetchWorkbookQuizzes(sectionQuizIds);
      
      setQuizzesBySection(prev => ({
        ...prev,
        [sectionIndex]: sectionQuizzes
      }));
      
      setLoadedSections(prev => new Set([...prev, sectionIndex]));
      
    } catch (error) {
      console.error(`구간 ${sectionIndex + 1} 퀴즈 로드 실패:`, error);
    } finally {
      setIsLoadingSection(null);
    }
  };
  useEffect(() => {
    const loadAllSectionsGradually = async () => {
      await loadSection(0);
      
      for (let i = 1; i < totalSections; i++) {
        setTimeout(() => {
          if (!loadedSections.has(i)) {
            loadSection(i);
          }
        }, i * 300);
      }
    };
    
    loadAllSectionsGradually();
  }, [workbook.id]);

  return {
    quizzesBySection,        
    isLoadingSection,      
    isInitialLoading,     
    loadedSections,          
    totalSections,           
    loadSection,             
  };
};