function aprobar() {
  const diagnostico = document.getElementById('diagnostico').value;

  // Enviar datos al servidor usando Fetch API
  fetch('http://localhost:3000/diagnostico/registrar-diagnostico', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      diagnostico: diagnostico,
    }),
  })
    .then(response => {
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      return response.json();
    })
    .then(data => {
      alert('El diagnóstico ha sido guardado.');
      window.location.href = '/generacion_ticket';
    })
    .catch(error => {
      console.error('Error al enviar diagnóstico:', error);
    });
}

function rechazar() {
  alert('Proceso rechazado.');
  window.location.href = '/finalizacion';
}