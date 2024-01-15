import { NavLink } from "react-router-dom";
import { Button } from "react-bootstrap"; // Asegúrate de importar Button de react-bootstrap
import style from "./myProfile.module.css";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getParent } from "../../../../redux/actions/actions-parents";
//import productos from "../../../../../productos.json";

function MyProfile() {
     const dispatch = useDispatch();
     const parentId = useSelector((state) => state.parentId);
     const parent = useSelector((state) => state.parent);
     const filteredParentId = parentId?.parentDetails?.[0]?.id;

     useEffect(() => {
          if (filteredParentId) {
               dispatch(getParent(filteredParentId));
               sessionStorage.setItem("parentId", filteredParentId);
          }
     }, [dispatch, filteredParentId]);

     return (
          <div>
               <h1>Mi perfil</h1>
               <div>
                    <br />
                    <div>
                         {parentId.parentDetails && parentId.parentDetails.length > 0 ? (
                              <div>
                                   <img src={parent.fotoDocumento} className={style.docImage}></img>
                                   <p>Nombre: {parent.name}</p>
                                   <p>Apellido: {parent.lastName}</p>
                                   <p>Documento: {parent.idDoc}</p>
                                   <p>Email: {parent.email}</p>
                                   <p>Teléfono personal: {parent.contactCellphone}</p>
                                   <p>Teléfono del lugar de trabajo: {parent.jobTelephone}</p>
                                   <p>Domicilio: {parent.address}</p>
                                   <p>Dirección del trabajo: {parent.jobAddress}</p>
                              </div>
                         ) : (
                              <div>
                                   <p>Aún no te has registrado como padre</p>
                                   <Button
                                        as={NavLink}
                                        to={"/formParent"}
                                        className={style.link_to_parent}
                                   >
                                        Llenar datos
                                   </Button>
                              </div>
                         )}
                    </div>
               </div>
          </div>
     );
}

export default MyProfile;
