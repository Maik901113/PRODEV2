import axios from 'axios';

function aprobar() {
    // Obtener datos del formulario
    const diagnostico = document.getElementById('diagnostico').value;
  
    // Validar que el campo no esté vacío
    if (!diagnostico.trim()) {
      alert('Por favor, ingresa un diagnóstico antes de aprobar.');
      return;
    }
  
    // Realizar la petición al servidor con Axios
    axios.post('http://localhost:3000/diagnostico/registrar-diagnostico', {
      diagnostico: diagnostico,
    })
      .then(response => {
        console.log('Respuesta del servidor:', response.data);
  
        // Mostrar mensaje de éxito
        alert('El diagnóstico ha sido guardado.');
  
        // Redirigir a la página correspondiente
        window.location.href = '/generacion_ticket';
      })
      .catch(error => {
        console.error('Error al enviar diagnóstico:', error);
  
        // Mostrar mensaje de error, si es necesario
      });
  }
  
  function rechazar() {
    // Mostrar mensaje de rechazo
    alert('Proceso rechazado.');
  
    // Redirigir a la página correspondiente
    window.location.href = '/finalizacion';
  }