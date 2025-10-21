import { fetchWorkbook } from "@/entities/workbook/api/fetch-workbook";
import { notFound } from "next/navigation";
import { PathParams } from "@/shared/types/path-params";
import { Metadata } from "next";
import WorkbookDetailContent from "@/entities/workbook/ui/WorkbookDetail";

export async function generateMetadata({
  params,
}: PathParams): Promise<Metadata> {
  const { id } = await params;
  const workbook = await fetchWorkbook(String(id));

  return {
    title: `${workbook?.name || "문제집"} | 컴정고시`,
    description: `${workbook?.description || "CS 공부는 컴정고시!"}`,
    openGraph: {
      title: `${workbook?.name || "문제집"} | 컴정고시`,
      description: `${workbook?.description || "CS 공부는 컴정고시!"}`,
      url: `https://comgo.dev/workbooks/${id}`,
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
}

const WorkbookDetail = async ({ params }: PathParams) => {
  const { id } = await params;
  const workbook = await fetchWorkbook(String(id));

  if (!workbook) {
    notFound();
  }

  return <WorkbookDetailContent workbook={workbook} />;
};

export default WorkbookDetail;
