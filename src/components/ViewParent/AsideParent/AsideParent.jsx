import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Links from "./Links/Links";
import style from "./asideParent.module.css";
// import { Collapse } from "react-bootstrap";
import myProfile from "../../../Img/imgViewParent/iconMyProfile.png";
import myChildren from "../../../Img/imgViewParent/iconChild.png";
import myBook from "../../../Img/imgViewParent/iconBook.png";
import logout from "../../../Img/imgViewParent/logoutIcon.svg";
import comentariosPNG from "../../../Img/imgViewParent/comentarios.png";
import LogoutButton from "../../../peges/AdminPages/LogOut/LogOut";
import { getParent } from "../../../redux/actions/actions-parents";
import {
  hasParentRated,
  saveComentarioId,
} from "../../../redux/actions/actions-valoraciones";

const { VITE_BACK_URL } = import.meta.env;

const user = sessionStorage;
const parentId = sessionStorage.getItem("parentId");

function AsideParent() {
  const [comentarios, setComentarios] = useState([]);
  const [comentarioId, setComentaioId] = useState({});
  useEffect(() => {
    fetch(`${VITE_BACK_URL}/valoracion`)
      .then((response) => response.json())
      .then((data) => setComentarios(data))
      .catch((error) => console.error("Error fetching data:", error));
  }, []);
  useEffect(() => {
    for (const comentario of comentarios) {
      if (comentario.Parents[0] && comentario.Parents[0].id === parentId) {
        setComentaioId(comentario.id);
      }
    }
  }, [comentarios]);
  useEffect(() => {
    dispatch(saveComentarioId(comentarioId));
  }, [comentarioId]);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getParent(parentId));
    dispatch(hasParentRated(parentId));
  }, [dispatch]);

  const parent = useSelector((state) => state.parent);
  const rated = useSelector((state) => state.rated);
  // const [open, setOpen] = useState(false);
  return (
    <aside className={style.container_aside}>
      <div className={style.container_dad_name}>
        <h1>
          BIENVENIDO A TU SESION <br /> <br /> {user ? user.nombre : ""}
        </h1>
      </div>
      <hr />
      <div className={style.container_links}>
        <Links url={"myProfile"} img={myProfile} name={"Mi Perfil"} />
        {parent && parent.validate && (
          <Links url={"myChildren"} img={myChildren} name={"Mis hijos"} />
        )}
        {parent && parent.validate && (
          <Links url={"studentForm"} img={myBook} name={"Incribir a mi hijo"} />
        )}
        {!rated.hasRated && parent && parent.validate && (
          <Links
            url={"comentario"}
            img={comentariosPNG}
            name={"Dejanos tu comentario"}
          />
        )}
        {rated.hasRated && parent && parent.validate && (
          <Links
            url={`comentEdit`}
            img={comentariosPNG}
            name={"Modificar mi comentario"}
          />
        )}

        <LogoutButton img={logout} className={style.container_links} />
      </div>
    </aside>
  );
}

export default AsideParent;

/* {
  !parent.validate && (
    <div>
      <Collapse in={open}>
        <div>
          <p>
            Su perfil está en proceso de validación, una vez el administrador lo
            valide, podrá inscribir a sus estudiantes.
          </p>
        </div>
      </Collapse>
      <h5 onClick={() => setOpen(!open)} style={{ cursor: "pointer" }}>
        {!open ? "Ver nota" : "Cerrar nota"}
      </h5>
    </div>
  );
} */

/*{
  parent && !parent.validate && (
    <div>
      <Collapse in={open}>
        <div>
          <p>
            Su perfil está en proceso de validación, una vez el administrador lo
            valide, podrá inscribir a sus estudiantes.
          </p>
        </div>
      </Collapse>
      <h5 onClick={() => setOpen(!open)} style={{ cursor: "pointer" }}>
        {!open ? "Ver nota" : "Cerrar nota"}
      </h5>
    </div>
  );
} */
