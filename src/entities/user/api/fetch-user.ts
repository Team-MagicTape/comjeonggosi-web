import { customFetch } from "@/shared/libs/custom-fetch";
import { User } from "../types/user";
import { cookies } from "next/headers";

export const fetchUser = async () => {
  const cookieStore = await cookies();
  console.log(cookieStore.toString());
  if(!cookieStore.get("accessToken")?.value) {
    return null;
  }
  try {
    const { data } = await customFetch.get<User>("/users/my");
    return data;
  } catch(e){
    console.log(e);
    return null;
  }
};
