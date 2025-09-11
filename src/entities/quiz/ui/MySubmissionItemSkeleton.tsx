import Skeleton from "@/shared/ui/Skeleton";

const MySubmissionItemSkeleton = () => {
  return (
    <div className="relative p-6 rounded-item border border-border">
      <div className="flex items-center gap-3 mb-1">
        <div className="flex items-center gap-2">
          <Skeleton width="60%" height="20px" radius={6} />
          <Skeleton width="80px" height="24px" radius={12} />
        </div>
      </div>

      <div className="space-y-3 mb-4">
        <div className="flex items-center gap-2">
          <Skeleton width="50px" height="18px" radius={4} />
          <div className="flex-1 flex gap-4 flex-wrap">
            <Skeleton width="40%" height="20px" radius={6} />
            <Skeleton width="30%" height="20px" radius={6} />
          </div>
        </div>
      </div>

      <div className="w-full flex items-center gap-1 text-lightgray text-sm">
        <Skeleton width="80px" height="16px" radius={4} />
        <Skeleton width="10px" height="16px" radius={4} />
      </div>
    </div>
  );
};

export default MySubmissionItemSkeleton;
