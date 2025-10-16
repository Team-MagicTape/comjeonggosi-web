import { Quiz } from "@/entities/quiz/types/quiz";
import { useState, useEffect, useRef } from "react";
import { Workbook } from "../types/workbook";
import { fetchWorkbookQuizzes } from "../api/fetch-workbook-quizzes";

const ITEMS_PER_SECTION = 25;

export const useLoadQuizzes = (workbook: Workbook) => {
  const [quizzesBySection, setQuizzesBySection] = useState<Record<number, Quiz[]>>({});
  const [loadedSections, setLoadedSections] = useState<Set<number>>(new Set());
  const [isInitialLoading, setIsInitialLoading] = useState(true); // ✅ true로 시작
  const [isLoadingSection, setIsLoadingSection] = useState<number | null>(null);
  
  const loadedSectionsRef = useRef<Set<number>>(new Set()); // ✅ ref로 추적

  const totalSections = Math.ceil(workbook.quizIds.length / ITEMS_PER_SECTION);

  const loadSection = async (sectionIndex: number) => {
    if (loadedSectionsRef.current.has(sectionIndex)) {
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
      
      loadedSectionsRef.current.add(sectionIndex); 
      setLoadedSections(new Set(loadedSectionsRef.current));
      
    } catch (error) {
      console.error(`구간 ${sectionIndex + 1} 퀴즈 로드 실패:`, error);
    } finally {
      setIsLoadingSection(null);
    }
  };

  useEffect(() => {
    const loadAllSectionsGradually = async () => {
      if (totalSections === 0) {
        setIsInitialLoading(false); 
        return;
      }

      await loadSection(0);
      setIsInitialLoading(false);
      
      for (let i = 1; i < totalSections; i++) {
        setTimeout(() => {
          if (!loadedSectionsRef.current.has(i)) {
            loadSection(i);
          }
        }, i * 300);
      }
    };
    
    loadedSectionsRef.current.clear();
    setLoadedSections(new Set());
    setQuizzesBySection({});
    setIsInitialLoading(true);
    
    loadAllSectionsGradually();
  }, [workbook.id, totalSections]);

  return {
    quizzesBySection,        
    isLoadingSection,      
    isInitialLoading,     
    loadedSections,          
    totalSections,           
    loadSection,             
  };
};