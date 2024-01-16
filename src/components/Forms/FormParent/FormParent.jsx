import { useState } from "react";
import { useDispatch } from "react-redux";
import style from "./formParent.module.css";
import { createParent } from "../../../redux/actions/actions-parents.js";
import { validation } from "./validation.js";
import { useNavigate } from "react-router-dom";
import Alert from "sweetalert2";

const FormParent = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  //  const arrow = "<---";
  const [errors, setErrors] = useState({
    fotoDocumento: "",
    idDoc: "",
    name: "",
    lastName: "",
    educationLevel: "",
    profession: "",
    address: "",
    jobAddress: "",
    telephone: "",
    jobTelephone: "",
    contactCellphone: "",
    email: "",
  });

  const [loading, setLoading] = useState(false);
  const [image, setImage] = useState(null);
  const ID = sessionStorage.getItem("userId"); // TRAE EL ID
  const [imageError, setImageError] = useState("");

  const [newParent, setNewParent] = useState({
    fotoDocumento: "", //image
    idDoc: "",
    name: "",
    lastName: "",
    educationLevel: "",
    profession: "",
    address: "",
    jobAddress: "",
    telephone: "",
    jobTelephone: "",
    contactCellphone: "",
    email: "",
    tutor: true,
    userId: ID,
  });

  const uploadImage = async (e) => {
    const files = e.target.files;
    const data = new FormData();
    data.append("file", files[0]);
    data.append("upload_preset", "nmxly1pm");

    try {
      const res = await fetch(
        `https://api.cloudinary.com/v1_1/dxi3fh6kr/image/upload`,
        {
          method: "POST",
          body: data,
        }
      );

      if (!res.ok) {
        throw new Error("Error al cargar la imagen");
      }

      const file = await res.json();

      setImage(file.secure_url);
      setLoading(true);
      setNewParent({
        ...newParent,
        fotoDocumento: file.secure_url,
      });

      // Limpiar el error de la imagen
      setImageError("");
    } catch (error) {
      console.error("Error al cargar la imagen:", error);

      // Manejar el error de la imagen
      setImageError(
        "Hubo un problema al cargar la imagen. Inténtelo de nuevo."
      );
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "fotoDocumento") {
      setImageError("");
    }

    setErrors({
      ...errors,
      [name]: validation({ ...newParent, [name]: value })[name],
    });

    setNewParent({
      ...newParent,
      [name]: value,
    });
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    dispatch(createParent({ ...newParent }))
      .then(() => {
        // En caso de éxito
        Alert.fire({
          title: "¡Éxito!",
          text: "¡Datos enviados correctamente para su validación! Redirigiendo a 'Mi Perfil'...",
          icon: "success",
          showConfirmButton: false,
          timer: 3000,
          timerProgressBar: true,
        });

        setErrors({});
        setNewParent({
          fotoDocumento: "", //image
          idDoc: "",
          name: "",
          lastName: "",
          educationLevel: "",
          profession: "",
          address: "",
          jobAddress: "",
          telephone: "",
          jobTelephone: "",
          contactCellphone: "",
          email: "",
          tutor: true,
          userId: ID,
        });
        setTimeout(() => {
          navigate("/viewParent/myProfile");
        }, 3000);
      })
      .catch((error) => {
        // En caso de error
        Alert.fire({
          title: "Error",
          text: "Hubo un problema al enviar el formulario. Verifica los campos y vuelve a intentarlo.",
          icon: "error",
          confirmButtonText: "OK",
        });
        console.error("Error al enviar el formulario:", error);
      });
  };

  return (
    <>
      <div className={style.container_form}>
        <button
          onClick={() => (window.location.href = "/")}
          className={style.returnButton}
        >
          Volver a la pantalla de inicio
        </button>
        {/* <NavLink
          to={"/viewParent/myProfile"}
          className={style.button_back_home}
        >
          {arrow} Volver a la página principal
        </NavLink> */}
        <form onSubmit={onSubmit} className={style.form}>
          <nav className={style.navbar}>
            <h1>Información general del Apoderado</h1>
          </nav>
          <div className={style.container_label_inputs}>
            <div className={style.first_container}>
              <div className={style.first_first_container}>
                <div className={style.container_image}>
                  {loading && image ? (
                    <>
                      <img
                        src={image}
                        alt="Imagen del Apoderado"
                        className={style.image_parent}
                      />
                      <label
                        htmlFor="imageOutput"
                        className={style.label_image_done}
                      >
                        +
                      </label>
                      <input
                        type="file"
                        id="imageOutput"
                        name="fotoDocumento"
                        onChange={uploadImage}
                      />
                      <br />
                      <p>
                        {errors.fotoDocumento ? errors.fotoDocumento : null}
                      </p>
                    </>
                  ) : (
                    <>
                      <label
                        htmlFor="imageInput"
                        className={style.label_image_undone}
                      >
                        Sube una foto de tu DNI
                      </label>
                      <input
                        type="file"
                        id="imageInput"
                        name="fotoDocumento"
                        onChange={uploadImage}
                      />
                      <br />
                      <p>{imageError}</p>
                    </>
                  )}
                </div>
              </div>
              <div className={style.second_first_container}>
                <div className={style.second_first_container_first_line}>
                  <div className={style.container_name}>
                    <label htmlFor="name">Nombre:</label>
                    <input
                      className="my-2"
                      value={newParent.name}
                      onChange={handleChange}
                      type="text"
                      name="name"
                    />
                    <br />
                    {errors.name && <p>{errors.name}</p>}
                  </div>
                  <div className={style.container_lastName}>
                    <label htmlFor="lastName">Apellido:</label>
                    <input
                      className="my-2"
                      value={newParent.lastName}
                      onChange={handleChange}
                      type="text"
                      name="lastName"
                    />
                    <br />
                    {errors.lastName && <p>{errors.lastName}</p>}
                  </div>
                </div>
                <div className={style.second_first_container_second_line}>
                  <div className={style.container_idDoc}>
                    <label htmlFor="idDoc">Documento de identidad:</label>
                    <input
                      value={newParent.idDoc}
                      onChange={handleChange}
                      type="text"
                      name="idDoc"
                    />
                    <br />
                    {errors.idDoc && <p>{errors.idDoc}</p>}
                  </div>
                  <div className={style.container_email}>
                    <label htmlFor="email">Email:</label>
                    <input
                      className="my-2"
                      value={newParent.email}
                      onChange={handleChange}
                      type="email"
                      name="email"
                    />
                    <br />
                    {errors.email && <p>{errors.email}</p>}
                  </div>
                </div>
                <div className={style.second_first_container_third_line}>
                  <div className={style.container_educationLevel}>
                    <label htmlFor="educationLevel">
                      Nivel educacional: (grado)
                    </label>
                    <input
                      className="my-2"
                      value={newParent.educationLevel}
                      onChange={handleChange}
                      type="text"
                      name="educationLevel"
                    />
                    <br />
                    {errors.educationLevel && <p>{errors.educationLevel}</p>}
                  </div>
                  <div className={style.container_profession}>
                    <label htmlFor="profession">Profesión:</label>
                    <input
                      className="my-2"
                      value={newParent.profession}
                      onChange={handleChange}
                      type="text"
                      name="profession"
                    />
                    <br />
                    {errors.profession && <p>{errors.profession}</p>}
                  </div>
                </div>
              </div>
            </div>
            <div className={style.second_container}>
              <div className={style.first_second_container}>
                <div className={style.container_telephone}>
                  <label htmlFor="telephone">Télefono del hogar:</label>
                  <input
                    className="my-2"
                    value={newParent.telephone}
                    onChange={handleChange}
                    type="text"
                    name="telephone"
                  />
                  <br />
                  {errors.telephone && <p>{errors.telephone}</p>}
                </div>
                <div className={style.container_jobTelephone}>
                  <label htmlFor="jobTelephone">Télefono del trabajo:</label>
                  <input
                    className="my-2"
                    value={newParent.jobTelephone}
                    onChange={handleChange}
                    type="text"
                    name="jobTelephone"
                  />
                  <br />
                  {errors.jobTelephone && <p>{errors.jobTelephone}</p>}
                </div>
                <div className={style.container_contactCellphone}>
                  <label htmlFor="contactCellphone">Celular:</label>
                  <input
                    className="my-2"
                    value={newParent.contactCellphone}
                    onChange={handleChange}
                    type="text"
                    name="contactCellphone"
                  />
                  <br />
                  {errors.contactCellphone && <p>{errors.contactCellphone}</p>}
                </div>
              </div>
              <div className={style.second_second_container}>
                <div className={style.container_address}>
                  <label htmlFor="address">Dirección del Hogar:</label>
                  <input
                    className="my-2"
                    value={newParent.address}
                    onChange={handleChange}
                    type="text"
                    name="address"
                  />
                  <br />
                  {errors.address && <p>{errors.address}</p>}
                </div>
                <div className={style.container_jobAddress}>
                  <label htmlFor="jobAddress">Dirección del Trabajo: </label>
                  <input
                    className="my-2"
                    value={newParent.jobAddress}
                    onChange={handleChange}
                    type="text"
                    name="jobAddress"
                  />
                  <br />
                  {errors.jobAddress && <p>{errors.jobAddress}</p>}
                </div>
              </div>
            </div>
          </div>
          <button
            type="submit"
            className={style.submit_button}
            disabled={
              Object.values(errors).some((error) => error) ||
              Object.values(newParent).some((value) => !value)
            }
          >
            Enviar
          </button>
        </form>
      </div>
    </>
  );
};

export default FormParent;
