const validate = (input) => {
  let errors = {};
  let regexNumberSimbols = /[0-9!@#$%^&*()_+{}\\[\]:;<>,.?~\\/\\-]/;
  let validateEmail = new RegExp(
    /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
    "gm"
  );
  let validatePassword = new RegExp(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,16}$/);

  if (input.email.length === 0) errors.email = "Por favor ingrese un email";
  if (!validateEmail.test(input.email))
    errors.email = "El email ingresado no es válido";

  if (!validatePassword.test(input.password))
    errors.password =
      "La contraseña debe incluir al menos 1 minúscula, 1 mayúscula, 1 número, 1 caracter especial y contener entre 8 y 16 caracteres";

  if (!input.nombre) errors.nombre = "Escriba un nombre";
  if (input.nombre.length > 20)
    errors.nombre = "Deben ser menos de 20 caracteres";
  if (regexNumberSimbols.test(input.nombre))
    errors.nombre = "No puede contener números o símbolos";

  if (!input.apellidoPaterno)
    errors.apellidoPaterno = "Escriba un apellido paterno";
  if (input.apellidoPaterno.length > 20)
    errors.apellidoPaterno = "Deben ser menos de 20 caracteres";
  if (regexNumberSimbols.test(input.apellidoPaterno))
    errors.apellidoPaterno = "No puede contener números o símbolos";

  if (!input.apellidoMaterno)
    errors.apellidoMaterno = "Escriba un apellido materno";
  if (input.apellidoMaterno.length > 20)
    errors.apellidoMaterno = "Deben ser menos de 20 caracteres";
  if (regexNumberSimbols.test(input.apellidoMaterno))
    errors.apellidoMaterno = "No puede contener números o símbolos";

  return errors;
};

export default validate;
