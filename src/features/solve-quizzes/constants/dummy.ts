import { Quiz } from "@/entities/quiz/types/quiz";

export const QUIZ_DATA: Quiz[] = [
  {
    id: "1231231231",
    content: "React에서 상태를 관리하기 위해 사용하는 Hook은?",
    options: ["useEffect", "useState", "useContext", "useCallback"],
    answer: "useState",
    category: {
      id: 1,
      description: "웹웹웹",
      name: "웹프로그래밍"
    }
  },
  {
    id: "52435423523",
    content: "JavaScript에서 배열의 마지막 요소를 제거하는 메서드는?",
    options: ["push()", "pop()", "shift()", "unshift()"],
    answer: "pop()",
    category: {
      id: 1,
      description: "웹웹웹",
      name: "웹프로그래밍"
    }
  },
  {
    id: "12344143215",
    content: "CSS에서 요소를 중앙에 정렬하는 flexbox 속성은?",
    options: ["align-items: center", "justify-content: center", "둘 다", "text-align: center"],
    answer: "둘 다",
    category: {
      id: 1,
      description: "웹웹웹",
      name: "웹프로그래밍"
    }
  },
  {
    id: "12352436234",
    content: "HTML5에서 새롭게 추가된 시맨틱 태그가 아닌 것은?",
    options: ["<article>", "<section>", "<div>", "<aside>"],
    answer: "<div>",
    category: {
      id: 1,
      description: "웹웹웹",
      name: "웹프로그래밍"
    }
  },
  {
    id: "4525345323452345",
    content: "TypeScript에서 인터페이스를 정의할 때 사용하는 키워드는?",
    options: ["class", "type", "interface", "implements"],
    answer: "interface",
    category: {
      id: 1,
      description: "웹웹웹",
      name: "웹프로그래밍"
    }
  }
];