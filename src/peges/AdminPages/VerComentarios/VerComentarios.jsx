import { useEffect, useState } from "react";
import {
  Container,
  Card,
  CardBody,
  CardTitle,
  CardSubtitle,
  Table,
} from "reactstrap";
import { Link } from "react-router-dom";
const { VITE_BACK_URL } = import.meta.env;

const VerComentariosFeedback = () => {
  const [comentarios, setComentarios] = useState([]);

  useEffect(() => {
    // Fetch data from the API
    fetch(`${VITE_BACK_URL}/valoracion`)
      .then((response) => response.json())
      .then((data) => setComentarios(data))
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  return (
    <Container>
      <h2 className="mt-4 mb-4">Ver Comentarios de Feedback</h2>
      <Card>
        <CardBody>
          <CardTitle tag="h5">Listado de Comentarios</CardTitle>
          <CardSubtitle className="mb-2 text-muted" tag="h6">
            Comentarios detallados de feedback
          </CardSubtitle>
          <Table responsive striped bordered hover>
            <thead>
              <tr>
                <th>ID usuario</th>
                <th>Nivel de satisfacción</th>
                <th>Lo recomendaria</th>
                <th>Detalles</th>
              </tr>
            </thead>
            <tbody>
              {comentarios.map((comentario) => (
                <tr key={comentario.id}>
                  <td>{comentario.id}</td>
                  <td>{comentario.satisfaction}</td>
                  <td>{comentario.recommendation ? "Si" : "No"}</td>
                  <td>
                    <Link to={`comentarioDetail/${comentario.id}`}>
                      Ver más
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </CardBody>
      </Card>
    </Container>
  );
};

export default VerComentariosFeedback;
