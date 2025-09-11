import Skeleton from "@/shared/ui/Skeleton";

const TodayQuestionItemSkeleton = () => {
  return (
    <div className="w-full h-full bg-white rounded-[16px] p-7">
      <div className="flex justify-between mb-4">
        <Skeleton width="80px" height="32px" radius={16} />
        <Skeleton width="100px" height="32px" radius={16} />
      </div>

      <div className="mb-[13px]">
        <Skeleton width="70%" height="22px" radius={6} />
      </div>

      <div className="mb-[13px] space-y-2">
        <Skeleton width="100%" height="18px" radius={4} />
        <Skeleton width="90%" height="18px" radius={4} />
      </div>

      <div className="w-full h-[1px] bg-[#f1f3f4] mb-[13px]"></div>

      <div className="mb-[13px]">
        <Skeleton width="100px" height="20px" radius={4} />
      </div>

      <div className="space-y-2">
        <Skeleton width="100%" height="18px" radius={4} />
        <Skeleton width="80%" height="18px" radius={4} />
      </div>
    </div>
  );
};

export default TodayQuestionItemSkeleton;
