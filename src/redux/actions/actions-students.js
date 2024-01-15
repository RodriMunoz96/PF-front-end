import {
     GET_ALL_STUDENTS,
     GET_STUDENT,
     UPDATE_STUDENT,
     DELETE_STUDENT,
     GET_STUDENTS_BY_PARENTS,
} from "../action-types";
import axios from "axios";

// const URL = "http://localhost:3000/estudiantes";
const { VITE_BACK_URL } = import.meta.env;

export const createStudent = (data) => {
     return async () => {
          console.log("informacion del front hacia el back", data);
          try {
               const response = await axios.post(`${VITE_BACK_URL}/estudiantes`, data);
               return response;
          } catch (error) {
               return error.message;
          }
     };
};

export const getAllStudents = () => {
     return async (dispatch) => {
          try {
               const { data } = axios.get(`${VITE_BACK_URL}/estudiantes`);
               return dispatch({
                    type: GET_ALL_STUDENTS,
                    payload: data,
               });
          } catch (error) {
               return error.message;
          }
     };
};

export const getStudent = (id) => {
     return async (dispatch) => {
          try {
               const { data } = await axios.get(`${VITE_BACK_URL}/estudiantes/${id}`);
               return dispatch({
                    type: GET_STUDENT,
                    payload: data,
               });
          } catch (error) {
               return error.message;
          }
     };
};

export const updateStudent = (id, newData) => {
     return async (dispatch) => {
          try {
               const { data } = await axios.put(
                    `${VITE_BACK_URL}/estudiantes/${id}`,
                    newData
               );
               return dispatch({
                    type: UPDATE_STUDENT,
                    payload: data,
               });
          } catch (error) {
               return error.message;
          }
     };
};

export const deleteStudent = (id) => {
     return async (dispatch) => {
          try {
               const { data } = await axios.put(`${VITE_BACK_URL}/estudiantes/${id}`);
               return dispatch({
                    type: DELETE_STUDENT,
                    payload: data,
               });
          } catch (error) {
               return error.message;
          }
     };
};

export const getStudentsByParents = (id) => {
     return async (dispatch) => {
          try {
               const { data } = await axios.get(
                    `${VITE_BACK_URL}/estudiantesbyparents/${id}`
               );
               return dispatch({
                    type: GET_STUDENTS_BY_PARENTS,
                    payload: data,
               });
          } catch (error) {
               return error.message;
          }
     };
};
