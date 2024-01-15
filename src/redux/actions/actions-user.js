import {
     GET_ALL_USERS,
     GET_USER,
     UPDATE_USER,
     DELETE_USER,
     SET_USER_ACTIVE,
} from "../action-types";
import axios from "axios";

// const URL = "http://localhost:3000/user";
const { VITE_BACK_URL } = import.meta.env;

export const createUser = (data) => {
     return async () => {
          try {
               const response = await axios.post(`${VITE_BACK_URL}/user`, data);
               return response;
          } catch (error) {
               return error.message;
          }
     };
};

export const getAllUsers = () => {
     return async (dispatch) => {
          try {
               const { data } = await axios.get(`${VITE_BACK_URL}/user`);
               return dispatch({
                    type: GET_ALL_USERS,
                    payload: data,
               });
          } catch (error) {
               return error.message;
          }
     };
};

export const getUser = (id) => {
     return async (dispatch) => {
          try {
               const { data } = await axios.get(`${VITE_BACK_URL}/user/${id}`);
               return dispatch({
                    type: GET_USER,
                    payload: data,
               });
          } catch (error) {
               return error.message;
          }
     };
};

export const updateUser = (id, newData) => {
     return async (dispatch) => {
          try {
               const { data } = await axios.put(`${VITE_BACK_URL}/user/${id}`, newData);
               return dispatch({
                    type: UPDATE_USER,
                    payload: data,
               });
          } catch (error) {
               return error.message;
          }
     };
};

export const deleteUser = (id) => {
     return async (dispatch) => {
          try {
               const { data } = await axios.put(`${VITE_BACK_URL}/user/${id}`);
               return dispatch({
                    type: DELETE_USER,
                    payload: data,
               });
          } catch (error) {
               return error.message;
          }
     };
};

export const setUserActive = (userId) => {
     return {
          type: SET_USER_ACTIVE,
          payload: userId,
     };
};
