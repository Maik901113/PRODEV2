// Definir un objeto para almacenar los usuarios registrados
var users = [];
function login() {
  var username = document.getElementById("username").value;
  var password = document.getElementById("password").value;

  // Lógica de autenticación
  if (authenticateUser(username, password)) {
      alert("Inicio de sesión exitoso");
      // Puede redirigir a la pagina de registro de maquina 
      window.location.href = "registro_de_maquina.html";
  } else {
      alert("Nombre de usuario o contraseña incorrectos");
  }
}

function forgotPassword() {
  var userEmail = prompt("Ingrese su dirección de correo electrónico para restablecer la contraseña:");

  // Verificar si el correo electrónico está en la base de datos (puedes implementar esta lógica)
  if (userEmail) {
      alert("Se ha enviado un enlace para restablecer la contraseña a su correo electrónico.");
      // Aquí deberías enviar un correo electrónico al usuario con un enlace para restablecer la contraseña
      // Puedes utilizar servicios como SendGrid o nodemailer para enviar correos electrónicos desde Node.js
  } else {
      alert("No se proporcionó una dirección de correo electrónico.");
  }
}

function authenticateUser(username, password) {
 
  return true;
}

function register() {
  // Obtener datos del formulario
  var firstName = document.getElementById('firstName').value;
  var lastName = document.getElementById('lastName').value;
  var email = document.getElementById('email').value;
  var phoneNumber = document.getElementById('phoneNumber').value;
  var username = document.getElementById('username').value;
  var password = document.getElementById('password').value;
  var rol = document.getElementById('rol').value;

  // Validar campos (puedes agregar tu lógica de validación aquí)
  if (!validateFields(firstName, lastName, email, phoneNumber, username, password, rol)) {
    // Muestra un mensaje de error o realiza acciones adicionales según tus necesidades
    alert('Por favor, completa todos los campos correctamente.');
    return;
  }

  // Redirigir a la página de login
  window.location.href = '/login.html';
}

function validateFields(firstName, lastName, email, phoneNumber, username, password, rol) {
 
  // Ejemplo de validación simple: todos los campos deben estar llenos
  return firstName !== '' && lastName !== '' && email !== '' && phoneNumber !== '' && username !== '' && password !== '' && rol !== '';
}

function userExists(username) {
    // Verificar si el usuario ya está registrado
    return users.some(function(user) {
        return user.username === username;
    });
}
function validarFormulario() {
  var nombreMaquina = document.getElementById('nombreMaquina').value;
  var marca = document.getElementById('marca').value;
  var serial = document.getElementById('serial').value;
  var tipoMaquina = document.getElementById('tipoMaquina').value;
  var descripcion = document.getElementById('descripcion').value;
  var fechaIngreso = document.getElementById('fechaIngreso').value;
  var tipoMantenimiento = document.getElementById('tipoMantenimiento').value;
  var estadoMantenimiento = document.getElementById('estadoMantenimiento').value;

  if (!nombreMaquina || !marca || !serial || !tipoMaquina || !descripcion || !fechaIngreso || !tipoMantenimiento || !estadoMantenimiento) {
      alert('Todos los campos son obligatorios. Por favor, llénelos correctamente.');
      return false;
  }

  // Si todas las validaciones pasan, el formulario se enviará
  // Redirigir a la página de diagnóstico inicial
  window.location.href = "/diagnostico.html";
  return true;
}

function enviarFormulario() {
  // Llamar a la función validarFormulario antes de redirigir
  if (validarFormulario()) {
        alert("Formulario enviado correctamente");
      // Redirigir a la página de historial maquina 
      window.location.href = "/diagnostico.html";
  }
}

function redirectToDiagnostico() {
  // Redirigir a la página de diagnóstico
  window.location.href = "/diagnostico.html";
}
function verHistorial1() {
  // Redirige a la página de historial_maquina.html
  window.location.href = "historial_maquina.html";
}


var historialData = [];

// Función para mostrar el historial
function verHistorial() {
  var serialMaquina = document.getElementById('serialMaquina').value;

  // Validar que el número de serie esté presente y coincida con el historial
  if (serialMaquina) {
    var maquinaEncontrada = historialData.find(function (maquina) {
      return maquina.serial === serialMaquina;
    });

    if (maquinaEncontrada) {
      mostrarInfoHistorial(maquinaEncontrada);
    } else {
      alert("No se encontró información para el número de serie proporcionado.");
    }
  } else {
    alert("Por favor, ingrese un número de serie válido.");
  }
}

