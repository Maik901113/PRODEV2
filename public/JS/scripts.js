// Función para validar campos
function validateFields(nombre, email, documento, rol) {
  return nombre !== '' && email !== '' && documento !== '' && rol !== '';
}

// Función para verificar si el usuario ya existe
async function userExists(username) {
  try {
    const response = await fetch(`/user-exists?username=${username}`);
    const data = await response.json();
    return data.exists;
  } catch (error) {
    console.error('Error al verificar la existencia del usuario:', error);
    return false;
  }
}

// EventListener para el formulario de registro
document.getElementById('registerForm').addEventListener('submit', function (event) {
  event.preventDefault();
  register();
});

// Función para mostrar mensajes en el contenedor
function showMessage(message, isSuccess) {
  const messageContainer = document.getElementById('messageContainer');
  messageContainer.innerHTML = message;
  messageContainer.style.color = isSuccess ? 'green' : 'red';
}

// Función para registrar un usuario
async function register() {
  const nombre = document.getElementById('nombre').value;
  const direccion = document.getElementById('direccion').value;
  const email = document.getElementById('email').value;
  const documento = document.getElementById('documento').value;
  const rol = document.getElementById('rol').value;
  const username = document.getElementById('username').value;
  const password = document.getElementById('password').value;

  console.log('Valores a enviar al servidor:', {
    nombre,
    direccion,
    email,
    documento,
    rol,
    username,
    password,
  });

  if (!validateFields(nombre, email, documento, rol)) {
    showMessage('Por favor, completa todos los campos correctamente.', false);
    return;
  }

  const exists = await userExists(username);

  if (exists) {
    showMessage('El usuario ya está registrado.', false);
    return;
  }

  try {
    // Obtener el id_Roles del rol proporcionado
    let idRoles;
    if (rol === 'administrador') {
      idRoles = 1; // Reemplaza con el valor correspondiente para "administrador"
    } else {
      // Si es otro rol, ajusta el valor en consecuencia
      idRoles = 2; // Reemplaza con el valor correspondiente para otros roles
    }

    const response = await fetch('http://localhost:3000/registro', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        nombre,
        direccion,
        email,
        documento,
        rol: idRoles, // Usa el idRoles calculado
        username,
        password,
      }),
    });

    if (response.ok) {
      const result = await response.json();
      if (result.success) {
        showMessage(result.success, true);
        window.location.href = 'http://localhost:3000/login';
      } else {
        showMessage(result.error, false);
      }
    } else {
      const error = await response.json();
      showMessage(error.error, false);
    }
    
  } catch (error) {
    console.error('Error al enviar solicitud:', error);
    showMessage('Error al registrar usuario. Por favor, intenta nuevamente.', false);
  }
}