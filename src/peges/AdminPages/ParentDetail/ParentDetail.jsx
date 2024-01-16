import { useEffect, useState } from "react";
import { Card, Container, Button, Modal, Collapse } from "react-bootstrap";
import { useParams, Link } from "react-router-dom";
import style from "./ParentDetail.module.css";
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
        setParent(data);
      } catch (error) {
        throw new Error(`Error fetching parent data: ${error.message}`);
      }
    };

    fetchParentDetails();
  }, [id]); // Ejecuta la solicitud al servidor cuando cambia el ID en la URL

  const [validationSuccess, setValidationSuccess] = useState(false);
  const [suspension, setSuspension] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);

  const handleShowConfirmation = () => {
    setShowConfirmation(true);
  };

  const handleCloseConfirmation = () => {
    setShowConfirmation(false);
  };

  const handleSuspendParent = async () => {
    try {
      const response = await fetch(`${VITE_BACK_URL}/parents/delete/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ state: false }), // Cambiar state a false para suspender
      });

      if (response.ok) {
        // Si la solicitud es exitosa, actualizar los detalles del padre localmente
        setParent({ ...parent, state: false });
        setSuspension(true);
      } else {
        console.error("Error al suspender al padre");
      }
    } catch (error) {
      console.error("Error al realizar la solicitud PUT:", error);
    }
  };

  const handleConfirmSuspend = async () => {
    await handleSuspendParent();
    setShowConfirmation(false);
  };
  const handleHideAlert = () => {
    setValidationSuccess(false);
  };
  const hideAlertSuspension = () => {
    setSuspension(false);
  };

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
      <h2 className={style.tittle}>Detalles del Padre</h2>
      <Card>
        <Card.Body className={style.cardBody}>
          <Card.Title
            className={style.name}
          >{`${name} ${lastName}`}</Card.Title>
          <Card.Text className={style.cardText}>
            Documento: <p className={style.info}>{idDoc}</p>
          </Card.Text>
          <Card.Text className={style.cardText}>
            Foto Documento:
            <p className={style.info}>
              <img
                src={fotoDocumento}
                alt="Foto del Documento"
                style={{ width: "3.5cm", height: "5cm" }}
              />
            </p>
          </Card.Text>
          <Card.Text className={style.cardText}>
            Nivel Educativo: <p className={style.info}>{educationLevel}</p>
          </Card.Text>
          <Card.Text className={style.cardText}>
            Profesión: <p className={style.info}>{profession}</p>
          </Card.Text>
          <Card.Text className={style.cardText}>
            Dirección: <p className={style.info}>{address}</p>
          </Card.Text>
          <Card.Text className={style.cardText}>
            Dirección de Trabajo: <p className={style.info}>{jobAddress}</p>
          </Card.Text>
          <Card.Text className={style.cardText}>
            Teléfono: <p className={style.info}>{telephone}</p>
          </Card.Text>
          <Card.Text className={style.cardText}>
            Teléfono del Trabajo: <p className={style.info}>{jobTelephone}</p>
          </Card.Text>
          <Card.Text className={style.cardText}>
            Teléfono Celular: <p className={style.info}>{contactCellphone}</p>
          </Card.Text>
          <Card.Text className={style.cardText}>
            Email: <p className={style.info}>{email}</p>
          </Card.Text>
          <Card.Text className={style.cardText}>
            Validado: {validate ? "Sí" : "Pendiente"}
          </Card.Text>
          <span className={style.buttons}>
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
            <Button
              className="btn btn-danger mb-3 mx-2"
              onClick={handleShowConfirmation}
              disabled={!validate} // Desactiva el botón si validate es false
            >
              Suspender a {`${parent.name} ${parent.lastName}`}
            </Button>

            {/* Confirmación adicional */}
            <Modal show={showConfirmation} onHide={handleCloseConfirmation}>
              <Modal.Header closeButton>
                <Modal.Title>Confirmación de Suspensión</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <p>
                  Esta acción es irreversible. Solo el SuperAdmin podrá
                  reactivar al usuario.
                </p>
              </Modal.Body>
              <Modal.Footer>
                <Button variant="secondary" onClick={handleCloseConfirmation}>
                  Cancelar
                </Button>
                <Button variant="danger" onClick={handleConfirmSuspend}>
                  Confirmar Suspensión
                </Button>
              </Modal.Footer>
            </Modal>
            <Link to="/Admin" className="btn btn-primary mb-3">
              Volver
            </Link>
            <Collapse in={validationSuccess}>
              <div className="alert alert-success mt-3" role="alert">
                ¡Validación exitosa!
                <Button
                  onClick={handleHideAlert}
                  className="close mx-1"
                  aria-label="Close"
                >
                  <span aria-hidden="true">&times;</span>
                </Button>
              </div>
            </Collapse>
            <Collapse in={suspension}>
              <div className="alert alert-danger mt-3" role="alert">
                ¡Usuario Padre Suspendido!
                <Button
                  onClick={hideAlertSuspension}
                  className="close mx-3"
                  aria-label="Close"
                >
                  <span aria-hidden="true">&times;</span>
                </Button>
              </div>
            </Collapse>
          </span>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default ParentDetail;
