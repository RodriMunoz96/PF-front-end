import { useState } from "react";
import { useDispatch } from "react-redux";
import style from "./formStudent.module.css";
import { createStudent } from "../../../redux/actions/actions-students";
import validation from "../FormStudent/validation";
// import { NavLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Alert from "sweetalert2";
const { VITE_CLOUDINARY_IMG, VITE_CLOUDINARY_RES } = import.meta.env;

const FormStudent = () => {
  const navigate = useNavigate();
  const parentId = sessionStorage.getItem("parentId");

  const [image, setImage] = useState(`${VITE_CLOUDINARY_RES}`);
  const [errors, setErrors] = useState({
    idDocumento: "",
    nombres: "",
    apellidoPat: "",
    apellidoMat: "",
    Nacionalidad: "",
    fechNac: "",
    sexo: "",
    peso: "",
    estatura: "",
    alergias: "",
    grupoSanguineo: "",
    contactoEmerg: "",
    fotoPerfil: "",
    fotoDocumento: "",
  });

  const dispatch = useDispatch();

  const [newStudent, setNewStudent] = useState({
    idDocumento: "",
    nombres: "",
    apellidoPat: "",
    apellidoMat: "",
    Nacionalidad: "",
    fechNac: "",
    sexo: "",
    peso: "",
    estatura: "",
    alergias: "",
    grupoSanguineo: "",
    contactoEmerg: "",
    fotoPerfil: "",
    fotoDocumento: "",
    state: true,
    parentId: parentId,
  });

  const handleChange = (event) => {
    setNewStudent((prevNewStudent) => {
      const newNewStudent = {
        ...prevNewStudent,
        [event.target.name]: event.target.value,
      };
      validation(newNewStudent, errors, setErrors, event);
      return newNewStudent;
    });
  };

  const uploadImageperfil = async (event) => {
    const files = event.target.files;
    const data = new FormData();
    data.append("file", files[0]);
    data.append("upload_preset", "nmxly1pm");
    //setLoading(true);
    const res = await fetch(`${VITE_CLOUDINARY_IMG}`, {
      method: "POST",
      body: data,
    });
    const file = await res.json();
    setImage(file.secure_url);
    //setLoading(false);
    setNewStudent({
      ...newStudent,
      fotoPerfil: file.secure_url,
    });
  };

  const uploadImageDocumen = async (event) => {
    const files = event.target.files;
    const data = new FormData();
    data.append("file", files[0]);
    data.append("upload_preset", "nmxly1pm");
    //setLoading(true);
    const res = await fetch(`${VITE_CLOUDINARY_IMG}`, {
      method: "POST",
      body: data,
    });
    const file = await res.json();
    //setImage(file.secure_url);
    //setLoading(false);
    setNewStudent({
      ...newStudent,
      fotoDocumento: file.secure_url,
    });
  };

  const hasErrors = () => {
    for (const errorKey in errors) {
      if (errors[errorKey]) {
        return true; // Si hay al menos un error, deshabilita el botón
      }
    }
    // Además, verifica que todos los campos obligatorios estén llenos
    for (const key in newStudent) {
      if (key !== "fotoPerfil" && key !== "fotoDocumento" && !newStudent[key]) {
        return true; // Si algún campo obligatorio está vacío, deshabilita el botón
      }
    }
    return false; // Si no hay errores ni campos vacíos, habilita el botón
  };

  const onSubmit = async (event) => {
    event.preventDefault();

    dispatch(createStudent({ ...newStudent }))
      .then(() => {
        Alert.fire({
          title: "Éxito!!",
          text: "¡Datos enviados correctamente para su validación! Redirigiendo a 'Mis Hijos'...",
          icon: "success",
          showConfirmButton: false,
          timer: 3000,
          timerProgressBar: true,
        });

        setTimeout(() => {
          navigate("/viewParent/myChildren");
        }, 3000);
        setImage(`${VITE_CLOUDINARY_RES}`);
        setNewStudent({
          idDocumento: "",
          nombres: "",
          apellidoPat: "",
          apellidoMat: "",
          Nacionalidad: "",
          fechNac: "",
          sexo: "",
          peso: "",
          estatura: "",
          alergias: "",
          grupoSanguineo: "",
          contactoEmerg: "",
          fotoPerfil: "",
          fotoDocumento: "",
          state: true,
          parentId: parentId,
        });
        navigate("/viewParent/addNewChild");
      })
      .catch((error) => {
        // En caso de error
        Alert.fire({
          title: "Error!",
          text: "Hubo un error al crear el estudiante, por favor verifique los campos o contacte al administrador",
          icon: "error",
          confirmButtonText: "OK",
        });
        console.error("Error al enviar Formulario de Estudiante: ", error);
      });
  };
  return (
    <div className={style.main_container}>
      <form onSubmit={onSubmit} className={style.form}>
        <nav className={style.navbar}>
          <h2>Información general del estudiante</h2>
        </nav>
        <br />
        <div className={style.container_form}>
          <div className={style.container_label_inputs}>
            {
              <>
                <img
                  src={image}
                  alt="Foto del estudiante"
                  className={style.image_student}
                />
                <label htmlFor="imageOutput" className={style.label_image_done}>
                  Foto de la persona a matricular:
                </label>
                <input
                  type="file"
                  id="imageOutput"
                  name="fotoStudent"
                  onChange={uploadImageperfil}
                />
                <br />
                <p>{errors.fotoStudent ? errors.fotoStudent : null}</p>
              </>
            }

            <label htmlFor="idDocumento">
              Número del documento de identidad:
            </label>

            <input
              value={newStudent.idDocumento}
              onChange={handleChange}
              type="number"
              name="idDocumento"
            />
            <p>{errors.idDocumento ? errors.idDocumento : null}</p>

            <label htmlFor="nombres">Nombres:</label>
            <input
              value={newStudent.nombres}
              onChange={handleChange}
              type="text"
              name="nombres"
            />
            <p>{errors.nombres ? errors.nombres : null}</p>
            <label htmlFor="apellidoPat">Primer apellido:</label>
            <input
              value={newStudent.apellidoPat}
              onChange={handleChange}
              type="text"
              name="apellidoPat"
            />
            <p>{errors.apellidoPat ? errors.apellidoPat : null}</p>

            <label htmlFor="apellidoMat">Segundo apellido:</label>
            <input
              value={newStudent.apellidoMat}
              onChange={handleChange}
              type="text"
              name="apellidoMat"
            />
            <p>{errors.apellidoMat ? errors.apellidoMat : null}</p>
          </div>
          <div className={style.container_label_inputs}>
            <label htmlFor="Nacionalidad">Nacionalidad:</label>
            <input
              value={newStudent.Nacionalidad}
              onChange={handleChange}
              type="text"
              name="Nacionalidad"
            />
            <p>{errors.Nacionalidad ? errors.Nacionalidad : null}</p>
            <label htmlFor="fechNac">Fecha de nacimiento:</label>
            <input
              value={newStudent.fechNac}
              onChange={handleChange}
              type="date"
              name="fechNac"
            />
            <p>{errors.fechNac ? errors.fechNac : null}</p>
            <label htmlFor="sexo">Sexo:</label>
            <select name="sexo" value={newStudent.sexo} onChange={handleChange}>
              <option>Seleccione un género</option>
              <option value="M">Masculino</option>
              <option value="F">Femenino</option>
            </select>

            <br />
            <label htmlFor="peso">Peso: (Kg) </label>
            <input
              value={newStudent.peso}
              onChange={handleChange}
              type="number"
              name="peso"
            />
            <p>{errors.peso ? errors.peso : null}</p>
            <label htmlFor="estatura">Estatura: (cm) </label>
            <input
              value={newStudent.estatura}
              onChange={handleChange}
              type="number"
              name="estatura"
            />
            <p>{errors.estatura ? errors.estatura : null}</p>

            <label htmlFor="alergias">Alergias:</label>
            <input
              value={newStudent.alergias}
              onChange={handleChange}
              type="text"
              name="alergias"
            />
            <p>{errors.alergias ? errors.alergias : null}</p>

            <label htmlFor="grupoSanguineo">Grupo sanguineo:</label>
            <select
              name="grupoSanguineo"
              value={newStudent.grupoSanguineo}
              onChange={handleChange}
            >
              <option>Seleccione un tipo</option>
              <option value="O+">O+</option>
              <option value="O-">O-</option>
              <option value="A+">A+</option>
              <option value="A-">A-</option>
              <option value="B+">B+</option>
              <option value="B-">B-</option>
              <option value="AB+">AB+</option>
              <option value="AB-">AB-</option>
            </select>
            <p>{errors.grupoSanguineo ? errors.grupoSanguineo : null}</p>

            <label htmlFor="contactoEmerg">Contacto de emergencia:</label>
            <input
              value={newStudent.contactoEmerg}
              onChange={handleChange}
              type="number"
              name="contactoEmerg"
            />
            <p>{errors.contactoEmerg ? errors.contactoEmerg : null}</p>

            <label htmlFor="fotoDocumento">
              Foto del documento de identidad:
            </label>
            <input
              type="file"
              id="imageDocumentOutput"
              name="fotoDocument"
              onChange={uploadImageDocumen}
            />
            <br />
            <p>{errors.fotoDocumento ? errors.fotoDocumento : null}</p>
          </div>
        </div>

        <button
          type="submit"
          className={style.submit_button}
          disabled={hasErrors()}
        >
          Enviar
        </button>
      </form>
    </div>
  );
};

export default FormStudent;
