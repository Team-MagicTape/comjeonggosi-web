import { fetchWorkbooks } from "@/entities/workbook/api/fetch-workbooks";
import WorkbookList from "@/entities/workbook/ui/WorkbookList";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "문제집 | 컴정고시",
  description: "CS 공부는 컴정고시!",
  openGraph: {
    title: "문제집 | 컴정고시",
    description: "CS 공부는 컴정고시!",
    url: "https://comgo.dev/workbook",
    siteName: "컴정고시",
    images: [
      {
        url: "https://comgo.dev/assets/og.png",
        width: 1200,
        height: 630,
        alt: "컴정고시",
      },
    ],
    locale: "ko_KR",
    type: "website",
  },
};

const Workbooks = async () => {
  const data = await fetchWorkbooks();
  if (!data)
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <div className="text-center">
          <p className="text-xl font-semibold text-gray-600 mb-2">
            오류가 발생했습니다
          </p>
          <p className="text-gray-500">잠시 후 다시 시도해주세요</p>
        </div>
      </div>
    );

  return (
    <div className="w-full py-4 lg:py-6">
      <div className="mb-6">
        <h1 className="text-2xl lg:text-3xl font-bold mb-2">문제집</h1>
        <p className="text-sm lg:text-base text-gray-600">
          주제별로 정리된 문제집으로 체계적인 학습을 시작해보세요
        </p>
      </div>
      <WorkbookList workbooks={data} />
    </div>
  );
};

export default Workbooks;
