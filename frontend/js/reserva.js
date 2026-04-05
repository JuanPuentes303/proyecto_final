document.getElementById("formReserva").addEventListener("submit", reservar);

function reservar(e) {
  e.preventDefault();

  const sesion = JSON.parse(localStorage.getItem("usuario"));

  if (!sesion) {
    alert("Debes iniciar sesión");
    return;
  }

  const usuario = sesion.usuario;
  const id_disfraz = localStorage.getItem("disfrazSeleccionado");
  const fecha_inicio = document.getElementById("fecha_inicio").value;
  const fecha_fin = document.getElementById("fecha_fin").value;
  const tipo = document.getElementById("tipo").value;

  fetch("http://localhost:3000/reservar", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      id_usuario: usuario.id,
      id_disfraz,
      fecha_inicio,
      fecha_fin,
      tipo
    })
  })
    .then(res => res.text())
    .then(mensaje => {
      alert(mensaje);
    })
    .catch(error => {
      console.error("Error:", error);
    });
}