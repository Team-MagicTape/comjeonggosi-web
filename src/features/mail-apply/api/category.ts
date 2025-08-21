import { getCategoryType } from "../types/category";
import { customFetch } from "@/shared/libs/custom-fetch";

export const getCategory = async (): Promise<getCategoryType[]> => {
  try{
    const {data} = await customFetch.get<getCategoryType[]>("/categories");
    return data;
  }catch(error){
    console.error("카테고리 정보 가져오기 실패:", error);
    return [] as getCategoryType[];
  }
};
