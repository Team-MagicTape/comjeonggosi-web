import AdminLayoutContent from "@/widgets/layout/ui/AdminLayoutContent";
import { fetchUser } from "@/entities/user/api/fetch-user";
import { redirect } from "next/navigation";

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const user = await fetchUser();

  // if (!user) {
  //   redirect("/");
  // }

  return <AdminLayoutContent>{children}</AdminLayoutContent>;
}
