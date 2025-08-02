import { fetchUser } from "@/entities/user/api/user"
import LoginButton from "@/widgets/login-button/ui/LoginButton";

const Main = async () => {
  const user = await fetchUser();

  if(!user) {
    return <LoginButton />
  }

  return (
    <div className="bg-gray-100 h-main">
      {user.nickname}
    </div>
  )
}

export default Main