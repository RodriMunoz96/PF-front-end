import { useState, useEffect } from "react";
import { Container, Row, Col, Nav, Button } from "react-bootstrap";
import style from "./admin.module.css";
// import { useNavigate } from "react-router-dom";

// Importa tus componentes para cada página

import EstudiantesTodos from "../AdminPages/EstudiantesTodos/EstudiantesTodos";
import PadresTodos from "../AdminPages/PadresTodos/PadresTodos";
import LogoutButton from "../AdminPages/LogOut/LogOut";
import VerComentariosFeedback from "../AdminPages/VerComentarios/VerComentarios";

// import ConfiguracionPadre from "./AdminPages/ConfiguracionPadre";
// import MensajesPadre from "./AdminPages/MensajesPadre";
// import PerfilPadre from "./AdminPages/PerfilPadre";
// import EliminarPadre from "./AdminPages/EliminarPadre";
// import PadresActivos from "./AdminPages/PadresActivos";
// import PadresPendientes from "./AdminPages/PadresPendientes";
// import VerifiedStudents from "./AdminPages/EstudiantesVerificados";
// import PendingStudents from "./AdminPages/EstudiantesPendientes";
// import VistaFiltrada from "./AdminPages/VistaFiltrada";
// import VistaEstudiantes from "./AdminPages/VistaEstudiantes";

const Admin = () => {
  // const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(null);
  const adminName = sessionStorage.getItem("nombre");

  useEffect(() => {
    // Al cargar el componente, establece la página inicial
    setCurrentPage("VerTodosPadres");
  }, []);

  const renderPage = (page) => {
    setCurrentPage(page);
  };

  return (
    <Container fluid>
      <Row>
        <Col
          md={3}
          lg={2}
          style={{ backgroundColor: "#0b4c7b" }}
          className={`sidebar ${style.aside_container}`}
        >
          <Nav className="flex-column">
            <div className="d-flex align-items-center justify-content-center sidebar-header">
              <h1 className={style.admin_name}>
                BIENVENIDO A TU SESION <br /> <br />{" "}
                {adminName ? adminName : "administrador"}
              </h1>
            </div>
            <hr className={style.separator} />
            <div className="my-4">
              <Button
                className="my-4 w-100"
                onClick={() => renderPage("VerTodosPadres")}
              >
                Todos los Padres
              </Button>

              <Button
                className="my-4 w-100"
                onClick={() => renderPage("AllStudents")}
              >
                Todos los Estudiantes
              </Button>

              <Button
                className="my-4 w-100"
                onClick={() => renderPage("Comentarios")}
              >
                Comentarios
              </Button>
            </div>
          </Nav>
          <div className="d-flex justify-content-center mt-3">
            <LogoutButton />
          </div>
        </Col>
        <Col md={9} lg={10} className={`main-content ${style.main_container}`}>
          {currentPage === "VerTodosPadres" && <PadresTodos />}
          {currentPage === "AllStudents" && <EstudiantesTodos />}
          {currentPage === "Comentarios" && <VerComentariosFeedback />}
        </Col>
      </Row>
    </Container>
  );
};

export default Admin;

{
  /* <Button className="my-2" onClick={() => renderPage("Inicio")}>
Inicio
</Button> */
}
{
  /* CONTENIDO ADMIN */
}

{
  /* CONTENIDO PADRE */
}
{
  /* <Button
className="my-2"
onClick={() => renderPage("VerifiedParents")}
>
Padres Verificados
</Button>
<Button
className="my-2"
onClick={() => renderPage("PendingParents")}
>
Padres Pendientes
</Button> */
}
{
  /* CONTENIDO ALUMNO */
}
{
  /* <Button
className="my-2"
onClick={() => renderPage("VerifiedStudents")}
>
Estudiantes Verificados
</Button>
<Button
className="my-2"
onClick={() => renderPage("PendingStudents")}
>
Estudiantes Pendientes
</Button> */
}
{
  /* Renderizar el componente correspondiente según la página actual */
}
{
  /* {currentPage === "Inicio" && <VistaFiltrada />} */
}
{
  /* {currentPage === "VerifiedParents" && <PadresActivos />}
{currentPage === "PendingParents" && <PadresPendientes />} */
}
{
  /* ESTUDIANTES */
}
{
  /* {currentPage === "VerifiedStudents" && <VerifiedStudents />}
{currentPage === "PendingStudents" && <PendingStudents />} */
}
{
  /* Agrega más condiciones según sea necesario */
}
