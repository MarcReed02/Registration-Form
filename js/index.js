function validarFormulario(event) {
  event.preventDefault();

  reiniciarErrores();

  var emailInput = document.getElementById("email");
  var passwordInput = document.getElementById("password");
  var confirmPasswordInput = document.getElementById("passwordConfirmation");
  var addressInput = document.getElementById("address");
  var comunaSelect = document.getElementById("comuna");
  var phoneInput = document.getElementById("phone");
  var urlInput = document.getElementById("url");
  var hobbiesInput = document.getElementById("hobbies");

  var successMessage = document.getElementById("successMessage");
  successMessage.innerText = "";

  var valid = true;

  if (emailInput.value === "") {
    mostrarError("EmailError", "* El correo electronico es obligatorio");
    valid = false;
  } else if (!validarFormatoEmail(emailInput.value)) {
    mostrarError("EmailError", "* Formato de correo electronico inválido");
    valid = false;
  }

  if (passwordInput.value === "") {
    mostrarError("PassError", "* Contraseña es obligatoria");
    valid = false;
  } else if (!validarContraseña(passwordInput.value)) {
    mostrarError("PassError", "* La contraseña debe tener de 3 a 6 caracteres<br>y contener al menos un dígito y una letra.");
    valid = false;
  }

  if (confirmPasswordInput.value === "") {
    mostrarError("ConfirmPassError", "* Confirmar contraseña es obligatorio.");
    valid = false;
  } else if (confirmPasswordInput.value !== passwordInput.value) {
    mostrarError("ConfirmPassError", "* Las contraseñas no coinciden.");
    valid = false;
  }

  if (addressInput.value === "") {
    mostrarError("AddressError", "* Dirección es obligatoria.");
    valid = false;
  } else if (!validarDireccion(addressInput.value)) {
    mostrarError(
    "AddressError", "* La dirección ingresada es inválida. Por favor,<br>ingresa una dirección válida sin caracteres<br>especiales."
    );
    valid = false;
  }

  if (comunaSelect.value === "") {
    mostrarError("comunaError", "* Selecciona una comuna.");
    valid = false;
  }

  if (phoneInput.value === "") {
    mostrarError("PhoneError", "* Teléfono es obligatorio.");
    valid = false;
  } else if (!validarTelefono(phoneInput.value)) {
    mostrarError("PhoneError", "* Formato de teléfono inválido,<br> recuerde usar el prefijo +56");
    valid = false;
  }

  if (urlInput.value === "") {
    mostrarError("URL_Error", "* URL es obligatoria.");
    valid = false;
  } else if (!validarURL(urlInput.value)) {
    mostrarError("URL_Error", "* Formato de URL inválido.");
    valid = false;
  }

  if (hobbiesInput.value === "") {
    mostrarError("AficionesError", "* Ingrese al menos 2 aficiones.");
    valid = false;
  } else if (!validarAficiones(hobbiesInput.value)) {
    mostrarError(
    "AficionesError", "* Formato de ingeso no valido,<br> ejemplo: Natación, Tenis, etc."
    );
    valid = false;
  }

  if (valid) {
    successMessage.innerText = "Formulario enviado con exito!";
  }
}

function reiniciarErrores() {
  var errorElements = document.getElementsByClassName("error-message");
  for (var i = 0; i < errorElements.length; i++) {
    errorElements[i].textContent = "";
  }
}

function mostrarError(id, mensaje) {
  var errorElement = document.getElementById(id);
  errorElement.innerHTML = mensaje;
}

function validarFormatoEmail(email) {
  if (email.trim() !== email) {
    return false;
  }
  if (!contieneArroba(email)) {
    return false;
  }

  var parts = email.split("@");
  var user = parts[0];
  var domain = parts[1];
  if (user.length === 0 || domain.length === 0) {
    return false;
  }
  if (contieneCaracterEspecial(user) || contieneCaracterEspecial(domain)) {
    return false;
  }
  if (contienePuntoAntesArroba(user)) {
    return false;
  }
  if (!validarExtensionDominio(domain)) {
    return false;
  }

  return true;
}

function contieneArroba(email) {
  return email.indexOf("@") !== -1;
}

