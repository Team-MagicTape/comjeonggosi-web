"use client";

import Skeleton from "@/shared/ui/Skeleton";

const ArticleItemSkeleton = () => {
  return (
    <div className="w-full p-5 rounded-item bg-bg border border-border space-y-2">
      <Skeleton width="50%" height="28px" radius={6} />
      <Skeleton width="70%" height="20px" radius={4} />
    </div>
  );
};

export default ArticleItemSkeleton;
