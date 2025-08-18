import { User } from "@/entities/user/types/user";
import UserAvatar from "@/entities/user/ui/UserAvatar";
import MailTemplate from "@/entities/mail/ui/MailTemplate";
import LogoutButton from "@/widgets/login-button/ui/LogoutButton";
import MySubmissions from "@/widgets/section/ui/MySubmissions";
import Spacer from "@/shared/ui/Spacer";
import { parseDate } from "@/shared/utils/parse-date";
import { fetchInitialSubmissions } from "@/entities/quiz/api/fetch-initial-submissions";
import QuestionAccordion from "@/widgets/section/ui/QuestionAccordion";
import { Mail } from "@/entities/mail/types/mail";
import { MailDetail } from "@/entities/mail/types/mail-detail";

const MyPage = async () => {
  const user: User = {
    id: 1,
    email: "tw080401@naver.com",
    nickname: "cher1shRXD",
    profileImageUrl: "https://cher1shrxd.me/assets/profile.JPG",
    provider: "NAVER",
    providerId: "NAVER",
    createdAt: "2025-08-13T10:35:42.000Z",
    lastLoginAt: "2025-08-13T10:35:42.000Z",
    updatedAt: "2025-08-13T10:35:42.000Z",
  };

  const submissions = await fetchInitialSubmissions();

  const mail: MailDetail = {
    id: 247,
    title: "ACID 속성 중에서 일관성(Consistency)이 보장하는 것은 무엇인가요?",
    content: "ACID 속성 중에서 일관성(Consistency)이 보장하는 것은 무엇인가요?",
    categoryId: 1,
    day: 1,
    answer:
      "트랜잭션 실행 전후에 데이터베이스가 일관된 상태를 유지해야 한다는 속성입니다. 즉, 트랜잭션이 성공적으로 완료되면 무결성 제약 조건을 위반하지 않고 일관된 상태로 데이터가 유지되어야 합니다.",
  };

  const mails: Mail[] = [
    {
      id: 248,
      title: "ACID 속성 중에서 일관성(Consistency)이 보장하는 것은 무엇인가요?",
      content:
        "ACID 속성 중에서 일관성(Consistency)이 보장하는 것은 무엇인가요?",
      answer:
        "트랜잭션 실행 전후에 데이터베이스가 일관된 상태를 유지해야 한다는 속성입니다. 즉, 트랜잭션이 성공적으로 완료되면 무결성 제약 조건을 위반하지 않고 일관된 상태로 데이터가 유지되어야 합니다.",
    },
    {
      id: 249,
      title: "ACID 속성 중에서 일관성(Consistency)이 보장하는 것은 무엇인가요?",
      content:
        "ACID 속성 중에서 일관성(Consistency)이 보장하는 것은 무엇인가요?",
      answer:
        "트랜잭션 실행 전후에 데이터베이스가 일관된 상태를 유지해야 한다는 속성입니다. 즉, 트랜잭션이 성공적으로 완료되면 무결성 제약 조건을 위반하지 않고 일관된 상태로 데이터가 유지되어야 합니다.",
    },
    {
      id: 250,
      title: "ACID 속성 중에서 일관성(Consistency)이 보장하는 것은 무엇인가요?",
      content:
        "ACID 속성 중에서 일관성(Consistency)이 보장하는 것은 무엇인가요?",
      answer:
        "트랜잭션 실행 전후에 데이터베이스가 일관된 상태를 유지해야 한다는 속성입니다. 즉, 트랜잭션이 성공적으로 완료되면 무결성 제약 조건을 위반하지 않고 일관된 상태로 데이터가 유지되어야 합니다.",
    },
    {
      id: 251,
      title: "ACID 속성 중에서 일관성(Consistency)이 보장하는 것은 무엇인가요?",
      content:
        "ACID 속성 중에서 일관성(Consistency)이 보장하는 것은 무엇인가요?",
      answer:
        "트랜잭션 실행 전후에 데이터베이스가 일관된 상태를 유지해야 한다는 속성입니다. 즉, 트랜잭션이 성공적으로 완료되면 무결성 제약 조건을 위반하지 않고 일관된 상태로 데이터가 유지되어야 합니다.",
    },
    {
      id: 252,
      title: "ACID 속성 중에서 일관성(Consistency)이 보장하는 것은 무엇인가요?",
      content:
        "ACID 속성 중에서 일관성(Consistency)이 보장하는 것은 무엇인가요?",
      answer:
        "트랜잭션 실행 전후에 데이터베이스가 일관된 상태를 유지해야 한다는 속성입니다. 즉, 트랜잭션이 성공적으로 완료되면 무결성 제약 조건을 위반하지 않고 일관된 상태로 데이터가 유지되어야 합니다.",
    },
    {
      id: 253,
      title: "ACID 속성 중에서 일관성(Consistency)이 보장하는 것은 무엇인가요?",
      content:
        "ACID 속성 중에서 일관성(Consistency)이 보장하는 것은 무엇인가요?",
      answer:
        "트랜잭션 실행 전후에 데이터베이스가 일관된 상태를 유지해야 한다는 속성입니다. 즉, 트랜잭션이 성공적으로 완료되면 무결성 제약 조건을 위반하지 않고 일관된 상태로 데이터가 유지되어야 합니다.",
    },
    {
      id: 254,
      title: "ACID 속성 중에서 일관성(Consistency)이 보장하는 것은 무엇인가요?",
      content:
        "ACID 속성 중에서 일관성(Consistency)이 보장하는 것은 무엇인가요?",
      answer:
        "트랜잭션 실행 전후에 데이터베이스가 일관된 상태를 유지해야 한다는 속성입니다. 즉, 트랜잭션이 성공적으로 완료되면 무결성 제약 조건을 위반하지 않고 일관된 상태로 데이터가 유지되어야 합니다.",
    },
    {
      id: 255,
      title: "ACID 속성 중에서 일관성(Consistency)이 보장하는 것은 무엇인가요?",
      content:
        "ACID 속성 중에서 일관성(Consistency)이 보장하는 것은 무엇인가요?",
      answer:
        "트랜잭션 실행 전후에 데이터베이스가 일관된 상태를 유지해야 한다는 속성입니다. 즉, 트랜잭션이 성공적으로 완료되면 무결성 제약 조건을 위반하지 않고 일관된 상태로 데이터가 유지되어야 합니다.",
    },
  ];

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
        <MailTemplate data={mail} category={{ id: 1, name: "데이터베이스", description: "데이터베이스 과목" }} />
        <QuestionAccordion mails={mails} />
      </div>
    </div>
  );
};

export default MyPage;