function contieneCaracterEspecial(texto) {
  var specialChars = [",", "'", "<", ">"];
  for (var i = 0; i < specialChars.length; i++) {
    if (texto.indexOf(specialChars[i]) !== -1) {
      return true;
    }
  }
  return false;
}

function contienePuntoAntesArroba(user) {
  return (
    user.startsWith(".") || user.endsWith(".") || user.indexOf("..") !== -1
  );
}

function validarExtensionDominio(domain) {
  var validExtensions = ["com", "org", "net", "edu", "gov", "mil", "co", "uk", "de", "jp", "us", "cn", "fr", "br", "es", "it", "ru", "ca", "nl"];
  var domainParts = domain.split(".");
  var extension = domainParts[domainParts.length - 1];
  return validExtensions.includes(extension);
}

function contienePuntosAdicionales(texto) {
  var parts = texto.split(".");
  if (parts.length > 1) {
    for (var i = 1; i < parts.length; i++) {
      if (parts[i].length === 0 || parts[i] === "..") {
        return true;
      }
    }
  }
  return false;
}

function validarContraseña(contraseña) {
  if (contraseña.length < 3 || contraseña.length > 6) {
    return false;
  }
  var tieneDigito = false;
  var tieneLetra = false;

  for (var i = 0; i < contraseña.length; i++) {
    var caracter = contraseña[i];
    if (esDigito(caracter)) {
      tieneDigito = true;
    } else if (esLetra(caracter)) {
      tieneLetra = true;
    }
  }
  return tieneDigito && tieneLetra;
}

function esDigito(caracter) {
  var digitos = "0123456789"
  return digitos.includes(caracter);
}

function esLetra(caracter) {
  var letras = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
  return letras.includes(caracter);
}

function validarDireccion(direccion) {
  var caracteresEspeciales = [
    "!", "@", "#", "$", "%", "^", "&", "*", "(", ")", "_", "+", "=", "[", "]", "{", "}", "|", "\\", ";", ":", '"', "'", "<", ">", ",", ".", "/", "?",
  ];

  for (var i = 0; i < caracteresEspeciales.length; i++) {
    if (direccion.includes(caracteresEspeciales[i])) {
      return false;
    }
  }
  if (direccion.trim().length === 0) {
    return false;
  }
  return true;
}

function validarTelefono(telefono) {
  const telefonoSinEspacios = eliminarEspacios(telefono);
  if (
    telefonoSinEspacios.startsWith("+56") &&
    telefonoSinEspacios.length >= 12
  ) {
    const numero = telefonoSinEspacios.substring(3);
    if (numero.length === 9 && contieneSoloDigitos(numero)) {
      return true;
    }
  }
  return false;
}

function eliminarEspacios(cadena) {
  var resultado = "";
  for (var i = 0; i < cadena.length; i++) {
    var caracter = cadena[i];
    if (caracter !== " ") {
      resultado += caracter;
    }
  }
  return resultado;
}

function contieneSoloDigitos(numero) {
  var digitos = "0123456789";

  for (var i = 0; i < numero.length; i++) {
    var caracter = numero[i];
    if (!digitos.includes(caracter)) {
      return false;
    }
  }
  return true;
}

function validarURL(url) {
  const trimmedURL = url.trim();
  if (trimmedURL.length === 0) {
    return false;
  }

  const hasHTTP = trimmedURL.startsWith("http://");
  const hasHTTPS = trimmedURL.startsWith("https://");
  if (!hasHTTP && !hasHTTPS) {
    return false;
  }
  const domainIndex = trimmedURL.indexOf("/", hasHTTPS ? 8 : 7);
  const domain = trimmedURL.substring(
    hasHTTP ? 7 : 8,
    domainIndex !== -1 ? domainIndex : trimmedURL.length
  );
  if (domain.length === 0 || domain.includes(" ")) {
    return false;
  }
  return true;
}

function validarAficiones(aficiones) {
  const trimmedAficiones = aficiones.trim();
  const aficionesArray = trimmedAficiones.split(",");
  const aficionesValidas = aficionesArray.filter(
    (aficion) => aficion.trim().length > 0
  );
  return aficionesValidas.length >= 2;
}

document.getElementById("form").addEventListener("submit", validarFormulario);
