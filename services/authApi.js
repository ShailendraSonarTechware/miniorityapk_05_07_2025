import api from "../utils/api";

export const registerUser = async (payload) => {
  try {
    const res = await api.post("/users/register", payload);
    console.log(res)
    return res.data; // ✅ returns only the response data
  } catch (error) {
    // Re-throw the error so it can be handled by the caller
    throw error;
  }
};
