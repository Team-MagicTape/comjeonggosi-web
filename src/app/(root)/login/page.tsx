import { cookies } from "next/headers"

const Login = async () => {
  const cookie = await cookies();

  console.log("cookie", cookie.toString());

  return (
    <div>Login</div>
  )
}

export default Login