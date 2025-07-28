import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import ToastContainer from "@/shared/providers/ToastProvider";
import LoadingProvider from "@/shared/providers/LoadingProvider";
import LoginModal from "@/widgets/login-modal/ui/LoginModal";
import QueryProvider from "@/shared/providers/QueryProvider";

export const metadata: Metadata = {
  title: "컴정고시",
  description: "CS 공부는 컴정고시!",
};

const pretendard = localFont({
  src: "../shared/fonts/pretendard.woff2",
  variable: "--font-prendard",
  weight: "100 900",
  display: "swap",
});

const RootLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <html lang="ko">
      <body className={`${pretendard.variable} antialiased`}>
        <ToastContainer />
        <LoadingProvider color="#6969FF" />
        <QueryProvider>{children}</QueryProvider>
        <LoginModal />
      </body>
    </html>
  );
};

export default RootLayout;
