document.addEventListener('DOMContentLoaded', () => {
  const continuarButton = document.getElementById('continuarButton');

  continuarButton.addEventListener('click', () => {
    // Redirigir a la página de mantenimiento al hacer clic en "Continuar"
    window.location.href = '/mantenimiento';
  });
});
