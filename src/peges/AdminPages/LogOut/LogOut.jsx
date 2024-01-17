import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import logout from "../../../Img/imgViewParent/logoutIcon.svg";
import { logoutUser } from "../../../redux/actions/actions-login";
import { useDispatch } from "react-redux";
import style from './LogOut.module.css'
const { VITE_FRONT_URL } = import.meta.env;

const LogoutButton = () => {
     // const valorToken = sessionStorage.getItem("token");
     const subtype = sessionStorage.getItem("subtype");
     //
     const dispatch = useDispatch();
     if (subtype === 2) {
          const { logout } = useAuth0();
             const onLogout = () => {
                 // Realiza acciones adicionales después del logout
                 console.log("Usuario deslogueado correctamente");
              };

          sessionStorage.removeItem("token");
          sessionStorage.removeItem("type");
          sessionStorage.removeItem("nombre");
          sessionStorage.removeItem("subtype");
          sessionStorage.removeItem("userId");
          sessionStorage.removeItem("parentId");

          return (
               <button className={style.logoutButton}
                    onClick={() =>
                         logout({
                              logoutParams: {
                                   returnTo: window.location.origin,
                                   onRedirectCallback: onLogout,
                              },
                         })
                    }
               >
                    Log Out
               </button>
          );
     } else {
          const handleLogout = () => {
               // Eliminar los datos de sesión del sessionStorage
               sessionStorage.removeItem("token");
               sessionStorage.removeItem("type");
               sessionStorage.removeItem("nombre");
               sessionStorage.removeItem("subtype");
               sessionStorage.removeItem("userId");
               sessionStorage.removeItem("parentId");
               // Limpiar el estado global
               dispatch(logoutUser());
               // Redirigir a la página inicial
               window.location.href = `${VITE_FRONT_URL}/`;
          };

          return (
               <button className={style.logoutButton} onClick={handleLogout} img={logout}>
                    Cerrar sesión
               </button>
          );
     }
};

export default LogoutButton;

/*
<Button className="my-2" onClick={() => renderPage("LogOut")}>
              Cerrar Sesión
            </Button>
*/
