import React from "react";
import TodayQuestionForm from "@/entities/question/ui/TodayQuestionForm";

interface Props {
  params: { questionId: string };
}

const todayQuestion = async ({ params }: Props) => {
  const questionId = Number(params.questionId);

  return (
    <div>
      <TodayQuestionForm questionId={questionId} />
    </div>
  );
};

export default todayQuestion;
