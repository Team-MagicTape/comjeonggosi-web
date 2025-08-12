import UserAvatar from "@/entities/user/ui/UserAvatar";
import { fetchUser } from "@/entities/user/api/user";
import MyQuestion from "@/entities/question/ui/my-question";
import MyQuiz from "@/entities/quiz/ui/my-quiz";

const MyPage = async () => {
  const user = await fetchUser();
  if (!user) {
    return <div>User not found</div>;
  }
  return (
    <div>
      <h1>My Page</h1>
      <UserAvatar user={user} size={100}/>
      <MyQuestion />
      <MyQuiz />
    </div>
  );
};

export default MyPage;