// Función para mostrar la información del historial en la página
function mostrarInfoHistorial(maquina) {
  var historialInfoDiv = document.getElementById("historialInfo");
  historialInfoDiv.innerHTML = `
    <h3>Información de la Máquina</h3>
    <p><strong>Nombre de Máquina:</strong> ${maquina.nombre}</p>
    <p><strong>Marca:</strong> ${maquina.marca}</p>
    <p><strong>Serial:</strong> ${maquina.serial}</p>
    <p><strong>Tipo de Máquina:</strong> ${maquina.tipo}</p>
    <p><strong>Descripción:</strong> ${maquina.descripcion}</p>
    <p><strong>Fecha de Ingreso:</strong> ${maquina.fechaIngreso}</p>
    <p><strong>Tipo de Mantenimiento:</strong> ${maquina.tipoMantenimiento}</p>
    <p><strong>Estado de Mantenimiento:</strong> ${maquina.estadoMantenimiento}</p>
  `;
  
  // Mostrar los botones después de ver el historial
  var botonesHistorialDiv = document.getElementById("botonesHistorial");
  botonesHistorialDiv.style.display = "block";
}

// Funciones para los botones
function devolver() {
  // Redirigir a la página de registro de máquina
  window.location.href = 'registro_de_maquina.html';
}

function continuar() {
 
  // Redirigir a la página de diagnóstico inicial
  window.location.href = '/diagnostico.html';
}
// Funciones para los botones en la página de diagnóstico
function rechazar() {
      
    // Redirigir a la página de finalización
    window.location.href = 'finalizacion.html?mensaje=Proceso%20rechazado';
  }

function aprobar() {
    // Redirigir a la página de generación de ticket
    window.location.href = "generacion_ticket.html";
}
// Variables para almacenar el estado del contador de tickets y serial de máquina
var contadorTickets = 1; // Iniciar en 1 para el primer ticket
var serialMaquinaActual = '';

// Función para generar un ticket
function generarTicket() {
  // Obtener los valores del formulario
  var codigoTecnico = document.getElementById('codigoTecnico').value;

  // Validar que todos los campos estén completos y el código de técnico sea un número de 4 dígitos
  if (!codigoTecnico || codigoTecnico.length !== 4 || isNaN(codigoTecnico)) {
    alert('Por favor, complete todos los campos y asegúrese de que el código de técnico sea un número de 4 dígitos.');
    return;
  }

  // Generar el número de ticket consecutivo de 10 dígitos
  var numeroTicket = pad(contadorTickets, 10);

  // Guardar el número de ticket en sessionStorage
  sessionStorage.setItem('numeroTicket', numeroTicket);

  // Obtener el serial de la máquina actual 
  var serialMaquina = obtenerSerialMaquina();

  // Mostrar los valores en el formulario
  document.getElementById('serialMaquina').value = serialMaquina;
  document.getElementById('numeroTicket').value = numeroTicket;

  // Incrementar el contador de tickets para el próximo ticket
  contadorTickets++;
}

// Función para obtener el serial de la máquina
function obtenerSerialMaquina() {
  // Implementa la lógica para obtener el serial de la máquina (puede ser un valor estático por ahora)
  return 'EjemploSerial123';
}

// Función para rellenar con ceros a la izquierda hasta alcanzar la longitud deseada
function pad(num, length) {
  var str = num.toString();
  while (str.length < length) {
    str = '0' + str;
  }
  return str;
}

// Función para redirigir a la página de mantenimiento
function continuarAMantenimiento() {
  // Redirigir a la página de mantenimiento
  window.location.href = "mantenimiento.html";
}

//mantenimiento//
document.addEventListener('DOMContentLoaded', function () {
  // Obtener el número de ticket de sessionStorage
  var numeroTicket = sessionStorage.getItem('numeroTicket');

  // Mostrar el número de ticket en la página de mantenimiento
  document.getElementById('numeroTicket').innerText = numeroTicket;
});

