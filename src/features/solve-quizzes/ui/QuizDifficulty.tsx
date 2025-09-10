"use client";

interface Props {
  difficulty: number;
  setDifficulty: (value: number) => void;
}

const QuizDifficulty = ({ difficulty, setDifficulty }: Props) => {
  const levels = [1, 2, 3, 4, 5];

  return (
    <div className="flex w-full items-center p-4 bg-white rounded-full border border-gray-200">
      {levels.map((level) => (
        <button
          key={level}
          onClick={() => setDifficulty(level)}
          className={`flex-1 h-8 text-xs font-medium transition-all duration-300 hover:scale-105 active:scale-95 border border-l-0
            ${
              difficulty >= level
                ? "bg-primary text-white border-primary"
                : "bg-gray-100 text-gray-500 hover:bg-gray-200 border-gray-200"
            }
            ${
              level === 1
                ? "rounded-l-full border"
                : level === 5
                ? "rounded-r-full"
                : ""
            }`}>
          난이도 {level}
        </button>
      ))}
    </div>
  );
};

export default QuizDifficulty;
