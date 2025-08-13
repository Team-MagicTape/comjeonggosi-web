import { MySubmission } from "@/entities/quiz/types/my-submission";
import MySubmissionItem from "@/entities/quiz/ui/MySubmissionItem";
import { BookOpenCheck, ClipboardList } from "lucide-react";

interface Props {
  submissions: MySubmission[];
}

const MySubmissions = ({ submissions }: Props) => {
  const correctCount = submissions.filter(s => s.isCorrected).length;
  const totalCount = submissions.length;

  return (
    <div className="w-full p-4 border border-gray-200 bg-white rounded-2xl">
      <div className="flex items-center gap-3 mb-6 px-1">
        <div className="p-2 bg-blue-50 rounded-lg">
          <ClipboardList className="text-primary" size={32} />
        </div>
        <div className="flex-1">
          <h2 className="text-2xl font-semibold text-gray-800">내 제출 현황</h2>
          {totalCount > 0 && (
            <div className="flex items-center gap-4 mt-1">
              <span className="text-sm text-gray-600">
                총 {totalCount}개 중 {correctCount}개 정답
              </span>
              <div className="flex items-center gap-1">
                <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                <span className="text-xs text-gray-500">정답률 {Math.round((correctCount / totalCount) * 100)}%</span>
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="space-y-3">
        {submissions.length === 0 ? (
          <div className="text-center py-12">
            <div className="p-4 bg-gray-50 rounded-full w-fit mx-auto mb-4">
              <BookOpenCheck className="text-gray-400" size={32} />
            </div>
            <p className="text-gray-500 text-base">아직 제출한 퀴즈가 없습니다.</p>
            <p className="text-gray-400 text-sm mt-1">첫 번째 퀴즈에 도전해보세요!</p>
          </div>
        ) : (
          submissions.map((item, idx) => (
            <MySubmissionItem data={item} key={idx} />
          ))
        )}
      </div>
      <div className="w-full border-t border-border text-center mt-6 pt-3 text-gray cursor-pointer">
        더보기
      </div>
    </div>
  );
};

export default MySubmissions;