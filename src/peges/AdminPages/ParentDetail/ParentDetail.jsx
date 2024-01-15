import { useEffect, useState } from "react";
import { Card, Container, Button } from "react-bootstrap";
import { useParams, Link } from "react-router-dom";
const { VITE_BACK_URL } = import.meta.env;

const ParentDetail = () => {
  const { id } = useParams(); // Obtiene el parámetro id de la URL

  const [parent, setParent] = useState(null);

  useEffect(() => {
    const fetchParentDetails = async () => {
      try {
        const response = await fetch(
          `${VITE_BACK_URL}/admin/parentDetail/${id}`
        );
        const data = await response.json();
        setParent(data); // Establece la información del estudiante en el estado
      } catch (error) {
        console.error("Error fetching Parent data:", error);
      }
    };

    fetchParentDetails();
  }, [id]); // Ejecuta la solicitud al servidor cuando cambia el ID en la URL

  const [validationSuccess, setValidationSuccess] = useState(false);
  const handleValidateParent = async () => {
    try {
      // Realizar la solicitud PUT al servidor para cambiar validate de false a true
      const response = await fetch(
        `${VITE_BACK_URL}/admin/parentDetail/${id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ validate: true }), // Cambiar validate a true
        }
      );

      if (response.ok) {
        // Si la solicitud es exitosa, actualizar los detalles del estudiante localmente
        setParent({ ...parent, validate: true });
        setValidationSuccess(true);
      } else {
        console.error("Error al actualizar la validación del Padre");
      }
    } catch (error) {
      console.error("Error al realizar la solicitud PUT:", error);
    }
  };

  if (!parent) {
    return <p>Cargando detalles del Padre...</p>;
  }
  const {
    idDoc,
    fotoDocumento,
    name,
    lastName,
    educationLevel,
    profession,
    address,
    jobAddress,
    telephone,
    jobTelephone,
    contactCellphone,
    email,
    validate,
  } = parent;

  return (
    <Container>
      <h2>Detalles del Padre</h2>
      <Card>
        <Card.Body>
          <Card.Title>{`${name} ${lastName}`}</Card.Title>
          <Card.Text>Documento: {idDoc}</Card.Text>
          <Card.Text>
            Foto Documento:
            <img
              src={fotoDocumento}
              alt="Foto del Documento"
              style={{ width: "3.5cm", height: "5cm" }}
            />
          </Card.Text>
          <Card.Text>Nivel Educativo: {educationLevel}</Card.Text>
          <Card.Text>Profession: {profession}</Card.Text>
          <Card.Text>Dirección: {address}</Card.Text>
          <Card.Text>Dirección de Trabajo: {jobAddress}</Card.Text>
          <Card.Text>Teléfono: {telephone}</Card.Text>
          <Card.Text>Teléfono del Trabajo: {jobTelephone}</Card.Text>
          <Card.Text>Teléfono Celular: {contactCellphone}</Card.Text>
          <Card.Text>Email: {email}</Card.Text>
          <Card.Text>Validado: {validate ? "Sí" : "Pendiente"}</Card.Text>
          <Button
            className="btn btn-primary mb-3 mx-2"
            onClick={handleValidateParent}
            disabled={validate} // Desactiva el botón si validate es true
            variant={validate ? "success" : "primary"} // Cambia el estilo del botón si validate es true
          >
            {validate
              ? "Verificado"
              : `Validar Datos de ${parent.name} ${parent.lastName}`}
          </Button>
          <Link to="/Admin" className="btn btn-primary mb-3">
            Volver a la lista de Padres
          </Link>
          {validationSuccess && (
            <div className="alert alert-success mt-3" role="alert">
              ¡Validación exitosa!
            </div>
          )}
        </Card.Body>
      </Card>
    </Container>
  );
};

export default ParentDetail;
