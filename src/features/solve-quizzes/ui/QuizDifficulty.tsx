"use client";

interface Props {
  difficulty: number;
  setDifficulty: (value: number) => void;
}

const QuizDifficulty = ({ difficulty, setDifficulty }: Props) => {
  const levels = [1, 2, 3, 4, 5];

  return (
    <div className="flex w-full max-w-xl mx-auto justify-between items-center gap-2 p-4 bg-gray-100 rounded-2xl shadow">
      {levels.map((level) => (
        <button
          key={level}
          onClick={() => setDifficulty(level)}
          className={`flex-1 py-3 rounded-xl text-center text-sm font-medium transition-all duration-200 
            ${
              difficulty >= level
                ? "bg-primary text-white shadow-md"
                : "bg-white text-gray-700 hover:bg-gray-200"
            }`}>
          난이도 {level}
        </button>
      ))}
    </div>
  );
};

export default QuizDifficulty;
