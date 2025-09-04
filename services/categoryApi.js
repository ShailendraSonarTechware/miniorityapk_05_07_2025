import api from "../utils/api";

// ✅ Get all service categories
export const getServiceCategories = async () => {
  const res = await api.get("/admin/category/service");
  return res.data.categories; // only return categories
};