import { useState, useEffect } from "react";
import { Container, Row, Col, Nav, Button } from "react-bootstrap";
import img3 from "../Img/img3.png";
// import { useNavigate } from "react-router-dom";

// Importa tus componentes para cada página

import EstudiantesTodos from "./AdminPages/EstudiantesTodos";
import PadresTodos from "./AdminPages/PadresTodos";

import LogoutButton from "./AdminPages/LogOut";
import VerComentariosFeedback from "./AdminPages/VerComentarios";

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
          className="sidebar"
        >
          <Nav className="flex-column">
            <div className="d-flex align-items-center justify-content-center sidebar-header">
              <img src={img3} alt="Logo" className="img-fluid" />
            </div>
            {/* <Button className="my-2" onClick={() => renderPage("Inicio")}>
              Inicio
            </Button> */}
            {/* CONTENIDO ADMIN */}

            {/* CONTENIDO PADRE */}
            <Button
              className="my-2"
              onClick={() => renderPage("VerTodosPadres")}
            >
              Todos los Padres
            </Button>
            {/* <Button
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
            </Button> */}
            {/* CONTENIDO ALUMNO */}

            <Button className="my-2" onClick={() => renderPage("AllStudents")}>
              Todos los Estudiantes
            </Button>

            <Button className="my-2" onClick={() => renderPage("Comentarios")}>
              Comentarios
            </Button>
            {/* <Button
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
            </Button> */}
          </Nav>
          <LogoutButton />
        </Col>
        <Col md={9} lg={10} className="main-content">
          {/* Renderizar el componente correspondiente según la página actual */}
          {/* {currentPage === "Inicio" && <VistaFiltrada />} */}

          {currentPage === "VerTodosPadres" && <PadresTodos />}
          {/* {currentPage === "VerifiedParents" && <PadresActivos />}
          {currentPage === "PendingParents" && <PadresPendientes />} */}
          {/* ESTUDIANTES */}
          {currentPage === "AllStudents" && <EstudiantesTodos />}
          {currentPage === "Comentarios" && <VerComentariosFeedback />}
          {/* {currentPage === "VerifiedStudents" && <VerifiedStudents />}
          {currentPage === "PendingStudents" && <PendingStudents />} */}
          {/* Agrega más condiciones según sea necesario */}
        </Col>
      </Row>
    </Container>
  );
};

export default Admin;
