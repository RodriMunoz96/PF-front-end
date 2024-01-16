import axios from "axios";
import {
  GET_VALORACION,
  GET_HAS_RATED,
  SAVE_COMENTARIO_ID,
} from "../action-types";

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
export const editValoracion = (data, id) => {
  return async () => {
    try {
      console.log("En la action la data es: ", data);
      console.log("En la action el id es: ", id);
      const response = await axios.put(
        `${VITE_BACK_URL}/valoracion/${id}`,
        data
      );
      return response;
    } catch (error) {
      return error.message;
    }
  };
};
export const getValoracion = (id) => {
  return async (dispatch) => {
    try {
      const { data } = await axios.get(`${VITE_BACK_URL}/valoracion/${id}`);
      return dispatch({
        type: GET_VALORACION,
        payload: data,
      });
    } catch (error) {
      return error.message;
    }
  };
};
// export const getAllAdmins = () => {
//   return async (dispatch) => {
//     try {
//       const { data } = await axios.get(`${VITE_BACK_URL}/SuperAdmin/admins`);
//       return dispatch({
//         type: GET_ALL_ADMINS,
//         payload: data,
//       });
//     } catch (error) {
//       alert(error.message);
//     }
//   };
// };
export const hasParentRated = (parentId) => {
  return async (dispatch) => {
    try {
      const { data } = await axios.get(
        `${VITE_BACK_URL}/valoracion/rated/${parentId}`
      );
      return dispatch({
        type: GET_HAS_RATED,
        payload: data,
      });
    } catch (error) {
      return error.message;
    }
  };
};
export const saveComentarioId = (comentarioId) => {
  return async (dispatch) => {
    try {
      const data = comentarioId;
      return dispatch({
        type: SAVE_COMENTARIO_ID,
        payload: data,
      });
    } catch (error) {
      return error.message;
    }
  };
};
