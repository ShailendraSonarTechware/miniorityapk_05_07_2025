
import api from "../utils/api"; // axios instance you already have

export const createBooking = async (payload) => {
  try {
    const response = await api.post("/bookings/create", payload);
    // const response = await api.post("/api/bookings/create", payload);
    return response.data;
  } catch (error) {
    console.error("Booking API Error:", error.response?.data || error.message);
    throw error;
  }
};