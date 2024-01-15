import { useEffect, useState } from "react";
import { Card, Container } from "react-bootstrap";
import { useParams, Link } from "react-router-dom";
const { VITE_BACK_URL } = import.meta.env;

const ComentarioDetail = () => {
  const { id } = useParams(); // Obtiene el parámetro id de la URL

  const [comentario, setComentario] = useState(null);

  useEffect(() => {
    const fetchComentarioDetails = async () => {
      try {
        const response = await fetch(`${VITE_BACK_URL}/valoracion/${id}`);
        const data = await response.json();
        setComentario(data); // Establece la información del comentario en el estado
      } catch (error) {
        console.error("Error fetching Comentario data:", error);
      }
    };

    fetchComentarioDetails();
  }, [id]); // Ejecuta la solicitud al servidor cuando cambia el ID en la URL

  if (!comentario) {
    return <p>Cargando detalles del Comentario...</p>;
  }

  const {
    satisfaction,
    userInterface,
    registrationProcess,
    easeOfUse,
    recommendation,
    additionalComments,
  } = comentario;

  return (
    <Container>
      <h2>Detalles del Comentario</h2>
      <Card>
        <Card.Body>
          <Card.Title>{`Usuario #${satisfaction}`}</Card.Title>
          <Card.Text>Facilidad de uso de la: {easeOfUse}</Card.Text>
          <Card.Text>
            Nivel de satisfacción con la plataforma: {satisfaction}
          </Card.Text>
          <Card.Text>
            Experiencia durante el proceso de registro de padre y estudiantes:{" "}
            {registrationProcess}
          </Card.Text>
          <Card.Text>
            Calificación de la apariencia y la ingerfaz del usuario:{" "}
            {userInterface}
          </Card.Text>
          <Card.Text>
            Recomendaría la plataforma otros padres:{" "}
            {recommendation ? "Si" : "No"}
          </Card.Text>
          <Card.Text>Comentarios adicionales: {additionalComments}</Card.Text>
          <Link to="/admin" className="btn btn-primary mb-3">
            Volver a la lista de Comentarios
          </Link>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default ComentarioDetail;
