import { Quiz } from "@/entities/quiz/types/quiz";
import { useState, useEffect } from "react";
import { Workbook } from "../types/workbook";
import { fetchWorkbookQuizzes } from "../api/fetch-workbook-quizzes";

const ITEMS_PER_SECTION = 25; // 구간당 문제 수

export const useLoadQuizzes = (workbook: Workbook) => {
  // 구간별로 퀴즈를 저장하는 객체 (구간 인덱스를 키로 사용)
  const [quizzesBySection, setQuizzesBySection] = useState<Record<number, Quiz[]>>({});
  
  // 로드된 구간들을 추적하는 Set
  const [loadedSections, setLoadedSections] = useState<Set<number>>(new Set());
  
  // 전체 초기 로딩 상태
  const [isInitialLoading, setIsInitialLoading] = useState(false);
  
  // 현재 로딩 중인 구간 (개별 구간 로딩용)
  const [isLoadingSection, setIsLoadingSection] = useState<number | null>(null);

  // 전체 구간 수 계산
  const totalSections = Math.ceil(workbook.quizIds.length / ITEMS_PER_SECTION);

  // 모든 구간을 한 번에 로드하는 함수
  const loadAllSections = async () => {
    if (workbook.quizIds.length === 0) return;
    
    setIsInitialLoading(true);
    
    try {
      // 모든 퀴즈를 한 번에 가져오기
      const allQuizzes = await fetchWorkbookQuizzes(workbook.quizIds);
      
      // 구간별로 나누어 저장
      const sectionData: Record<number, Quiz[]> = {};
      const loadedSectionSet = new Set<number>();
      
      for (let i = 0; i < totalSections; i++) {
        const startIndex = i * ITEMS_PER_SECTION;
        const endIndex = Math.min(startIndex + ITEMS_PER_SECTION, allQuizzes.length);
        sectionData[i] = allQuizzes.slice(startIndex, endIndex);
        loadedSectionSet.add(i);
      }
      
      setQuizzesBySection(sectionData);
      setLoadedSections(loadedSectionSet);
      
    } catch (error) {
      console.error("전체 퀴즈 로드 실패:", error);
    } finally {
      setIsInitialLoading(false);
    }
  };

  // 특정 구간의 퀴즈들을 로드하는 함수 (fallback용)
  const loadSection = async (sectionIndex: number) => {
    // 이미 로드된 구간이면 리턴
    if (loadedSections.has(sectionIndex)) {
      return;
    }

    setIsLoadingSection(sectionIndex);
    
    try {
      // 해당 구간의 퀴즈 ID 범위 계산
      const startIndex = sectionIndex * ITEMS_PER_SECTION;
      const endIndex = Math.min(startIndex + ITEMS_PER_SECTION, workbook.quizIds.length);
      const sectionQuizIds = workbook.quizIds.slice(startIndex, endIndex);
      
      // API 호출하여 퀴즈 데이터 가져오기
      const sectionQuizzes = await fetchWorkbookQuizzes(sectionQuizIds);
      
      // 구간별 퀴즈 데이터 저장
      setQuizzesBySection(prev => ({
        ...prev,
        [sectionIndex]: sectionQuizzes
      }));
      
      // 로드된 구간으로 표시
      setLoadedSections(prev => new Set([...prev, sectionIndex]));
      
    } catch (error) {
      console.error(`구간 ${sectionIndex + 1} 퀴즈 로드 실패:`, error);
    } finally {
      setIsLoadingSection(null);
    }
  };

  // 워크북이 변경되면 상태 초기화 및 모든 구간 미리 로드
  useEffect(() => {
    setQuizzesBySection({});
    setLoadedSections(new Set());
    setIsLoadingSection(null);
    
    // 모든 구간을 백그라운드에서 미리 로드
    loadAllSections();
  }, [workbook.id]);

  return {
    quizzesBySection,        // 구간별 퀴즈 데이터
    isLoadingSection,        // 현재 로딩 중인 구간 번호 (개별 로딩용)
    isInitialLoading,        // 전체 초기 로딩 상태
    loadedSections,          // 로드된 구간들
    totalSections,           // 전체 구간 수
    loadSection,             // 구간 로드 함수 (fallback용)
  };
};