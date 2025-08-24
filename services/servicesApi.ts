import api from "../utils/api";
import AsyncStorage from "@react-native-async-storage/async-storage";

// export const getServiceBySlug = async (slug: string) => {
//   const token = await AsyncStorage.getItem("authToken");
//   const res = await api.get(`/service/${slug}`, {
//     headers: {
//       Authorization: token ? `Bearer ${token}` : "",
//     },
//   });

//   console.log("tokenss", token);
//   return res.data.data;
// };

export const getServiceById = async (slug: string) => {
  const token = await AsyncStorage.getItem("authToken");
  const res = await api.get(`/services/${slug}`, {
    headers: {
      Authorization: token ? `Bearer ${token}` : "",
    },
  });
  return res.data.data;
};