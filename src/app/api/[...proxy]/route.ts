import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import axios from "axios";
import setCookieParser from 'set-cookie-parser'

export const handler = async (
  req: NextRequest,
  { params }: { params: { proxy: string[] } }
): Promise<NextResponse> => {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("accessToken")?.value;
  const refreshToken = cookieStore.get("refreshToken")?.value;

  const targetPath = params.proxy.join("/");
  const targetUrl = `${process.env.NEXT_PUBLIC_API_URL}/${targetPath}`;

  const method = req.method.toLowerCase() as
    | "get"
    | "post"
    | "put"
    | "patch"
    | "delete"
    | "options";

  const data = ["get", "head"].includes(method) ? undefined : await req.json();

  const tryRequest = async (cookie?: string) => {
    const headers: Record<string, string> = {
      ...Object.fromEntries(req.headers.entries()),
      cookie: cookie || cookieStore.toString(),
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
      withCredentials: true,
      validateStatus: () => true,
    });
  };

  if (!accessToken) {
    return NextResponse.json({ message: "No access token" }, { status: 401 });
  }

  try {
    let apiResponse = await tryRequest();

    if (apiResponse.status === 401 || apiResponse.status === 419) {
      if (!refreshToken) {
        return NextResponse.json(
          { message: "No refresh token" },
          { status: 401 }
        );
      }

      const reissueResponse = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/auth/refresh`,
        {},
        {
          headers: {
            Cookie: cookieStore.toString(),
          },
          withCredentials: true,
          validateStatus: () => true,
        }
      );

      const setCookies = reissueResponse.headers["set-cookie"];
      if (
        !reissueResponse.status.toString().startsWith("2") ||
        !setCookies ||
        setCookies.length === 0
      ) {
        return NextResponse.json(
          { message: "Token reissue failed" },
          { status: 401 }
        );
      }

      const parsed = setCookieParser.parse(setCookies, { map: true });

      const newAccessToken = parsed["accessToken"]?.value;
      const newRefreshToken = parsed["refreshToken"]?.value;

      const newCookieHeader = `accessToken=${newAccessToken}; refreshToken=${newRefreshToken}`;

      apiResponse = await tryRequest(newCookieHeader);

      const proxyRes = new NextResponse(JSON.stringify(apiResponse.data), {
        status: apiResponse.status,
      });

      for (const [key, value] of Object.entries(apiResponse.headers)) {
        if (Array.isArray(value)) {
          proxyRes.headers.set(key, value.join(", "));
        } else if (value !== undefined) {
          proxyRes.headers.set(key, value.toString());
        }
      }

      for (const cookie of setCookies) {
        proxyRes.headers.append("Set-Cookie", cookie);
      }

      return proxyRes;
    }

    const proxyRes = new NextResponse(JSON.stringify(apiResponse.data), {
      status: apiResponse.status,
    });

    for (const [key, value] of Object.entries(apiResponse.headers)) {
      if (Array.isArray(value)) {
        proxyRes.headers.set(key, value.join(", "));
      } else if (value !== undefined) {
        proxyRes.headers.set(key, value.toString());
      }
    }

    return proxyRes;
  } catch (e) {
    console.error("Proxy Error:", e);
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
