import { NavLink } from "react-router-dom";
import { Button } from "react-bootstrap";
import style from "./myProfile.module.css";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getParent } from "../../../../redux/actions/actions-parents";

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
    <div className={style.main_container}>
      <h2 className={style.title}>Datos personales</h2>
      <div>
        <br />
        <div>
          {parentId.parentDetails && parentId.parentDetails.length > 0 ? (
            <div className={style.profile_container}>
              <img src={parent.fotoDocumento} className={style.docImage}></img>
              <p>
                <strong>Nombre:</strong> {parent.name}
              </p>
              <p>
                <strong>Apellido:</strong> {parent.lastName}
              </p>
              <p>
                <strong>Documento:</strong> {parent.idDoc}
              </p>
              <p>
                <strong>Email:</strong> {parent.email}
              </p>
              <p>
                <strong>Teléfono personal:</strong> {parent.contactCellphone}
              </p>
              <p>
                <strong>Teléfono del lugar de trabajo:</strong>{" "}
                {parent.jobTelephone}
              </p>
              <p>
                <strong>Domicilio:</strong> {parent.address}
              </p>
              <p>
                <strong>Dirección del trabajo:</strong> {parent.jobAddress}
              </p>
              {!parent.state && (
                <p>
                  <strong>
                    El padre se encuentra suspendido temporalmente, para más
                    información contactar al administrador escolar.
                  </strong>
                </p>
              )}
            </div>
          ) : (
            <div>
              <h5>Aún no te has registrado como padre</h5>

              <Button
                as={NavLink}
                to={"/formParent"}
                className={style.link_to_parent}
              >
                Llenar datos
              </Button>
            </div>
          )}
          <br />
          {parentId.parentDetails &&
            parentId.parentDetails.length > 0 &&
            !parent.validate && (
              <div className={style.validation_message}>
                <h5>
                  Su perfil está en proceso de validación; una vez el
                  administrador lo valide, podrá inscribir a sus estudiantes.
                </h5>
              </div>
            )}
        </div>
      </div>
    </div>
  );
}

export default MyProfile;
