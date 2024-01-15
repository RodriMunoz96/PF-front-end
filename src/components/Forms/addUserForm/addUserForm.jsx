import { useState } from "react";
import { Form, Button, Container, Row } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { createUser } from "../../../redux/actions/actions-user";
import validate from "./validateUserForm";
import styles from "./addUserForm.module.css";
import Alert from "sweetalert2";

const AddUserForm = () => {
     const dispatch = useDispatch();
     const navigate = useNavigate();

     const [user, setUser] = useState({
          email: "",
          password: "",
          type: "Parents", //Parents //Admin //SuperAdmin
          nombre: "",
          apellidoPaterno: "",
          apellidoMaterno: "",
     });

     const [error, setErrors] = useState({
          email: "",
          password: "",
          nombre: "",
          apellidoPaterno: "",
          apellidoMaterno: "",
     });

     const validateForm = () => {
          const hasErrors = Object.values(error).some((err) => !!err);
          return hasErrors;
     };

     const handleChange = (event) => {
          const { name, value } = event.target;
          setUser({
               ...user,
               [name]: value,
          });
          setErrors({
               ...error,
               [name]: validateField(name, value),
          });
     };

     const validateField = (fieldName, value) => {
          const validationErrors = validate({ ...user, [fieldName]: value });
          return validationErrors[fieldName] || "";
     };

     const handleSubmit = async (event) => {
          event.preventDefault();
          const formErrors = validate(user);
          setErrors(formErrors);
          const hasFormErrors = Object.values(formErrors).some((error) => !!error);
          if (hasFormErrors) {
               return;
          }

          dispatch(createUser(user))
               .then(() => {
                    Alert.fire({
                         title: "¡Éxito!",
                         text: "El nuevo usuario se ha creado correctamente. Redirigiendo a Iniciar Sesión...",
                         icon: "success",
                         showConfirmButton: false,
                         timer: 3000,
                         timerProgressBar: true,
                    });
                    setTimeout(() => {
                         navigate("/login");
                    }, 3000);
               })
               .catch((error) => {
                    // En caso de error
                    Alert.fire({
                         title: "Error",
                         text: "Hubo un problema al crear el nuevo usuario. Verifica los campos o contacta con el administrador.",
                         icon: "error",
                         confirmButtonText: "OK",
                    });
                    console.error("Error al crear el nuevo usuario:", error);
               });
     };

     return (
          <div className={styles.background}>
               <Container>
                    <Row className="justify-content-md-center">
                         <div className={styles.returnButtonContainer}>
                              <button
                                   onClick={() => (window.location.href = "/")}
                                   className={styles.returnButton}
                              >
                                   Volver a la pantalla principal
                              </button>
                         </div>

                         <div className={styles.formContainer}>
                              <br />
                              <Form onSubmit={handleSubmit} className={styles.formParameters}>
                                   <h3 className={styles.formTitle}>
                                        Ingrese sus datos para registrarse
                                   </h3>
                                   <Form.Group controlId="formEmail">
                                        <Form.Label>Email</Form.Label>
                                        <Form.Control
                                             type="email"
                                             placeholder="Ingrese su email"
                                             name="email"
                                             value={user.email}
                                             onChange={handleChange}
                                             required
                                        />
                                        {error.email && (
                                             <span style={{ color: "red" }}>{error.email}</span>
                                        )}
                                   </Form.Group>
                                   <br />

                                   <Form.Group controlId="formPassword">
                                        <Form.Label>Contraseña</Form.Label>
                                        <Form.Control
                                             type="password"
                                             placeholder="Ingrese su contraseña"
                                             name="password"
                                             value={user.password}
                                             onChange={handleChange}
                                             required
                                        />
                                        {error.password && (
                                             <span style={{ color: "red" }}>{error.password}</span>
                                        )}
                                   </Form.Group>
                                   <br />

                                   <Form.Group controlId="formNombre">
                                        <Form.Label>Nombre</Form.Label>
                                        <Form.Control
                                             type="text"
                                             placeholder="Ingrese su nombre"
                                             name="nombre"
                                             value={user.nombre}
                                             onChange={handleChange}
                                             required
                                        />
                                        {error.nombre && (
                                             <span style={{ color: "red" }}>{error.nombre}</span>
                                        )}
                                   </Form.Group>
                                   <br />

                                   <Form.Group controlId="formApellidoPaterno">
                                        <Form.Label>Apellido Paterno</Form.Label>
                                        <Form.Control
                                             type="text"
                                             placeholder="Ingrese su apellido paterno"
                                             name="apellidoPaterno"
                                             value={user.apellidoPaterno}
                                             onChange={handleChange}
                                             required
                                        />
                                        {error.apellidoPaterno && (
                                             <span style={{ color: "red" }}>{error.apellidoPaterno}</span>
                                        )}
                                   </Form.Group>
                                   <br />

                                   <Form.Group controlId="formApellidoMaterno">
                                        <Form.Label>Apellido Materno</Form.Label>
                                        <Form.Control
                                             type="text"
                                             placeholder="Ingrese su apellido materno"
                                             name="apellidoMaterno"
                                             value={user.apellidoMaterno}
                                             onChange={handleChange}
                                             required
                                        />
                                        {error.apellidoMaterno && (
                                             <span style={{ color: "red" }}>{error.apellidoMaterno}</span>
                                        )}
                                   </Form.Group>
                                   <br />

                                   <Button variant="primary" type="submit" disabled={validateForm()}>
                                        Registrarse
                                   </Button>
                                   <hr />
                                   <p className={styles.alreadyRegistered}>¿Ya tiene una cuenta?</p>
                                   <div className={styles.returnToLogin}>
                                        <Link to="/login" className="btn btn-primary">
                                             Ir al inicio de sesión
                                        </Link>
                                   </div>
                              </Form>
                         </div>
                    </Row>
               </Container>
          </div>
     );
};

export default AddUserForm;
