"use client";

import Skeleton from "@/shared/ui/Skeleton";

const MailTemplateSkeleton = () => {
  return (
    <div className="w-full mx-auto bg-white rounded-2xl overflow-hidden">
      <div className="bg-gray-200 px-4 xl:px-8 pt-4 xl:pt-8 pb-4">
        <Skeleton width="60%" height="32px" radius={4} className="mb-2 xl:mb-6" />
        <div className="w-full flex justify-between items-end">
          <Skeleton width="80px" height="32px" radius={16} />
          <Skeleton width="80px" height="32px" radius={4} />
        </div>
      </div>

      <div className="px-4 xl:px-8 py-4 xl:py-10 flex flex-col border-x border-border">
        <Skeleton width="120px" height="16px" radius={4} className="mb-5" />

        <div className="w-full text-center mb-4 xl:mb-8 bg-gray-50 py-10 px-2 border border-border rounded-item">
          <Skeleton width="90%" height="20px" radius={4} className="mb-2" />
          <Skeleton width="75%" height="20px" radius={4} className="mb-2" />
          <Skeleton width="60%" height="20px" radius={4} />
        </div>

        <Skeleton width="40%" height="40px" radius={8} />
      </div>

      <div className="bg-gray-50 p-4 pb-5 text-center border border-border flex flex-col gap-4 rounded-b-2xl">
        <Skeleton width="80px" height="16px" radius={4} className="mx-auto" />
      </div>
    </div>
  );
};

export default MailTemplateSkeleton;

