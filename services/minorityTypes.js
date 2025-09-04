import api from "../utils/api";

// ✅ Get all minority types
export const getMinorityTypes = async () => {
  const res = await api.get("/minority-types");
  // only return active types

  console.log(res)
  return res.data.filter(x => x && x.isActive);
};
