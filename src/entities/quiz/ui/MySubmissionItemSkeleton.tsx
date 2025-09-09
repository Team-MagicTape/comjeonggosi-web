import Skeleton from "@/shared/ui/Skeleton";

const MySubmissionItemSkeleton = () => {
  return (
    <div className="relative p-6 rounded-item border border-border">
      <div className="flex items-center gap-3 mb-1">
        <div className="flex items-center gap-2">
          <Skeleton width="60%" height={20} radius={6} />
          <Skeleton width={80} height={24} radius={12} />
        </div>
      </div>

      <div className="space-y-3 mb-4">
        <div className="flex items-center gap-2">
          <Skeleton width={50} height={18} radius={4} /> {/* "내 답안:" 라벨 */}
          <div className="flex-1 flex gap-4 flex-wrap">
            <Skeleton width="40%" height={20} radius={6} />
            <Skeleton width="30%" height={20} radius={6} />
          </div>
        </div>
      </div>

      <div className="w-full flex items-center gap-1 text-lightgray text-sm">
        <Skeleton width={80} height={16} radius={4} />
        <Skeleton width={10} height={16} radius={4} />
      </div>
    </div>
  );
};

export default MySubmissionItemSkeleton;
