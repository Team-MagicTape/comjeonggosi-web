import { LoginData } from "../types/login-data";
import axios from "axios";

export const login = async (loginData: LoginData) => {
  const res = await axios.post(process.env.NEXT_PUBLIC_API_URL + '/auth/login', loginData);
  return res;
}