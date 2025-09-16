import { fetchUser } from "@/entities/user/api/fetch-user";
import MainLayoutContent from "@/widgets/layout/ui/MainLayoutContent";

export default async function MainLayout({ children }: { children: React.ReactNode }) {
  const user = await fetchUser();

  return <MainLayoutContent user={user}>{children}</MainLayoutContent>;
}