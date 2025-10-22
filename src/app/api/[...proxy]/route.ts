import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import axios, { AxiosError } from "axios";
import setCookieParser from "set-cookie-parser";
import { isTokenExpired } from "@/shared/utils/is-token-expired";
import {
  ACCESSTOKEN_COOKIE_OPTION,
  REFRESHTOKEN_COOKIE_OPTION,
} from "@/shared/constants/cookie-option";
import { OAUTH_PROVIDERS } from "@/shared/constants/oauth-providers";

const handler = async (
  req: NextRequest,
  { params }: { params: Promise<{ proxy: string[] }> }
): Promise<NextResponse> => {
  const cookieStore = await cookies();
  let accessToken = cookieStore.get("accessToken")?.value;
  let refreshToken = cookieStore.get("refreshToken")?.value;
  let isRefreshed = false;

  const path = await params;
  const { search } = new URL(req.url);
  const targetPath = path.proxy.join("/");
  const targetUrl = `${process.env.NEXT_PUBLIC_API_URL}/${targetPath}${search}`;

  const method = req.method.toLowerCase() as
    | "get"
    | "post"
    | "put"
    | "patch"
    | "delete"
    | "options";

  console.log("[API Proxy] Request:", {
    method,
    targetPath,
    targetUrl,
    hasAccessToken: !!accessToken,
    hasRefreshToken: !!refreshToken,
  });

  const data = ["get", "head", "delete"].includes(method)
    ? undefined
    : await req.json();

  const tryRequest = async (cookie: string) => {
    // 쿠키에서 accessToken 추출
    const accessTokenMatch = cookie.match(/accessToken=([^;]+)/);
    const extractedToken = accessTokenMatch ? accessTokenMatch[1] : "";

    console.log("[API Proxy] Token extraction:", {
      hasCookie: !!cookie,
      extractedToken: extractedToken
        ? `${extractedToken.substring(0, 20)}...`
        : "none",
    });

    const headers: Record<string, string> = {
      ...Object.fromEntries(req.headers.entries()),
      host: "",
    };

    // Authorization Bearer 헤더 추가
    if (extractedToken) {
      headers["Authorization"] = `Bearer ${extractedToken}`;
      console.log("[API Proxy] Added Authorization header");
    } else {
      console.log("[API Proxy] No token to add to Authorization header");
    }

    // 압축 관련 헤더 제거 (gzip 응답 깨짐 방지)
    delete headers["accept-encoding"];
    delete headers["content-encoding"];
    delete headers["cookie"]; // 쿠키는 제거하고 Authorization 헤더 사용

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
      withCredentials: false, // Authorization 헤더 사용하므로 false
      decompress: true,
    });
  };

  const originalCookieHeader = cookieStore.toString();
  let cookieHeaderToUse = originalCookieHeader;

  if (accessToken && isTokenExpired(accessToken)) {
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
    isRefreshed = true;

    cookieHeaderToUse = `accessToken=${newAccessToken}; refreshToken=${newRefreshToken}`;
  }

  try {
    const apiResponse = await tryRequest(cookieHeaderToUse);

    console.log("[API Proxy] Response:", {
      status: apiResponse.status,
      statusText: apiResponse.statusText,
      hasData: !!apiResponse.data,
    });

    let response;

    if (targetPath === "auth/logout") {
      response = new NextResponse(null, { status: 204 });

      response.cookies.set("accessToken", "", {
        ...ACCESSTOKEN_COOKIE_OPTION,
        maxAge: 0,
      });
      response.cookies.set("refreshToken", "", {
        ...REFRESHTOKEN_COOKIE_OPTION,
        maxAge: 0,
      });

      return response;
    }

    // OAuth 인증 엔드포인트 처리 (Google, GitHub, Naver, Kakao)
    const oauthPaths = OAUTH_PROVIDERS.map((v) => "auth/" + v);
    const isAuthLogin = targetPath === "auth/login";
    const isAuthEndpoint =
      oauthPaths.some((path) => targetPath === path) || isAuthLogin;

    console.log("[API Proxy] Auth check:", {
      targetPath,
      oauthPaths,
      isAuthEndpoint,
      status: apiResponse.status,
      hasData: !!apiResponse.data,
      dataType: typeof apiResponse.data,
      dataKeys: apiResponse.data ? Object.keys(apiResponse.data) : [],
      hasAccessToken: !!apiResponse.data?.accessToken,
      hasRefreshToken: !!apiResponse.data?.refreshToken,
    });

    // 인증 엔드포인트이고 성공 응답인 경우에만 쿠키 설정
    if (
      isAuthEndpoint &&
      apiResponse.status >= 200 &&
      apiResponse.status < 300 &&
      apiResponse.data
    ) {
      const { accessToken: newAccessToken, refreshToken: newRefreshToken } =
        apiResponse.data;

      if (newAccessToken && newRefreshToken) {
        console.log("[API Proxy] ✅ Setting auth cookies:", {
          accessToken: newAccessToken.substring(0, 20) + "...",
          refreshToken: newRefreshToken.substring(0, 20) + "...",
          cookieOptions: {
            accessToken: ACCESSTOKEN_COOKIE_OPTION,
            refreshToken: REFRESHTOKEN_COOKIE_OPTION,
          },
        });

        response = NextResponse.json(apiResponse.data, {
          status: apiResponse.status,
        });

        // 쿠키에 토큰 저장
        response.cookies.set(
          "accessToken",
          newAccessToken,
          ACCESSTOKEN_COOKIE_OPTION
        );
        response.cookies.set(
          "refreshToken",
          newRefreshToken,
          REFRESHTOKEN_COOKIE_OPTION
        );

        console.log("[API Proxy] ✅ Auth cookies set successfully");
        console.log("[API Proxy] Response cookies:", response.cookies.getAll());
        return response;
      } else {
        console.error("[API Proxy] ❌ Missing tokens in OAuth response:", {
          hasAccessToken: !!newAccessToken,
          hasRefreshToken: !!newRefreshToken,
          responseData: apiResponse.data,
          responseKeys: Object.keys(apiResponse.data || {}),
        });
      }
    }

    if (apiResponse.status === 204) {
      response = new NextResponse(null, { status: 204 });
    } else {
      response = NextResponse.json(apiResponse.data, {
        status: apiResponse.status,
      });
    }

    if (isRefreshed && accessToken && refreshToken) {
      response.cookies.set(
        "accessToken",
        accessToken,
        ACCESSTOKEN_COOKIE_OPTION
      );
      response.cookies.set(
        "refreshToken",
        refreshToken,
        REFRESHTOKEN_COOKIE_OPTION
      );
    }

    return response;
  } catch (e) {
    return NextResponse.json(
      { message: (e as AxiosError).message },
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
