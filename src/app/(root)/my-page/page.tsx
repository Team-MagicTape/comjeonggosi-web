import UserAvatar from "@/entities/user/ui/UserAvatar";
import MailTemplate from "@/entities/mail/ui/MailTemplate";
import LogoutButton from "@/features/logout/ui/LogoutButton";
import MySubmissions from "@/widgets/section/ui/MySubmissions";
import Spacer from "@/shared/ui/Spacer";
import { parseDate } from "@/shared/utils/parse-date";
import { fetchInitialSubmissions } from "@/entities/quiz/api/fetch-initial-submissions";
import QuestionAccordion from "@/widgets/section/ui/QuestionAccordion";
import { fetchInitialMails } from "@/entities/mail/api/fetch-initial-mails";
import { fetchInitialMailDetail } from "@/entities/mail/api/fetch-initial-mail-detail";
import { fetchInitialCategoryDetail } from "@/entities/category/api/fetch-initial-category-detail";
import { fetchUser } from "@/entities/user/api/fetch-user";
import { redirect } from "next/navigation";

const MyPage = async () => {
  const user = await fetchUser();
  const submissions = await fetchInitialSubmissions();
  const mails = (await fetchInitialMails()).splice(0, 1);
  const mail =
    mails.length > 0 ? await fetchInitialMailDetail(mails[0].id) : null;
  const questionCategory = mail
    ? await fetchInitialCategoryDetail(mail.categoryId)
    : null;

  if (!user) {
    redirect("/");
  }

  return (
    <div className="w-full flex items-start gap-4 flex-col">
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
      <div className="w-full flex flex-col gap-4">
        <MySubmissions submissions={submissions} />
        {mail && questionCategory && (
          <MailTemplate data={mail} category={questionCategory} />
        )}

        <QuestionAccordion mails={mails} />
      </div>
    </div>
  );
};

export default MyPage;
