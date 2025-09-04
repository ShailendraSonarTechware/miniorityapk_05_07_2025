// services/resendOtpApi.ts
import api from "../utils/api"; // 👈 your axios instance

export const resendOtp = async (email: string) => {
  const res = await api.post("users/resend-otp", { email });
  return res.data;
};
