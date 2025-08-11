import { fetchUser } from "@/entities/user/api/fetch-user";
import UserAvatar from "@/entities/user/ui/UserAvatar";
import Spacer from "@/shared/ui/Spacer";
import Link from "next/link";

const Header = async () => {
  const user = await fetchUser();

  return (
    <header className="w-full fixed top-2 xl:top-6 z-10 flex justify-center px-2 xl:px-13">
      <div className="w-full max-w-334 h-14 xl:h-20 bg-white border border-border rounded-2xl px-2 xl:px-8 flex items-center">
        <Link href="/">
          <h1 className="text-primary xl:text-3xl font-black">COMJEONGGOSI</h1>
        </Link>
        <Spacer />
        <UserAvatar size={56} user={user} />
      </div>
    </header>
  );
};

export default Header;
