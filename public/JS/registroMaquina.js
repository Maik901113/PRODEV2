// registroMaquina.js

// Función para enviar el formulario y registrar la máquina
async function enviarFormulario() {
    const nombreMaquina = document.getElementById('nombreMaquina').value;
    const marca = document.getElementById('marca').value;
    const serial = document.getElementById('serial').value;
    const tipoMaquina = document.getElementById('tipoMaquina').value;
    const descripcion = document.getElementById('descripcion').value;
    const fechaIngreso = document.getElementById('fechaIngreso').value;
    const tipoMantenimiento = document.getElementById('tipoMantenimiento').value;
  
    // Validaciones y lógica de registro aquí...
  
    try {
      const response = await fetch('http://localhost:3000/empresas/registrar-mantenimiento', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          nombreMaquina,
          marca,
          serial,
          tipoMaquina,
          descripcion,
          fechaIngreso,
          tipoMantenimiento,
        }),
      });
  
      if (response.ok) {
        const result = await response.json();
        if (result.success) {
          alert('Registro de máquina exitoso');
          // Redirige a la página de registroDeMaquina.html (ajusta la ruta según tu estructura)
          window.location.href = 'http://localhost:3000/diagnostico';
        } else {
          alert('Error en el registro de máquina. Por favor, inténtalo nuevamente.');
        }
      } else {
        const error = await response.json();
        alert(error.error);
      }
    } catch (error) {
      console.error('Error al enviar solicitud:', error);
      alert('Error en el registro de máquina. Por favor, intenta nuevamente.');
    }
  }
  