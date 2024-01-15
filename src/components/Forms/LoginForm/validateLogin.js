const validate = (input) => {
  let errors = {};
  let validateEmail = new RegExp(
    /^[A-Za-z0-9_!#$%&'*+/=?`{|}~^.-]+@[A-Za-z0-9.-]+$/,
    "gm"
  );
  let validatePassword = new RegExp(
    /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()_+\-.,:;<>,.?~\\/[\]{}]).{8,16}$/
  );

  if (input.email.length === 0) errors.email = "Por favor ingrese un email";
  if (!validateEmail.test(input.email))
    errors.email = "El email ingresado no es válido";

  if (!validatePassword.test(input.password))
    errors.password =
      "La contraseña debe incluir al menos 1 minúscula, 1 mayúscula, 1 número, 1 caracter especial y contener entre 8 y 16 caracteres";

  return errors;
};

export default validate;
