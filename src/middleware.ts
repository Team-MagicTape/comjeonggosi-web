import { NextRequest, NextResponse } from "next/server";
import { isTokenExpired } from "./shared/utils/is-token-expired";
import {
  ACCESSTOKEN_COOKIE_OPTION,
  REFRESHTOKEN_COOKIE_OPTION,
} from "./shared/constants/cookie-option";

const middleware = async (req: NextRequest) => {
  const isVisited = !!req.cookies.get("visited")?.value;

  if (!isVisited && req.nextUrl.pathname === "/") {
    const url = req.nextUrl.clone();
    url.pathname = "/quizzes";

    const res = NextResponse.redirect(url);
    res.cookies.set("visited", "true", {
      path: "/",
      httpOnly: false,
    });

    return res;
  }
  try {
    const { pathname } = req.nextUrl;

    if (
      pathname.startsWith("/api/") ||
      pathname.startsWith("/login") ||
      pathname.startsWith("/signup")
    ) {
      return NextResponse.next();
    }

    const accessToken = req.cookies.get("accessToken")?.value;
    const refreshToken = req.cookies.get("refreshToken")?.value;

    if (!accessToken && !refreshToken) {
      return NextResponse.next();
    }

    if (
      (accessToken && isTokenExpired(accessToken))
      // (!accessToken && refreshToken)
    ) {
      const refreshResponse = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/auth/refresh`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ refreshToken }),
        }
      );

      if (!refreshResponse.ok) {
        return NextResponse.redirect(new URL("/login", req.url));
      }

      const { accessToken: newAccessToken, refreshToken: newRefreshToken } =
        await refreshResponse.json();

      const res = NextResponse.next();

      res.cookies.set("accessToken", newAccessToken, ACCESSTOKEN_COOKIE_OPTION);
      res.cookies.set(
        "refreshToken",
        newRefreshToken,
        REFRESHTOKEN_COOKIE_OPTION
      );

      return res;
    }

    return NextResponse.next();
  } catch {
    return NextResponse.redirect(new URL("/login", req.url));
  }
};

export const config = {
  matcher: [
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    "/(api|trpc)(.*)",
  ],
};

export default middleware;
