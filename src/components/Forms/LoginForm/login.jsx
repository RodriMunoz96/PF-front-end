import { useState, useEffect } from "react";
import { Form, Button, Container } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { loginUser } from "../../../redux/actions/actions-login";
import axios from "axios";
import { useAuth0 } from "@auth0/auth0-react";
import validate from "./validateLogin";
import Google from "../../../Img/google.png";
import styles from "./login.module.css";
const { VITE_BACK_URL } = import.meta.env;
import Alert from "sweetalert2";

const Login = () => {
     const dispatch = useDispatch();
     const navigate = useNavigate();
     const authToken = useSelector((state) => state.token);

     const [loginData, setLoginData] = useState({
          email: "",
          password: "",
     });

     const [error, setError] = useState({
          email: "",
          password: "",
     });

     const validateLogin = () => {
          const errors = validate(loginData);
          const hasErrors = Object.values(errors).some((error) =>
               Array.isArray(error) ? error.length > 0 : !!error
          );
          return hasErrors;
     };

     const handleChange = (e) => {
          setLoginData({ ...loginData, [e.target.name]: e.target.value });
          setError({ ...error, [e.target.name]: e.target.value });
     };

     const handleSubmit = async (event) => {
          event.preventDefault();
          dispatch(loginUser(loginData));
     };

     useEffect(() => {
          const type = sessionStorage.getItem("type");
          if (authToken && type === "Parents") {
               navigate("/viewParent/myProfile");
          } else if (authToken && type === "Admin") {
               navigate("/Admin");
          } else if (authToken && type === "SuperAdmin") {
               navigate("/viewSuperAdmin/dashboard");
          }
     }, [authToken, navigate]);

     //AUTH 0 enviar tocken completo al back y extraer la informacion del usuario para registrarlo
     const { loginWithPopup, getIdTokenClaims } = useAuth0();
     const handleLoginSubmission = async () => {
          try {
               await loginWithPopup(); // This will open a popup for Auth0 login
               const tokenClaims = await getIdTokenClaims(); // Get token claims after successful login
               // Sending the tokenClaims object to the backend
               const response = await axios.post(
                    `${VITE_BACK_URL}/user/auth0/loginOrSignup`,
                    tokenClaims
               );
               if (response.data.isNewUser) {
                    // si es usuario recien creado usando el boton de inicio de sesion
                    // console.log({
                    //   message: "Creado exitosamente debe ingresar nuevamente",
                    // });
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
               } else {
                    // Guardar el token en el (sessionStorage) si es necesario
                    sessionStorage.setItem("token", response.data.token);
                    sessionStorage.setItem("nombre", response.data.user.nombre);
                    sessionStorage.setItem("subtype", response.data.user.subtype);
                    sessionStorage.setItem("userId", response.data.user.id);
                    if (response.data.user.subtype) navigate("/viewParent/myProfile");
               }
               // Logging the response from the backend
          } catch (error) {
               Alert.fire({
                    title: "Error",
                    text: "Hubo un problema al crear el nuevo usuario. Verifica los campos o contacta con el administrador.",
                    icon: "error",
                    confirmButtonText: "OK",
               });
               console.error("Error al crear el nuevo usuario:", error);
          }
     };

     return (
          <div className={styles.background}>
               <Container className={`d-flex align-items-center justify-content-center`}>
                    <div className={`d-flex flex-column align-items-center`}>
                         <button
                              onClick={() => (window.location.href = "/")}
                              className={styles.returnButton}
                         >
                              Volver a la pantalla de inicio
                         </button>
                         <br />

                         <Form
                              className={`p-4 border rounded form-parameters ${styles.formParameters}`}
                              onSubmit={handleSubmit}
                         >
                              <h3 className="text-center mb-4">Inicie sesión</h3>

                              <Form.Group className="mb-3" controlId="formBasicEmail">
                                   <Form.Label>Correo electrónico</Form.Label>
                                   <Form.Control
                                        type="email"
                                        name="email"
                                        placeholder="Ingrese su correo"
                                        onChange={handleChange}
                                        required
                                        autoComplete="username"
                                   />
                              </Form.Group>

                              <Form.Group className="mb-3" controlId="formBasicPassword">
                                   <Form.Label>Contraseña</Form.Label>
                                   <Form.Control
                                        type="password"
                                        name="password"
                                        placeholder="Ingrese su contraseña"
                                        onChange={handleChange}
                                        required
                                        autoComplete="current-password"
                                   />
                              </Form.Group>

                              <Form.Group className="mb-3" controlId="formBasicCheckbox">
                                   <Form.Check type="checkbox" label="Recuérdame" />
                              </Form.Group>

                              <div className="d-grid">
                                   <Button
                                        variant="primary"
                                        type="submit"
                                        disabled={validateLogin()}
                                   >
                                        Iniciar sesión
                                   </Button>
                              </div>

                              <br />
                              <div className="d-grid">
                                   <Button onClick={handleLoginSubmission} className="google-btn">
                                        <img src={Google} alt="Google" />
                                        Iniciar sesión con Google
                                   </Button>
                              </div>

                              <hr />
                              <p
                                   className={`forgot-password text-center mt-2 ${styles.notRegistered}`}
                              >
                                   No está registrado?
                              </p>
                              <div className="d-grid">
                                   <Link to="/addUser" className="btn btn-primary">
                                        Registrarse
                                   </Link>
                              </div>
                              <br />

                              {/* <div className="d-grid">
          <Button onClick={handleLoginSubmission} className="google-btn">
            <img src={Google} alt="Google" />
            Register with Google
          </Button>
        </div> */}
                         </Form>
                    </div>
               </Container>
          </div>
     );
};

export default Login;
