import { User } from "@/entities/user/types/user";
import UserAvatar from "@/entities/user/ui/UserAvatar";
import MailTemplate from "@/entities/mail/ui/MailTemplate";
import LogoutButton from "@/widgets/login-button/ui/LogoutButton";
import MySubmissions from "@/widgets/section/ui/MySubmissions";
import Spacer from "@/shared/ui/Spacer";
import { parseDate } from "@/shared/utils/parse-date";
import { fetchInitialSubmissions } from "@/entities/quiz/api/fetch-initial-submissions";
import QuestionAccordion from "@/widgets/section/ui/QuestionAccordion";

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

  const mail = {
    id: 247,
    question:
      "ACID 속성 중에서 일관성(Consistency)이 보장하는 것은 무엇인가요?",
    options: [
      "트랜잭션이 완료된 후에도 데이터가 유지되는 것",
      "동시에 실행되는 트랜잭션들이 서로 간섭하지 않는 것",
      "데이터베이스가 항상 유효한 상태를 유지하는 것",
      "트랜잭션이 모두 실행되거나 전혀 실행되지 않는 것",
    ],
    hint: "데이터베이스의 무결성 제약조건과 관련이 있습니다.",
    category: "Database",
    date: "2025년 8월 14일 수요일",
    answer:
      "트랜잭션 실행 전후에 데이터베이스가 일관된 상태를 유지해야 한다는 속성입니다. 즉, 트랜잭션이 성공적으로 완료되면 무결성 제약 조건을 위반하지 않고 일관된 상태로 데이터가 유지되어야 합니다.",
  };

  const mails = [
    {
      id: 248,
      question:
        "ACID 속성 중에서 일관성(Consistency)이 보장하는 것은 무엇인가요?",
      options: [
        "트랜잭션이 완료된 후에도 데이터가 유지되는 것",
        "동시에 실행되는 트랜잭션들이 서로 간섭하지 않는 것",
        "데이터베이스가 항상 유효한 상태를 유지하는 것",
        "트랜잭션이 모두 실행되거나 전혀 실행되지 않는 것",
      ],
      hint: "데이터베이스의 무결성 제약조건과 관련이 있습니다.",
      category: "Database",
      date: "2025년 8월 14일 수요일",
      answer:
        "트랜잭션 실행 전후에 데이터베이스가 일관된 상태를 유지해야 한다는 속성입니다. 즉, 트랜잭션이 성공적으로 완료되면 무결성 제약 조건을 위반하지 않고 일관된 상태로 데이터가 유지되어야 합니다.",
    },
    {
      id: 249,
      question:
        "ACID 속성 중에서 일관성(Consistency)이 보장하는 것은 무엇인가요?",
      options: [
        "트랜잭션이 완료된 후에도 데이터가 유지되는 것",
        "동시에 실행되는 트랜잭션들이 서로 간섭하지 않는 것",
        "데이터베이스가 항상 유효한 상태를 유지하는 것",
        "트랜잭션이 모두 실행되거나 전혀 실행되지 않는 것",
      ],
      hint: "데이터베이스의 무결성 제약조건과 관련이 있습니다.",
      category: "Database",
      date: "2025년 8월 14일 수요일",
      answer:
        "트랜잭션 실행 전후에 데이터베이스가 일관된 상태를 유지해야 한다는 속성입니다. 즉, 트랜잭션이 성공적으로 완료되면 무결성 제약 조건을 위반하지 않고 일관된 상태로 데이터가 유지되어야 합니다.",
    },
    {
      id: 250,
      question:
        "ACID 속성 중에서 일관성(Consistency)이 보장하는 것은 무엇인가요?",
      options: [
        "트랜잭션이 완료된 후에도 데이터가 유지되는 것",
        "동시에 실행되는 트랜잭션들이 서로 간섭하지 않는 것",
        "데이터베이스가 항상 유효한 상태를 유지하는 것",
        "트랜잭션이 모두 실행되거나 전혀 실행되지 않는 것",
      ],
      hint: "데이터베이스의 무결성 제약조건과 관련이 있습니다.",
      category: "Database",
      date: "2025년 8월 14일 수요일",
      answer:
        "트랜잭션 실행 전후에 데이터베이스가 일관된 상태를 유지해야 한다는 속성입니다. 즉, 트랜잭션이 성공적으로 완료되면 무결성 제약 조건을 위반하지 않고 일관된 상태로 데이터가 유지되어야 합니다.",
    },
    {
      id: 251,
      question:
        "ACID 속성 중에서 일관성(Consistency)이 보장하는 것은 무엇인가요?",
      options: [
        "트랜잭션이 완료된 후에도 데이터가 유지되는 것",
        "동시에 실행되는 트랜잭션들이 서로 간섭하지 않는 것",
        "데이터베이스가 항상 유효한 상태를 유지하는 것",
        "트랜잭션이 모두 실행되거나 전혀 실행되지 않는 것",
      ],
      hint: "데이터베이스의 무결성 제약조건과 관련이 있습니다.",
      category: "Database",
      date: "2025년 8월 14일 수요일",
      answer:
        "트랜잭션 실행 전후에 데이터베이스가 일관된 상태를 유지해야 한다는 속성입니다. 즉, 트랜잭션이 성공적으로 완료되면 무결성 제약 조건을 위반하지 않고 일관된 상태로 데이터가 유지되어야 합니다.",
    },
    {
      id: 252,
      question:
        "ACID 속성 중에서 일관성(Consistency)이 보장하는 것은 무엇인가요?",
      options: [
        "트랜잭션이 완료된 후에도 데이터가 유지되는 것",
        "동시에 실행되는 트랜잭션들이 서로 간섭하지 않는 것",
        "데이터베이스가 항상 유효한 상태를 유지하는 것",
        "트랜잭션이 모두 실행되거나 전혀 실행되지 않는 것",
      ],
      hint: "데이터베이스의 무결성 제약조건과 관련이 있습니다.",
      category: "Database",
      date: "2025년 8월 14일 수요일",
      answer:
        "트랜잭션 실행 전후에 데이터베이스가 일관된 상태를 유지해야 한다는 속성입니다. 즉, 트랜잭션이 성공적으로 완료되면 무결성 제약 조건을 위반하지 않고 일관된 상태로 데이터가 유지되어야 합니다.",
    },
    {
      id: 253,
      question:
        "ACID 속성 중에서 일관성(Consistency)이 보장하는 것은 무엇인가요?",
      options: [
        "트랜잭션이 완료된 후에도 데이터가 유지되는 것",
        "동시에 실행되는 트랜잭션들이 서로 간섭하지 않는 것",
        "데이터베이스가 항상 유효한 상태를 유지하는 것",
        "트랜잭션이 모두 실행되거나 전혀 실행되지 않는 것",
      ],
      hint: "데이터베이스의 무결성 제약조건과 관련이 있습니다.",
      category: "Database",
      date: "2025년 8월 14일 수요일",
      answer:
        "트랜잭션 실행 전후에 데이터베이스가 일관된 상태를 유지해야 한다는 속성입니다. 즉, 트랜잭션이 성공적으로 완료되면 무결성 제약 조건을 위반하지 않고 일관된 상태로 데이터가 유지되어야 합니다.",
    },
    {
      id: 254,
      question:
        "ACID 속성 중에서 일관성(Consistency)이 보장하는 것은 무엇인가요?",
      options: [
        "트랜잭션이 완료된 후에도 데이터가 유지되는 것",
        "동시에 실행되는 트랜잭션들이 서로 간섭하지 않는 것",
        "데이터베이스가 항상 유효한 상태를 유지하는 것",
        "트랜잭션이 모두 실행되거나 전혀 실행되지 않는 것",
      ],
      hint: "데이터베이스의 무결성 제약조건과 관련이 있습니다.",
      category: "Database",
      date: "2025년 8월 14일 수요일",
      answer:
        "트랜잭션 실행 전후에 데이터베이스가 일관된 상태를 유지해야 한다는 속성입니다. 즉, 트랜잭션이 성공적으로 완료되면 무결성 제약 조건을 위반하지 않고 일관된 상태로 데이터가 유지되어야 합니다.",
    },
    {
      id: 255,
      question:
        "ACID 속성 중에서 일관성(Consistency)이 보장하는 것은 무엇인가요?",
      options: [
        "트랜잭션이 완료된 후에도 데이터가 유지되는 것",
        "동시에 실행되는 트랜잭션들이 서로 간섭하지 않는 것",
        "데이터베이스가 항상 유효한 상태를 유지하는 것",
        "트랜잭션이 모두 실행되거나 전혀 실행되지 않는 것",
      ],
      hint: "데이터베이스의 무결성 제약조건과 관련이 있습니다.",
      category: "Database",
      date: "2025년 8월 14일 수요일",
      answer:
        "트랜잭션 실행 전후에 데이터베이스가 일관된 상태를 유지해야 한다는 속성입니다. 즉, 트랜잭션이 성공적으로 완료되면 무결성 제약 조건을 위반하지 않고 일관된 상태로 데이터가 유지되어야 합니다.",
    },
  ];

  return (
    <div className="w-full flex items-start gap-4 flex-col">
      <div className="w-full p-4 border border-border bg-white rounded-2xl flex flex-col gap-4">
        <div className="w-full flex items-center gap-4">
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
        <MailTemplate data={mail} />
        <QuestionAccordion mails={mails} />
      </div>
    </div>
  );
};

export default MyPage;
