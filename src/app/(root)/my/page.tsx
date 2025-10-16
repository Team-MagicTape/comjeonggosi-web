import UserAvatar from "@/entities/user/ui/UserAvatar";
import MySubmissions from "@/widgets/section/ui/MySubmissions";
import Spacer from "@/shared/ui/Spacer";
import { parseDate } from "@/shared/utils/parse-date";
import { fetchInitialSubmissions } from "@/entities/quiz/api/fetch-initial-submissions";
import QuestionAccordion from "@/entities/mail/ui/QuestionAccordion";
import { fetchInitialMails } from "@/entities/mail/api/fetch-initial-mails";
import { fetchUser } from "@/entities/user/api/fetch-user";
import { redirect } from "next/navigation";
import { fetchCategories } from "@/entities/category/api/fetch-categories";
import MyContentCards from "@/widgets/section/ui/MyContentCard";
import MyReviews from "@/widgets/section/ui/MyReviews";
import { fetchReviewRecommandations } from "@/entities/review/api/fetch-review-recommandations";
import { fetchReviewStats } from "@/entities/review/api/fetch-review-stats";

import { Metadata } from "next";
import LogoutButton from "@/features/logout/ui/LogoutButton";

export const metadata: Metadata = {
  title: "마이페이지 | 컴정고시",
  description: "CS 공부는 컴정고시!",
  openGraph: {
    title: "마이페이지 | 컴정고시",
    description: "CS 공부는 컴정고시!",
    url: "https://comgo.dev/my",
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

const My = async () => {
  const [
    user,
    categories,
    submissions,
    mails,
    reviewRecommendations,
    reviewStats,
  ] = await Promise.all([
    fetchUser(),
    fetchCategories(),
    fetchInitialSubmissions(),
    fetchInitialMails(),
    fetchReviewRecommandations(),
    fetchReviewStats(),
  ]);

  if (!user) {
    redirect("/");
  }

  return (
    <div className="w-full flex items-start gap-4 flex-col py-4 lg:py-6">
      <div className="w-full p-4 border border-border bg-white rounded-2xl flex flex-col gap-4">
        <div className="w-full flex xl:items-center gap-4 flex-col xl:flex-row">
          <UserAvatar user={user} size={80} />
          <div className="flex flex-col">
            <p className="text-2xl font-bold text-gray-900">
              {user.nickname}님
            </p>
            <p className="text-sm text-gray mb-2">{user.email}</p>
            <p className="text-sm text-gray">
              가입일: {parseDate(user.createdAt)}
            </p>
          </div>
          <Spacer />
          <LogoutButton />
        </div>
      </div>
      <MyContentCards
        items={[
          {
            child: <MySubmissions submissions={submissions} />,
            title: "퀴즈 풀이",
          },
          {
            child: (
              <MyReviews reviews={reviewRecommendations} stats={reviewStats} />
            ),
            title: "복습 관리",
          },
          {
            child: <QuestionAccordion categories={categories} mails={mails} />,
            title: "받은 질문",
          },
        ]}
      />
    </div>
  );
};

export default My;
