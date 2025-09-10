"use client";

interface Props {
  difficulty: number;
  setDifficulty: (value: number) => void;
}

const QuizDifficulty = ({ difficulty, setDifficulty }: Props) => {
  const levels = [1, 2, 3, 4, 5];

  return (
    <div className="flex w-full justify-between items-center gap-3 p-5 bg-gradient-to-r from-slate-50 to-gray-50 rounded-3xl border border-gray-200/50">
      {levels.map((level) => (
        <button
          key={level}
          onClick={() => setDifficulty(level)}
          className={`flex-1 py-4 px-2 rounded-2xl text-center text-sm font-semibold transition-all duration-300 transform hover:scale-105 active:scale-95 
            ${
              difficulty >= level
                ? "bg-primary text-white border-2 border-transparent"
                : "bg-white text-gray-600 hover:text-gray-800 hover:bg-gray-50 border-2 border-gray-200/30 hover:border-gray-300/50"
            }`}>
          <div className="flex flex-col items-center gap-1">
            <div className={`w-2 h-2 rounded-full ${difficulty >= level ? 'bg-white/30' : 'bg-gray-400/50'}`}></div>
            <span>난이도 {level}</span>
          </div>
        </button>
      ))}
    </div>
  );
};

export default QuizDifficulty;