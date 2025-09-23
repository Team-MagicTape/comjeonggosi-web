import { useSearchParams, useRouter } from "next/navigation";
import { useMemo, useCallback } from "react";

export const useWorkbookNavigation = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const sectionParam = searchParams?.get("section");

  const getWorkbookId = useCallback(() => {
    if (typeof window !== "undefined") {
      const path = window.location.pathname;
      const match = path.match(/\/workbooks\/(\d+)/);
      return match ? match[1] : null;
    }
    return null;
  }, []);

  const goToWorkbookDetail = useCallback(() => {
    const workbookId = getWorkbookId();
    if (workbookId) {
      router.push(`/workbooks/${workbookId}`);
    } else {
      router.push("/workbooks");
    }
  }, [router, getWorkbookId]);

  const sectionInfo = useMemo(() => {
    if (sectionParam !== null) {
      const sectionIndex = parseInt(sectionParam);
      if (!isNaN(sectionIndex)) {
        return {
          sectionIndex,
          sectionNumber: sectionIndex + 1,
          isSection: true,
        };
      }
    }
    return { isSection: false };
  }, [sectionParam]);

  return {
    sectionInfo,
    goToWorkbookDetail,
  };
};