// services/serviceApi.ts
import api from "../utils/api";

// Get list of services
export const getServices = async () => {
  const res = await api.get("/services/list");
  return res.data;
};