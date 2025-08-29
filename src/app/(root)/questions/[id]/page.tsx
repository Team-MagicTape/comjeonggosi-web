import TodayQuestionForm from "@/entities/question/ui/TodayQuestionForm";
import { useTodayQuestion } from "@/entities/question/model/useTodayQuestion";

interface Props {
  params: { id: string };
}

const TodayQuestion = async ({ params }: Props) => {
  const questionId = Number(params.id);
  const result = await useTodayQuestion(questionId);
  if (!result) {
    return (
      <div className="flex justify-center items-center h-full">
        <span className="text-gray-500">질문 불러 오기 실패</span>
      </div>
    );
  }
  const { question, category } = result;

  return (
    <div>
      <TodayQuestionForm question={question} category={category} />
    </div>
  );
};

export default TodayQuestion;