// Función para finalizar el mantenimiento
function finalizarMantenimiento() {
  // Obtener la descripción del mantenimiento
  var descripcionMantenimiento = document.getElementById('descripcionMantenimiento').value;

  // Validar que la descripción del mantenimiento esté completa
  if (!descripcionMantenimiento) {
    alert('Por favor, complete la descripción del mantenimiento.');
    return;
  }

  // Aquí puedes realizar acciones adicionales con la información del mantenimiento

  // Ejemplo: Redirigir a otra página (puedes ajustar según tu lógica)
  window.location.href = "otraPagina.html";
}

// Función para ir a la página de Insumos y Repuestos
function irAInsumosRepuestos() {
  // Redirigir a la página de Insumos y Repuestos
  window.location.href = "/insumos_repuestos.html";
}
function obtenerNumeroTicket() {
  var urlParams = new URLSearchParams(window.location.search);
  var numeroTicket = urlParams.get('numeroTicket');
  // Mostrar el número de ticket en la página de mantenimiento
  document.getElementById('numeroTicket').innerText = numeroTicket;
}
// insumo y repuestos 
document.addEventListener('DOMContentLoaded', function () {
  // Obtener el número de ticket de sessionStorage
  var numeroTicket = sessionStorage.getItem('numeroTicket');

  // Mostrar el número de ticket en la página de Insumos y Repuestos
  document.getElementById('numeroTicket').innerText = numeroTicket;
});

// Variables para almacenar la lista de insumos y repuestos
var listaInsumosRepuestos = [];

// Función para agregar insumo o repuesto
function agregarInsumoRepuesto() {
  var nombreInsumo = document.getElementById('nombreInsumo').value;
  var cantidad = document.getElementById('cantidad').value;
  var descripcion = document.getElementById('descripcion').value;

  // Validar que los campos estén completos
  if (!nombreInsumo || !cantidad || isNaN(cantidad) || cantidad <= 0) {
    alert('Por favor, complete todos los campos correctamente.');
    return;
  }

  // Crear un objeto con la información del insumo o repuesto
  var insumoRepuesto = {
    nombre: nombreInsumo,
    cantidad: cantidad,
    descripcion: descripcion
  };

  // Agregar el objeto a la lista
  listaInsumosRepuestos.push(insumoRepuesto);

  // Actualizar la lista de resumen
  actualizarListaResumen();

  // Limpiar los campos del formulario
  document.getElementById('nombreInsumo').value = '';
  document.getElementById('cantidad').value = '';
  document.getElementById('descripcion').value = '';
}

// Función para actualizar la lista de resumen
function actualizarListaResumen() {
  var listaResumen = document.getElementById('listaResumen');
  listaResumen.innerHTML = ''; // Limpiar la lista

  // Recorrer la lista de insumos y repuestos y agregar elementos a la lista de resumen
  for (var i = 0; i < listaInsumosRepuestos.length; i++) {
    var item = document.createElement('li');
    item.textContent = listaInsumosRepuestos[i].nombre;
    listaResumen.appendChild(item);
  }
}

// Función para guardar y continuar
function guardarYContinuar() {
  // Implementa la lógica para guardar la información y redirigir a la página de Cerrar Ticket
  // Puedes utilizar window.location.href para redirigir a "cerrar_ticket.html"
  // Asegúrate de almacenar los datos necesarios antes de redirigir
  // Por ejemplo, puedes almacenar la listaInsumosRepuestos en sessionStorage antes de redirigir
  sessionStorage.setItem('listaInsumosRepuestos', JSON.stringify(listaInsumosRepuestos));
  window.location.href = "cerrar_ticket.html";
}


// cerrar ticket
document.addEventListener('DOMContentLoaded', function () {
  // Obtener el número de ticket de sessionStorage
  var numeroTicket = sessionStorage.getItem('numeroTicket');

  // Mostrar el número de ticket en la página de cerrar ticket
  document.getElementById('numeroTicket').innerText = numeroTicket;
});

// Función para cerrar el ticket
function cerrarTicket() {
  // Aquí puedes agregar la lógica para cerrar el ticket

  // Puedes hacer una solicitud al backend para enviar un correo o realizar otras acciones necesarias
  alert('Ticket cerrado correctamente.')
  window.location.href="finalizacion.html";
}

// Función para enviar una alerta
function enviarAlerta() {
  // Aquí puedes agregar la lógica para enviar una alerta
  // Puedes hacer una solicitud al backend para enviar un correo o realizar otras acciones necesarias
  alert('Alerta enviada correctamente.');
}
