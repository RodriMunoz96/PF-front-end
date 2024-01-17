import axios from "axios";
import {
     FILTER_BY_STATE_GRADE,
     GET_ALL_GRADES,
     GET_GRADE_BY_ID,
     POST_GRADE,
     REMOVE_GRADE,
     UPDATE_GRADE,
} from "../action-types";
const { VITE_BACK_URL } = import.meta.env;

// const URL = "http://localhost:3000/grade";

export const getAllGrades = () => {
     return async (dispatch) => {
          try {
               const { data } = await axios.get(`${VITE_BACK_URL}/grade`);
               return dispatch({
                    type: GET_ALL_GRADES,
                    payload: data,
               });
          } catch (error) {
               alert(error.message);
          }
     };
};

export const getGradeById = (id) => {
     return async (dispatch) => {
          try {
               const { data } = await axios.get(`${VITE_BACK_URL}/grade/${id}`);
               return dispatch({
                    type: GET_GRADE_BY_ID,
                    payload: data,
               });
          } catch (error) {
               alert(error.message);
          }
     };
};

export const updateGrade = ({ id, grade }) => {
     return async (dispatch) => {
       try {
          const { data } = await axios.put(`${VITE_BACK_URL}/grade/${id}`, grade); // Add a slash here
         return dispatch({
           type: UPDATE_GRADE,
           payload: data,
         });
       } catch (error) {
         alert(error.message);
       }
     };
   };
export const removeGrade = (id) => {
     return async (dispatch) => {
          try {
               await axios.put(`${VITE_BACK_URL}/gradedel/${id}`);
               return dispatch({
                    type: REMOVE_GRADE,
               });
          } catch (error) {
               alert(error.message);
          }
     };
};

export const filterByStateGrade = (value) => {
     return async (dispatch) => {
          try {
               return dispatch({
                    type: FILTER_BY_STATE_GRADE,
                    payload: value,
               });
          } catch (error) {
               alert(error.message);
          }
     };
};

export const postGrade = (data) => {
     return async (dispatch) => {
          try {
               await axios.post(`${VITE_BACK_URL}/grade`, data);
               return dispatch({
                    type: POST_GRADE,
               });
          } catch (error) {
               alert(error.message);
          }
     };
};
