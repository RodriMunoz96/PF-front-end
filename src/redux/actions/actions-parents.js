import axios from "axios";
import {
  GET_ALL_PARENTS,
  GET_PARENT,
  UPDATE_PARENT,
  DELETE_PARENT,
  GET_PARENT_ID,
} from "../action-types";

// const URL = "http://localhost:3000/parents";
// const parentIdURL = "http://localhost:3000/parentbyuser";
const { VITE_BACK_URL } = import.meta.env;

export const createParent = (data) => {
  return async () => {
    try {
      const response = await axios.post(`${VITE_BACK_URL}/parents`, data);
      return response;
    } catch (error) {
      return error.message;
    }
  };
};

export const getAllParents = () => {
  return async (dispatch) => {
    try {
      const { data } = await axios.get(`${VITE_BACK_URL}/parents`);
      return dispatch({
        type: GET_ALL_PARENTS,
        payload: data,
      });
    } catch (error) {
      return error.message;
    }
  };
};

export const getParent = (id) => {
  return async (dispatch) => {
    try {
      const { data } = await axios.get(`${VITE_BACK_URL}/parents/${id}`);
      return dispatch({
        type: GET_PARENT,
        payload: data,
      });
    } catch (error) {
      return error.message;
    }
  };
};

export const updateParent = (id, newData) => {
  return async (dispatch) => {
    try {
      const { data } = await axios.put(
        `${VITE_BACK_URL}/parents/${id}`,
        newData
      );
      return dispatch({
        type: UPDATE_PARENT,
        payload: data,
      });
    } catch (error) {
      return error.message;
    }
  };
};

export const deleteParent = (id) => {
  return async (dispatch) => {
    try {
      const { data } = await axios.put(`${VITE_BACK_URL}/parents/${id}`);
      return dispatch({
        type: DELETE_PARENT,
        payload: data,
      });
    } catch (error) {
      return error.message;
    }
  };
};

export const getParentId = (id) => {
  return async (dispatch) => {
    try {
      const { data } = await axios.get(`${VITE_BACK_URL}/parentbyuser/${id}`);
      return dispatch({
        type: GET_PARENT_ID,
        payload: data,
      });
    } catch (error) {
      return error.message;
    }
  };
};
// export const getComentarioId = (id) => {
//   return async (dispatch) => {
//     try {
//       const { data } = await axios.get(`${VITE_BACK_URL}/parentbyuser/${id}`);
//       return dispatch({
//         type: GET_PARENT_ID,
//         payload: data,
//       });
//     } catch (error) {
//       return error.message;
//     }
//   };
// };
