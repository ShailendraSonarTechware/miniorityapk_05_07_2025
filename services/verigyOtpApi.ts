import api from "../utils/api";

// Verify OTP
export const verifyOtp = async (payload: { email: string; otp: string }) => {
  const res = await api.post("users/verify-otp", payload);
  return res.data;
};
