import Header from "@/widgets/header/ui/Header";
import { PropsWithChildren } from "react";

const MainLayout = ({ children }: PropsWithChildren) => {
  return (
    <div className="w-full min-h-screen pt-32 bg-bg">
      <Header />
      <main className="xl:px-13 w-full max-w-360 mx-auto">{children}</main>
    </div>
  );
};

export default MainLayout;
