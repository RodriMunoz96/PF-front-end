import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Links from "./Links/Links";
import style from "./asideParent.module.css";
import { Collapse } from "react-bootstrap";

import myProfile from "../../../Img/imgViewParent/iconMyProfile.png";
import myChildren from "../../../Img/imgViewParent/iconChild.png";
import myBook from "../../../Img/imgViewParent/iconBook.png";
import logout from "../../../Img/imgViewParent/logoutIcon.svg";
import comentarios from "../../../Img/imgViewParent/comentarios.png";
import LogoutButton from "../../../peges/AdminPages/LogOut/LogOut";
import { getParent } from "../../../redux/actions/actions-parents";

const user = sessionStorage;
console.log("user", user);
const parentId = sessionStorage.getItem("parentId");

function AsideParent() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getParent(parentId));
  }, [dispatch]);
  const parent = useSelector((state) => state.parent);

  const [open, setOpen] = useState(false);

  // console.log(user)
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
        {parent.validate && (
          <Links url={"myChildren"} img={myChildren} name={"Mis hijos"} />
        )}
        {parent.validate && (
          <Links url={"addNewChild"} img={myBook} name={"Incribir a mi hijo"} />
        )}
        {parent.validate && (
          <Links
            url={"comentario"}
            img={comentarios}
            name={"Dejanos tu comentario"}
          />
        )}
        {!parent.validate && (
          <div>
            <Collapse in={open}>
              <div>
                <p>
                  Su perfil está en proceso de validación, una vez el
                  administrador lo valide, podrá inscribir a sus estudiantes.
                </p>
              </div>
            </Collapse>
            <h5 onClick={() => setOpen(!open)} style={{ cursor: "pointer" }}>
              {!open ? "Ver nota" : "Cerrar nota"}
            </h5>
          </div>
        )}

        <LogoutButton img={logout} className={style.container_links} />
      </div>
    </aside>
  );
}

export default AsideParent;
