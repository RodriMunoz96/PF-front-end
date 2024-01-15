import axios from "axios";

// const URL = "http://localhost:3000/valoracion";
const { VITE_BACK_URL } = import.meta.env;

export const createValoracion = (data) => {
  return async () => {
    try {
      const response = await axios.post(`${VITE_BACK_URL}/valoracion`, data);
      return response;
    } catch (error) {
      return error.message;
    }
  };
};
