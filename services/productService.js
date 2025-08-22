// services/productService.js
import api from "../utils/api"; // axios instance you already have


export const getProducts = async (page = 1, limit = 10, filters = {}) => {
  try {
    const params = {
      search: filters.search || "",
      city: filters.city || "",
      minorityType: filters.minorityType || "",
      categorySlug: filters.categorySlug || "",
      page,
      limit,
    };

    const res = await api.get("/products/list", { params });
    // API returns { success, total, page, totalPages, data: [...] }
    return res.data.data; // just the array of products
  } catch (err) {
    console.error("Error fetching products", err);
    throw err;
  }
};


export const getProductById = async (id) => {
  const res = await api.get(`/product/${id}`);
  return res.data.data; // based on your JSON shape
};