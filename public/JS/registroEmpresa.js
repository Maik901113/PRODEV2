// registroEmpresa.js

// Define la función registerCompany
async function registerCompany() {
    const nombre = document.getElementById('nombreEmpresa').value;
    const nit = document.getElementById('nitEmpresa').value;
    const telefono = document.getElementById('telefonoEmpresa').value;
    const email = document.getElementById('emailEmpresa').value;
    const direccion = document.getElementById('direccionEmpresa').value;
  
    // Registro de evento para el formulario
  document.getElementById('registroEmpresaForm').addEventListener('submit', function (event) {
    event.preventDefault();
    registerCompany();
  });
  

    // Validaciones y lógica de registro aquí...
  
   try {
  const response = await fetch('http://localhost:3000/registrar-empresa', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      nombre,
      nit,
      telefono,
      email,
      direccion,
        }),
      });
  
      if (response.ok) {
        const result = await response.json();
        if (result.continuar) {
          alert('Registro de empresa exitoso');
          // Redirige a la página de registroDeMaquina.html
          window.location.href = 'http://localhost:3000/registro_de_maquina.html';
        } else {
          alert('Error en el registro de empresa. Por favor, inténtalo nuevamente.');
        }
      } else {
        const error = await response.json();
        alert(error.error);
      }
    } catch (error) {
      console.error('Error al enviar solicitud:', error);
      alert('Error en el registro de empresa. Por favor, intenta nuevamente.');
    }
  }
  
  // Otras funciones y lógica necesaria...
  
  
  // Función para continuar con el diagnóstico
  function continuarDiagnostico() {
    // Lógica para continuar con el diagnóstico...
    alert('Continuar con diagnóstico');
    // Redirige a la página de diagnostico.html
    window.location.href = 'http://localhost:3000/diagnostico.html';
  }
  