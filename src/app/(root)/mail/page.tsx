import MailApplyForm from "@/features/mail-apply/ui/MailApplyForm";
import { fetchCategories } from "@/entities/category/api/fetch-categories";
import { fetchUser } from "@/entities/user/api/fetch-user";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "메일 신청 | 컴정고시",
  description: "CS 공부는 컴정고시!",
  openGraph: {
    title: "메일 신청 | 컴정고시",
    description: "CS 공부는 컴정고시!",
    url: "https://comgo.dev/mail",
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

const MailApply = async () => {
  const [categories, user] = await Promise.all([
    fetchCategories(),
    fetchUser(),
  ]);

  return (
    <div className="w-full py-4 lg:py-6">
      <MailApplyForm
        initialData={null}
        categories={categories}
        user={user}
      />
    </div>
  );
};

export default MailApply;
