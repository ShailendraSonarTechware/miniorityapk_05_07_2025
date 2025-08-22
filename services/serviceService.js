import api from "../utils/api";

export const getCategories = async () => {
  const res = await api.get("/admin/category/product");
  return res.data;
};