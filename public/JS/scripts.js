function validateFields(nombre, email, documento, rol) {
  return nombre !== '' && email !== '' && documento !== '' && rol !== '';
}

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

document.getElementById('registerForm').addEventListener('submit', function (event) {
  event.preventDefault();
  register();
});
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
    alert('Por favor, completa todos los campos correctamente.');
    return;
  }

  const exists = await userExists(nombre);

  if (exists) {
    alert('El usuario ya está registrado.');
    return;
  }
    // Obtener el id_Roles del rol proporcionado
  let idRoles;
    if (rol === 'administrador') {
      idRoles = 1; // Reemplaza con el valor correspondiente para "administrador"
    } else {
      // Si es otro rol, ajusta el valor en consecuencia
      idRoles = 2; // Reemplaza con el valor correspondiente para otros roles
  }
  
  

  try {
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
        rol:idRoles,
        username,
        password,
      }),
    });

    if (response.ok) {
      const result = await response.json();
      alert(result.success);


      // Redirige al usuario a la página de inicio de sesión después de un registro exitoso
      window.location.href = 'http://localhost:3000/login';
    } else {
      const error = await response.json();
      alert(error.error);
    }

    
  } catch (error) {
    console.error('Error al enviar solicitud:', error);
    alert('Error al registrar usuario. Por favor, intenta nuevamente.');
  }
  
}

