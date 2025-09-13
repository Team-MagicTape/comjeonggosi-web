import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import ToastContainer from "@/shared/providers/ToastProvider";
import LoadingProvider from "@/shared/providers/LoadingProvider";
import LoginModal from "@/widgets/login-modal/ui/LoginModal";
import QueryProvider from "@/shared/providers/QueryProvider";
import "@uiw/react-markdown-preview/markdown.css";
import Script from "next/script";

export const metadata: Metadata = {
  title: "컴정고시",
  description: "CS 공부는 컴정고시!",
  icons: "https://comgo.dev/favicon.ico",
  openGraph: {
    title: "컴정고시",
    description: "CS 공부는 컴정고시!",
    url: "https://comgo.dev",
    siteName: "컴정고시",
    images: [
      {
        url: "https://comgo.dev/assets/og.png",
        width: 1200,
        height: 630,
        alt: "컴정고시",
      },
    ],
    locale: "ko_KR",
    type: "website",
  },
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
      <head>
        <meta
          name="naver-site-verification"
          content="20f87f30312aa779521bfee11fdd46a4d4cdf3c9"
        />
        <meta
          name="google-site-verification"
          content="PhsLSvkuuE4o7QCk2GvBMuI-Mqvbpf3bfIeDBMhgm0M"
        />
        <Script
          async
          src="https://www.googletagmanager.com/gtag/js?id=G-ZPY0C72F9Y"
        />
        <Script
          id="google-analytics"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-ZPY0C72F9Y', {
                page_path: window.location.pathname,
              });
            `,
          }}
        />
      </head>
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
