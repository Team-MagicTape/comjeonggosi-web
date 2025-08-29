"use client"

interface Props {
  question: {
    id: number;
    day: number;
    categoryId: number;
    title: string;
    content: string;
    answer: string;
  };
  category?: { id: number; name: string; description: string };
}

const TodayQuestionForm = ({ question, category }: Props) => {
  return (
    <div className="w-full flex flex-col justify-center z-20 gap-8">
      <div className="w-full bg-white flex flex-col rounded-2xl pl-15 pr-15 pb-6 mb-5">
        <div className="flex gap-2 mt-10">
          <div className="h-8 bg-[#ff723a] inline-flex items-center justify-center rounded-4xl pl-2 pr-2">
            <span className="text-[white] font-semibold">{`Day ${question.day}`}</span>
          </div>
          <div className="h-8 bg-gray-400 inline-flex items-center justify-center rounded-4xl pl-2 pr-2">
            <span className="text-[white] font-semibold">{`${category?.name}`}</span>
          </div>
        </div>
        <div className="mt-5">
          <span className="font-extrabold text-[30px]">{`${question.title}`}</span>
        </div>
        <div className="mt-2">
          <span className="font-bold text-[15px] text-[#333]">{`${question.content}`}</span>
        </div>
        <div className="w-full h-[1px] mt-5 bg-gray-400"></div>
        <div className="text-[#ff723a] mt-5 font-bold">정답</div>
        <div className="mt-2">
          <div>{`${question.answer}`}</div>
        </div>
      </div>
    </div>
  );
};

export default TodayQuestionForm;
