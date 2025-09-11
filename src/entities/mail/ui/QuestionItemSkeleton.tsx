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
          <Skeleton width="20px" height="20px" radius={4} />
          <Skeleton width="60%" height="20px" radius={6} />
        </div>
        <Skeleton width="24px" height="24px" radius={12} />
      </div>

      <div className="p-4 bg-gray-50 space-y-2">
        <div className="flex items-start gap-2">
          <Skeleton width="16px" height="16px" radius={4} /> 
          <Skeleton width="80%" height="20px" radius={6} />
        </div>
        <div className="flex items-start gap-2">
          <Skeleton width="70%" height="20px" radius={6} />
          <Skeleton width="70%" height="20px" radius={6} /> 
        </div>
      </div>
    </div>
  );
};

export default QuestionItemSkeleton;
