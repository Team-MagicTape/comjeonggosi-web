"use client";

import { MySubmission } from "@/entities/quiz/types/my-submission";
import MySubmissionItem from "@/entities/quiz/ui/MySubmissionItem";
import Button from "@/shared/ui/Button";
import CustomLink from "@/shared/ui/CustomLink";
import Tabs from "@/widgets/tabs/ui/Tabs";
import { BookOpenCheck } from "lucide-react";
import { SUBMISSION_CATEGORY } from "../constants/submission-category";
import { useGetMySubmissions } from "@/entities/quiz/model/useGetMySubmissions";

interface Props {
  submissions: MySubmission[];
}

const MySubmissions = ({ submissions }: Props) => {
  const { data, isLoading, setCategory, category } =
    useGetMySubmissions(submissions);

  return (
    <div className="w-full p-4 border border-gray-200 bg-white rounded-2xl">
      <h2 className="text-xl font-semibold mb-4">퀴즈 풀이 현황</h2>
      <Tabs
        tabs={SUBMISSION_CATEGORY}
        selected={category}
        setSelected={setCategory}
      />
      <div className="space-y-3 mt-4">
        {!data || data.length === 0 ? (
          <div className="text-center py-12">
            <div className="p-4 bg-gray-50 rounded-full w-fit mx-auto mb-4">
              <BookOpenCheck className="text-gray-400" size={32} />
            </div>
            <p className="text-gray text-base">아직 제출한 퀴즈가 없습니다.</p>
            <p className="text-lightgray text-sm mt-1">
              첫 번째 퀴즈에 도전해보세요!
            </p>
            <CustomLink
              className="w-full flex justify-center mt-4"
              href="/quizzes"
            >
              <Button>퀴즈 바로가기</Button>
            </CustomLink>
          </div>
        ) : (
          data?.map((item, idx) => (
            <MySubmissionItem data={item} key={idx} isLoading={isLoading} />
          ))
        )}
      </div>
      {submissions.length > 5 && (
        <div className="w-full border-t border-border text-center mt-6 pt-3 text-gray cursor-pointer">
          더보기
        </div>
      )}
    </div>
  );
};

export default MySubmissions;
