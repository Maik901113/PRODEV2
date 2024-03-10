async function login() {
  var username = document.getElementById("username").value;
  var password = document.getElementById("password").value;

  try {
    // Verificar si el usuario existe
    const response = await fetch(`/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, password }),
    });

    if (!response.ok) {
      throw new Error('Error al verificar la existencia del usuario');
    }

    const data = await response.json();

    if (data.exists) {
      alert("Inicio de sesión exitoso");
      // Puedes redirigir a la página de registro de empresa
      window.location.href = "http://localhost:3000/registroDeEmpresa";
    } else {
      alert("Nombre de usuario o contraseña incorrectos");
    }
  } catch (error) {
    console.error('Error al verificar la existencia del usuario:', error);
    alert("Error al verificar la existencia del usuario");
  }
}

function forgotPassword() {
  var userEmail = prompt("Ingrese su dirección de correo electrónico para restablecer la contraseña:");

  // Verificar si el correo electrónico está en la base de datos (puedes implementar esta lógica)
  if (userEmail) {
    alert("Se ha enviado un enlace para restablecer la contraseña a su correo electrónico.");
  } else {
    alert("No se proporcionó una dirección de correo electrónico.");
  }
}

document.getElementById('loginForm').addEventListener('submit', function (event) {
  event.preventDefault();
  login();
});

