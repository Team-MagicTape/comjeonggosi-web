import axios from "axios";

export const logout = async () => {
  try {
    const { status } = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/auth/logout`, null, { withCredentials: true });
    return status;
  } catch {
    return null;
  }
};
