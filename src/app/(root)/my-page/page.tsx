import { MySubmission } from "@/entities/quiz/types/my-submission";
import { User } from "@/entities/user/types/user";
import UserAvatar from "@/entities/user/ui/UserAvatar";
import MailTemplate from "@/entities/mail/ui/MailTemplate";
import LogoutButton from "@/widgets/login-button/ui/LogoutButton";
import MySubmissions from "@/widgets/section/ui/MySubmissions";
import { BrainCircuit, Mail } from "lucide-react";
import { getDaysFromToday } from "@/shared/utils/get-days-from-today";

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

  const submissions: MySubmission[] = [
    {
      isCorrected: true,
      userAnswer: "42",
      quiz: {
        id: "q1",
        content: "Life, the universe and everything?",
        options: ["42", "24", "0", "99"],
        answer: "42",
        category: { id: 1, name: "철학", description: "심오한 질문" },
      },
    },
    {
      isCorrected: false,
      userAnswer: "서울",
      quiz: {
        id: "q2",
        content: "프랑스의 수도는?",
        options: ["서울", "파리", "런던", "도쿄"],
        answer: "파리",
        category: { id: 2, name: "지리", description: "세계의 도시" },
      },
    },
  ];

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
    answer: "트랜잭션 실행 전후에 데이터베이스가 일관된 상태를 유지해야 한다는 속성입니다. 즉, 트랜잭션이 성공적으로 완료되면 무결성 제약 조건을 위반하지 않고 일관된 상태로 데이터가 유지되어야 합니다."
  };

  const mails = Array.from({ length: 10 });

  return (
    <div className="w-full flex items-start gap-4 flex-col-reverse xl:flex-row">
      <div className="w-full xl:w-auto xl:flex-1 flex flex-col gap-4">
        <MySubmissions submissions={submissions} />
        <MailTemplate data={mail} />
        <div className="w-full p-4 border border-border bg-white rounded-2xl">
          받은 질문들
        </div>
      </div>
      <div className="w-full xl:w-90 p-4 border border-border bg-white rounded-2xl xl:sticky xl:top-30 flex flex-col gap-4">
        <div className="w-full flex items-center gap-4">
          <UserAvatar user={user} size={80} />
          <div>
            <p className="text-2xl font-bold text-gray-900">{user.nickname}</p>
            <p className="text-sm text-gray-500">{user.email}</p>
          </div>
        </div>
        <div className="w-full flex flex-col gap-2">
          <div className="flex-1 p-4 rounded-item bg-blue-100 flex gap-2 items-center text-primary">
            <Mail />
            <p className="text-sm">{mails.length}개의 질문</p>
          </div>
          <div className="flex-1 p-4 rounded-item bg-green-100 flex gap-2 items-center text-green-500">
            <BrainCircuit />
            <p className="text-sm">{submissions.length}개의 퀴즈 풀이</p>
          </div>
          <div className="flex-1.5 p-4 rounded-item bg-yellow-100 flex gap-2 items-center text-yellow-600 text-xl font-medium">
            <p>+{getDaysFromToday(user.createdAt)}</p>
            <p className="text-sm">컴정고시 사용 기간</p>
          </div>
        </div>
        <LogoutButton />
      </div>
    </div>
  );
};

export default MyPage;
