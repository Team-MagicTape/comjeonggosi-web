import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import axios from "axios";
import setCookieParser from "set-cookie-parser";
import { isTokenExpired } from "@/shared/utils/is-token-expired";

export const handler = async (
  req: NextRequest,
  { params }: { params: Promise<{ proxy: string[] }> }
): Promise<NextResponse> => {
  const cookieStore = await cookies();
  let accessToken = cookieStore.get("accessToken")?.value;
  let refreshToken = cookieStore.get("refreshToken")?.value;
  let isRefreshed = false;

  const path = await params;
  const targetPath = path.proxy.join("/");
  const targetUrl = `${process.env.NEXT_PUBLIC_API_URL}/${targetPath}`;

  const method = req.method.toLowerCase() as
    | "get"
    | "post"
    | "put"
    | "patch"
    | "delete"
    | "options";

  const data = ["get", "head"].includes(method) ? undefined : await req.json();

  const tryRequest = async (cookie: string) => {
    const headers: Record<string, string> = {
      ...Object.fromEntries(req.headers.entries()),
      cookie,
      host: "",
    };

    if (!data || data instanceof FormData) {
      delete headers["content-type"];
    } else {
      headers["content-type"] = "application/json";
    }

    return axios.request({
      url: targetUrl,
      method,
      headers,
      data,
      validateStatus: () => true,
      withCredentials: true,
    });
  };

  if (!accessToken || !refreshToken) {
    return NextResponse.json({ message: "No token provided" }, { status: 401 });
  }

  const originalCookieHeader = cookieStore.toString();
  let cookieHeaderToUse = originalCookieHeader;

  if (isTokenExpired(accessToken)) {
    const reissue = await axios.post(
      `${process.env.NEXT_PUBLIC_API_URL}/auth/refresh`,
      {},
      {
        headers: {
          Cookie: originalCookieHeader,
        },
        withCredentials: true,
        validateStatus: () => true,
      }
    );

    if (!reissue.status.toString().startsWith("2")) {
      return NextResponse.json(
        { message: "Token reissue failed" },
        { status: 401 }
      );
    }

    const setCookies = reissue.headers["set-cookie"] || "";
    const parsed = setCookieParser.parse(setCookies, { map: true });

    const newAccessToken = parsed["accessToken"]?.value;
    const newRefreshToken = parsed["refreshToken"]?.value;

    if (!newAccessToken || !newRefreshToken) {
      return NextResponse.json(
        { message: "Reissue missing tokens" },
        { status: 401 }
      );
    }

    accessToken = newAccessToken;
    refreshToken = newRefreshToken;
    isRefreshed = true

    cookieHeaderToUse = `accessToken=${newAccessToken}; refreshToken=${newRefreshToken}`;
  }

  try {
    const apiResponse = await tryRequest(cookieHeaderToUse);

    const response = NextResponse.json(apiResponse.data, {
      status: apiResponse.status,
    });
    
    if (isRefreshed) {
      response.cookies.set("accessToken", accessToken, {
        httpOnly: true,
        secure: process.env.NEXT_PUBLIC_NODE_ENV === "production",
        path: "/",
        maxAge: 60 * 5,
      });
      response.cookies.set("refreshToken", refreshToken, {
        httpOnly: true,
        secure: process.env.NEXT_PUBLIC_NODE_ENV === "production",
        path: "/",
        maxAge: 60 * 60 * 24 * 30,
      });
    }

    return response;
  } catch (e) {
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
};

export const GET = handler;
export const POST = handler;
export const PUT = handler;
export const DELETE = handler;
export const PATCH = handler;
export const OPTIONS = handler;
