"use client";

import Skeleton from "@/shared/ui/Skeleton";

interface Props {
  isLast: boolean;
}

const QuestionItemSkeleton = ({ isLast }: Props) => {
  return (
    <div className={`${!isLast && "border-b"} border-border`}>
      <div className="flex justify-between items-center p-4">
        <div className="flex items-center gap-4">
          <Skeleton width={20} height={20} radius={4} />
          <Skeleton width="60%" height={20} radius={6} />
        </div>
        <Skeleton width={24} height={24} radius={12} />
      </div>

      <div className="p-4 bg-gray-50 space-y-2">
        <div className="flex items-start gap-2">
          <Skeleton width={16} height={16} radius={4} /> {/* Q: 라벨 */}
          <Skeleton width="80%" height={20} radius={6} /> {/* 질문 본문 */}
        </div>
        <div className="flex items-start gap-2">
          <Skeleton width={16} height={16} radius={4} /> {/* A: 라벨 */}
          <Skeleton width="70%" height={20} radius={6} /> {/* 답변 본문 */}
        </div>
      </div>
    </div>
  );
};

export default QuestionItemSkeleton;
