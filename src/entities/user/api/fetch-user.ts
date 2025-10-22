import { customFetch } from "@/shared/libs/custom-fetch";
import { User } from "../types/user";
import { cookies } from "next/headers";
import { GET_CURRENT_USER } from "@/shared/libs/graphql-queries";

interface UserResponse {
  data: {
    me: User;
  };
}

export const fetchUser = async () => {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("accessToken")?.value;
  
  if(!accessToken) {
    return null;
  }
  
  try {
    const { data } = await customFetch.post<UserResponse>("/graphql", {
      query: GET_CURRENT_USER,
    });
    
    return data.data.me;
  } catch(e: unknown){
    const error = e as Error;
    console.error('[fetchUser] Error:', error.message);
    return null;
  }
};
