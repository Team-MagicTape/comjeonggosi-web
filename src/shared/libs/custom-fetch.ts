import { cookies } from "next/headers";

const request = async <T>(url: string, options: RequestInit = {}) => {
  try {
    const cookieStore = await cookies();
    const cookieString = cookieStore.toString();

    // 서버 컴포넌트에서는 Next.js API proxy를 통해 요청
    // 절대 URL 사용 (서버에서 자신의 API route 호출)
    const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000';
    const proxyUrl = `${baseUrl}/api${url}`;

    const fetchOptions: RequestInit = {
      ...options,
      headers: {
        ...(options.headers || {}),
        'Cookie': cookieString, // API proxy가 백엔드로 전달
       
      },
      cache: 'no-store', // 항상 최신 데이터 가져오기
    };

    if (fetchOptions.body instanceof FormData) {
      fetchOptions.headers = fetchOptions.headers
        ? { ...fetchOptions.headers }
        : {};
    } else {
      fetchOptions.headers = fetchOptions.headers
        ? { ...fetchOptions.headers, "Content-Type": "application/json" }
        : { "Content-Type": "application/json" };
    }
    
    const response = await fetch(proxyUrl, fetchOptions);

    if(!response.ok) {
      const errorText = await response.text().catch(() => 'No error body');
      throw new Error(`${response.status || 500}`);
    }

    const res = (await response.json()) as T;

    return { data: res, status: response.status };
  } catch (e) {
    throw e;
  }
};

export const customFetch = {
  get: <T>(url: string) => request<T>(url),

  post: <T>(url: string, body: object) =>
    request<T>(url, {
      method: "POST",
      body: body ? JSON.stringify(body) : undefined,
    }),

  patch: <T>(url: string, body: object) =>
    request<T>(url, {
      method: "PATCH",
      body: body ? JSON.stringify(body) : undefined,
    }),

  delete: <T>(url: string) =>
    request<T>(url, {
      method: "DELETE",
    }),
};