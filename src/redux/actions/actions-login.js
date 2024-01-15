import {
     LOGIN_USER_REQUEST,
     LOGIN_USER_SUCCESS,
     LOGIN_USER_FAILURE,
     LOGOUT_USER,
} from "../action-types";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
const { VITE_BACK_URL } = import.meta.env;

export const loginUserRequest = () => ({ type: LOGIN_USER_REQUEST });

export const loginUserSuccess = (token) => {
     sessionStorage.setItem("token", token);
     const decodedToken = jwtDecode(token);
     const decodedType = decodedToken.type;
     const decodednombre = decodedToken.nombre;
     const decodedsubtype = decodedToken.subtype;
     const decodedid = decodedToken.userId;
     sessionStorage.setItem("type", decodedType);
     sessionStorage.setItem("nombre", decodednombre);
     sessionStorage.setItem("subtype", decodedsubtype);
     sessionStorage.setItem("userId", decodedid);
     return { type: LOGIN_USER_SUCCESS, payload: token };
};

export const loginUserFailure = (error) => ({
     type: LOGIN_USER_FAILURE,
     payload: error,
});

export const loginUser = (loginData) => async (dispatch) => {
     dispatch(loginUserRequest());
     try {
          const response = await axios.post(`${VITE_BACK_URL}/login`, loginData);
          dispatch(loginUserSuccess(response.data.token));
     } catch (error) {
          console.error("Error en la autenticación:", error);
          dispatch(
               loginUserFailure(
                    error.response
                         ? error.response.data
                         : "Hubo un problema con la autenticación del usuario"
               )
          );
     }
};

export const logoutUser = () => {
     return { type: LOGOUT_USER };
};
