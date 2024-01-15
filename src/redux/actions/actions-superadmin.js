import axios from "axios";
import {
     BAN_ADMIN,
     FILTER_BY_STATE,
     GET_ADMIN_BY_EMAIL,
     GET_ADMIN_BY_ID,
     GET_ADMIN_BY_NAME,
     GET_ALL_ADMINS,
     RESTORE_ADMIN,
     SET_CURRENT_PAGE,
} from "../action-types";

// const URL = "http://localhost:3000/SuperAdmin/";
const { VITE_BACK_URL } = import.meta.env;

export const getAllAdmins = () => {
     return async (dispatch) => {
          try {
               const { data } = await axios.get(`${VITE_BACK_URL}/SuperAdmin/admins`);
               return dispatch({
                    type: GET_ALL_ADMINS,
                    payload: data,
               });
          } catch (error) {
               alert(error.message);
          }
     };
};

export const getAdminById = (id) => {
     return async (dispatch) => {
          try {
               const { data } = await axios.get(
                    `${VITE_BACK_URL}/SuperAdmin/admin/${id}`
               );
               return dispatch({
                    type: GET_ADMIN_BY_ID,
                    payload: data,
               });
          } catch (error) {
               alert(error.message);
          }
     };
};

export const setCurrentPage = (pageNum) => {
     return {
          type: SET_CURRENT_PAGE,
          payload: pageNum,
     };
};

export const getAdminByName = (name) => {
     return async (dispatch) => {
          try {
               const { data } = await axios.get(
                    `${VITE_BACK_URL}/SuperAdmin/adminByName/${name}`
               );
               return dispatch({
                    type: GET_ADMIN_BY_NAME,
                    payload: data,
               });
          } catch (error) {
               alert(error.message);
          }
     };
};
export const getAdminByEmail = (email) => {
     return async (dispatch) => {
          try {
               const { data } = await axios.get(
                    `${VITE_BACK_URL}/SuperAdmin/adminByEmail/${email}`
               );
               return dispatch({
                    type: GET_ADMIN_BY_EMAIL,
                    payload: data,
               });
          } catch (error) {
               alert(error.message);
          }
     };
};

export const banAdmin = ({ id }) => {
     return async (dispatch) => {
          try {
               await axios.put(`${VITE_BACK_URL}/SuperAdmin/admin/${id}`);
               return dispatch({
                    type: BAN_ADMIN,
               });
          } catch (error) {
               alert(error.message);
          }
     };
};

export const restoreAdmin = (id) => {
     return async (dispatch) => {
          try {
               await axios.put(`${VITE_BACK_URL}/SuperAdmin/admin/${id}`);
               return dispatch({
                    type: RESTORE_ADMIN,
               });
          } catch (error) {
               alert(error.message);
          }
     };
};

export const filterByState = (value) => {
     return async (dispatch) => {
          try {
               return dispatch({
                    type: FILTER_BY_STATE,
                    payload: value,
               });
          } catch (error) {
               alert(error.message);
          }
     };
};
