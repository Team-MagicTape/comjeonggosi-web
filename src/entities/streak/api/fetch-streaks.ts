import { apiClient } from "@/shared/libs/custom-axios";
import { Streak } from "../type/streak-type";
import { customFetch } from "@/shared/libs/custom-fetch";
export const fetchStreak = async (): Promise<Streak | null> => {
  try{
    const { data } = await customFetch.get<Streak>('/streaks/reminder');
    return data;
  }catch(error){
    console.error("Failed to fetch streak:", error);
    throw error;
  }
}