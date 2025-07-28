import Footer from "@/widgets/footer/ui/Footer";
import Header from "@/widgets/header/ui/Header";
import { PropsWithChildren } from "react";

const MainLayout = ({ children }: PropsWithChildren) => {
  return (
    <div className="w-full min-h-screen pt-16">
      <Header />
      <main>{children}</main>
      <Footer />
    </div>
  );
};

export default MainLayout;
