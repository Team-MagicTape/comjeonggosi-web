import { customFetch } from "@/shared/libs/custom-fetch";
import { Workbook } from "../types/workbook";

export const fetchWorkbook = async (id: number) => {
  try {
    const { data } = await customFetch.get<Workbook>(`/workbook/${id}`);
    return data;
  } catch (e) {
    console.log(e);
    return null;
  }
};
