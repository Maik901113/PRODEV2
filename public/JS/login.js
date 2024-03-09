async function login() {
    var username = document.getElementById("username").value;
    var password = document.getElementById("password").value;
  
    // Verificar si el usuario existe
    const exists = await userExists(username);
  
    if (exists) {
      alert("Inicio de sesión exitoso");
      // Puedes redirigir a la página de registro de empresa
      window.location.href = "registroDeEmpresa";
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
  
  async function userExists(username) {
    try {
      const response = await fetch(`/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username }),
      });
  
      if (!response.ok) {
        throw new Error('Error al verificar la existencia del usuario');
      }
  
      const data = await response.json();
      return data.exists;
    } catch (error) {
      console.error('Error al verificar la existencia del usuario:', error);
      return false;
    }
  }
  
  document.getElementById('loginForm').addEventListener('submit', function (event) {
    event.preventDefault();
    login();
  });
  