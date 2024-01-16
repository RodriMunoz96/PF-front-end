const textRegex = /^[a-zA-Z\s]+$/;
const numberRegex = /^[0-9]+$/;
const grupoSanguineoRegex = /^(A\+|A-|B\+|B-|AB\+|AB-|O\+|O-)$/;
const integerRegex = /^\d+$/;
const fechaRegex =
  /^(0[1-9]|[12][0-9]|3[01])[- /.](0[1-9]|1[0-2])[- /.](19|20)\d\d$|^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01])$/;

const validation = (newStudent, errors, setErrors, event) => {
  switch (event.target.name) {
    case "nombres":
      if (
        !textRegex.test(newStudent.nombres) ||
        !newStudent.nombres ||
        newStudent.nombres.length < 3 ||
        newStudent.nombres.length > 25
      ) {
        setErrors({
          ...errors,
          nombres:
            "El nombre no es valido. Debe contener solo letras, máximo 25 carácteres y mínimo 3",
        });
      } else {
        setErrors({
          ...errors,
          nombres: "",
        });
      }
      break;
    case "apellidoPat":
      if (
        !textRegex.test(newStudent.apellidoPat) ||
        !newStudent.apellidoPat ||
        newStudent.apellidoPat.length < 3 ||
        newStudent.apellidoPat.length > 25
      ) {
        setErrors({
          ...errors,
          apellidoPat:
            "El primer apellido no es válido. Debe contener solo letras con máximo 25 carácteres y mínimo 3",
        });
      } else {
        setErrors({
          ...errors,
          apellidoPat: "",
        });
      }
      break;
    case "apellidoMat":
      if (
        !textRegex.test(newStudent.apellidoMat) ||
        !newStudent.apellidoMat ||
        newStudent.apellidoMat.length < 3 ||
        newStudent.apellidoMat.length > 25
      ) {
        setErrors({
          ...errors,
          apellidoMat:
            "El segundo apellido no es válido. Debe contener máximo 25 carácteres y mínimo 3",
        });
      } else {
        setErrors({
          ...errors,
          apellidoMat: "",
        });
      }
      break;
    case "idDocumento":
      if (
        !newStudent.idDocumento ||
        !numberRegex.test(newStudent.idDocumento) ||
        !newStudent.idDocumento < 0 ||
        newStudent.idDocumento.toString().length < 7 ||
        newStudent.idDocumento.toString().length > 15
      ) {
        setErrors({
          ...errors,
          idDocumento:
            "El número de documento no es válido, debe estar entre 7 y 15 digitos, no puede ser negativo y debe escribirse sin puntos ni comas.",
        });
      } else {
        setErrors({
          ...errors,
          idDocumento: "",
        });
      }
      break;

    case "nacionalidad":
      if (
        !textRegex.test(newStudent.nacionalidad) ||
        !newStudent.nacionalidad ||
        newStudent.nacionalidad.length < 3 ||
        newStudent.nacionalidad.length > 25
      ) {
        setErrors({
          ...errors,
          nacionalidad:
            "El nacionalidad no es válida. Debe contener solo letras, máximo 25 carácteres y mínimo 3",
        });
      } else {
        setErrors({
          ...errors,
          nacionalidad: "",
        });
      }
      break;

    case "fechNac":
      if (
        !newStudent.fechNac ||
        !fechaRegex.test(newStudent.fechNac) ||
        new Date(newStudent.fechNac) > new Date()
      ) {
        setErrors({
          ...errors,
          fechNac:
            "La fecha ingresada no es valida, debe ser en formato dd/mm/aaaa",
        });
      } else {
        setErrors({
          ...errors,
          fechNac: "",
        });
      }
      break;
    case "peso":
      if (!newStudent.peso || !newStudent.peso < 0) {
        setErrors({
          ...errors,
          peso: "El peso debe no puede ser un número negativo.",
        });
      } else if (!newStudent.peso || !integerRegex.test(newStudent.peso)) {
        setErrors({
          ...errors,
          peso: "El Peso debe ser un numero entero, expresado en Kgs.",
        });
      } else {
        setErrors({
          ...errors,
          peso: "",
        });
      }
      break;

    case "estatura":
      if (!newStudent.estatura || !newStudent.estatura < 0) {
        setErrors({
          ...errors,
          estatura: "La estatura no debe no puede ser un número negativo.",
        });
      } else if (
        !newStudent.estatura ||
        !integerRegex.test(newStudent.estatura)
      ) {
        setErrors({
          ...errors,
          estatura:
            "La estatura debe ser un número entero y expresado en Céntimetros.",
        });
      } else {
        setErrors({
          ...errors,
          estatura: "",
        });
      }
      break;

    case "alergias":
      if (
        !newStudent.alergias ||
        newStudent.alergias.length < 3 ||
        newStudent.alergias.length > 100
      ) {
        setErrors({
          ...errors,
          alergias:
            "Las alergias no son válidas. Debe contener máximo 100 carácteres y mínimo 3",
        });
      } else {
        setErrors({
          ...errors,
          alergias: "",
        });
      }
      break;

    case "grupoSanguineo":
      if (
        !newStudent.grupoSanguineo ||
        !grupoSanguineoRegex.test(newStudent.grupoSanguineo)
      ) {
        setErrors({
          ...errors,
          grupoSanguineo:
            "El grupo sanguíneo no es válido. Ejemplos: A+, B-, AB+, O-",
        });
      } else {
        setErrors({
          ...errors,
          grupoSanguineo: "",
        });
      }
      break;

    case "contactoEmerg":
      if (
        !newStudent.contactoEmerg ||
        !numberRegex.test(newStudent.contactoEmerg) ||
        !newStudent.contactoEmerg < 0 ||
        newStudent.contactoEmerg.toString().length < 7 ||
        newStudent.contactoEmerg.toString().length > 15
      ) {
        setErrors({
          ...errors,
          contactoEmerg:
            "El número del contacto de emergencia no es válido, debe estar entre 7 y 15 digitos, no puede ser negativo y debe escribirse sin puntos ni comas.",
        });
      } else {
        setErrors({
          ...errors,
          contactoEmerg: "",
        });
      }
      break;

    default:
      setErrors({
        ...errors,
      });
      break;
  }
};
export default validation;
