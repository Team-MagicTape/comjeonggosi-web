import axios from "axios";

export const logout = async () => {
  try {
    const { status } = await axios.post("/api/auth/logout", null, { withCredentials: true });
    return status;
  } catch {
    return null;
  }
};
