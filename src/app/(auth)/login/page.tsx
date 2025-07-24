import LoginForm from "@/features/login/ui/LoginForm";
import CustomLink from "@/shared/ui/CustomLink";

const Login = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            로그인
          </h2>
        </div>
        <LoginForm />
        <div className="text-sm text-center">
          <CustomLink href="/signup" className="font-medium text-indigo-600 hover:text-indigo-500">
            계정이 없으신가요? 회원가입
          </CustomLink>
        </div>
      </div>
    </div>
  );
}

export default Login