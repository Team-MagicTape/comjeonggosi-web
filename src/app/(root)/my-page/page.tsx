import { MySubmission } from "@/entities/quiz/types/my-submission";
import { User } from "@/entities/user/types/user";
import UserAvatar from "@/entities/user/ui/UserAvatar";
import LogoutButton from "@/widgets/login-button/ui/LogoutButton";
import MySubmissions from "@/widgets/section/ui/MySubmissions";

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

  return (
    <div className="w-full flex items-start gap-4 flex-col xl:flex-row">
      <div className="w-full xl:w-auto xl:flex-1 flex flex-col gap-4">
        <MySubmissions submissions={submissions} />
        <div className="w-full p-4 border border-border bg-white rounded-2xl">
          오늘의 질문
        </div>
        <div className="w-full p-4 border border-border bg-white rounded-2xl">
          받은 질문들
        </div>
      </div>
      <div className="w-full xl:w-80 p-4 border border-border bg-white rounded-2xl xl:sticky xl:top-30 flex flex-col gap-4">
        <div className="w-full flex items-center gap-4">
          <UserAvatar user={user} size={80} />
          <div>
            <p className="text-2xl font-bold text-gray-900">{user.nickname}</p>
            <p className="text-sm text-gray-500">{user.email}</p>
          </div>
        </div>
        <LogoutButton />
      </div>
    </div>
  );
};

export default MyPage;
