export const validation = (newParent) => {
  const error = {};

  /* REGEX */
  // const idDocRegex = 1;
  const nameRegex = /^[a-zA-ZáéíóúüÁÉÍÓÚÜñÑäëïöüÄËÏÖÜ\s]+$/;
  const educationLevelRegex = /^[a-zA-Z]+$/;
  const professionRegex =
    /^[a-zA-ZáéíóúüñÁÉÍÓÚÜÑ]+(?:[ ]?[a-zA-ZáéíóúüñÁÉÍÓÚÜÑ]+)*$/;
  const addresesRegex =
    /^[a-zA-ZáéíóúüñÁÉÍÓÚÜÑ0-9]+(?:[ ]?[a-zA-ZáéíóúüñÁÉÍÓÚÜÑ0-9.]+)*$/;
  const numberRegex = /^[0-9]+$/;
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  const imageRegexUrl = /https?:\/\/[^\s]+\.(png|jpg)/;
  const regexUrl = new RegExp(imageRegexUrl);

  /* ID DOC PICTURE */
  if (newParent.fotoDocumento && !newParent.fotoDocumento.match(regexUrl)) {
    error.fotoDocumento = "El URL de la imagen es invalido.";
  }
  if (newParent.fotoDocumento.length === 0) {
    error.fotoDocumento = "Complete este campo con la foto de su DNI";
  }

  /* ID DOC */
  if (!numberRegex.test(newParent.idDoc)) {
    error.idDoc = "El DNI debe ser númerico.";
  }
  if (newParent.idDoc.length > 14 || newParent.idDoc.length < 8) {
    error.idDoc = "El DNI debe tener exactamente 8 o 14 carácteres.";
  }
  if (newParent.idDoc.length === 0) {
    error.idDoc = "Debe completar con su número de DNI.";
  }

  /* NAME */
  if (!nameRegex.test(newParent.name)) {
    error.name = "El nombre contiene carácteres inválidos.";
  }
  if (newParent.name.length > 45) {
    error.name = "El nombre no puede tener más de 45 carácteres.";
  }
  if (newParent.name.length === 0) {
    error.name = "Ingrese su nombre.";
  }

  /* LASTNAME */
  if (!nameRegex.test(newParent.lastName)) {
    error.lastName = "El apellido contiene cáracteres inválidos.";
  }
  if (newParent.lastName.length > 36) {
    error.lastName = "El apellido no puede tener más de 36 carácteres.";
  }
  if (newParent.lastName.length === 0) {
    error.lastName = "Ingrese su apellido.";
  }

  /* EDUCATION LEVEL */
  if (!educationLevelRegex.test(newParent.educationLevel)) {
    error.educationLevel = "El nivel educativo contiene carácteres inválidos.";
  }
  if (newParent.educationLevel.length > 15) {
    error.educationLevel =
      "El nivel educativo no debe superar los 15 carácteres.";
  }
  if (newParent.educationLevel.length === 0) {
    error.educationLevel = "Indique su máximo nivel educativo.";
  }

  /* PROFESSION */
  if (!professionRegex.test(newParent.profession)) {
    error.profession = "La profesión solo admite letras y espacios en blanco.";
  }
  if (newParent.profession.length > 30) {
    error.profession = "La profesión no debe contener mas de 30 carácteres.";
  }
  if (newParent.profession.length === 0) {
    error.profession = "Ingrese su profesión u oficio.";
  }

  /* ADDRESS */
  if (!addresesRegex.test(newParent.address)) {
    error.address = "La dirección contiene carácteres inválidos.";
  }
  if (newParent.address.length > 60) {
    error.address = "La dirección no debe exceder de 60 carácteres.";
  }
  if (newParent.address.length === 0) {
    error.address = "Ingrese la dirección de su hogar.";
  }

  /* JOB ADDRESS */
  if (!addresesRegex.test(newParent.jobAddress)) {
    error.jobAddress = "La dirección contiene carácteres inválidos.";
  }
  if (newParent.jobAddress.length > 60) {
    error.jobAddress = "La dirección no debe exceder de 60 carácteres.";
  }
  if (newParent.jobAddress.length === 0) {
    error.jobAddress = "Ingrese la dirección de su trabajo u oficio.";
  }

  /* TELEPHONE */
  if (!numberRegex.test(newParent.telephone)) {
    error.telephone = "El teléfono debe ser numérico.";
  }
  if (newParent.telephone.length > 14 || newParent.telephone.length < 8) {
    error.telephone =
      "El número de teléfono debe contener entre 8 y 14 dígitos.";
  }
  if (newParent.telephone.length === 0) {
    error.telephone = "Ingrese el teléfono fijo.";
  }

  /* JOB TELEPHONE */
  if (!numberRegex.test(newParent.jobTelephone)) {
    error.jobTelephone = "El Teléfono debe ser numérico.";
  }
  if (newParent.jobTelephone.length > 15 || newParent.jobTelephone.length < 8) {
    error.jobTelephone =
      "El número del teléfono laboral debe contener entre 8 y 15 dígitos.";
  }
  if (newParent.jobTelephone.length === 0) {
    error.jobTelephone =
      "Ingrese el teléfono del lugar donde realiza sus labores u oficio.";
  }

  /* CONTACT CELL PHONE */
  if (!numberRegex.test(newParent.contactCellphone)) {
    error.contactCellphone = "El número del celular debe ser númerico.";
  }
  if (
    newParent.contactCellphone.length > 13 ||
    newParent.contactCellphone.length < 8
  ) {
    error.contactCellphone =
      "El número de celular debe contener entre 8 y 13 dígitos.";
  }
  if (newParent.contactCellphone.length === 0) {
    error.contactCellphone = "Ingrese un número celular para contacto.";
  }

  /* EMAIL */
  if (!emailRegex.test(newParent.email)) {
    error.email = "Correo electrónico con formato incorrecto.";
  }
  if (newParent.email.length > 50) {
    error.email = "El correo electrónico supera los 50 carácteres permitidos.";
  }
  if (newParent.email.length === 0) {
    error.email = "Ingrese un correo electrónico.";
  }

  return error;
};
