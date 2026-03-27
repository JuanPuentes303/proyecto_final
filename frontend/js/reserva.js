function reservar() {
  const usuario = JSON.parse(localStorage.getItem("usuario"));
  const id_disfraz = localStorage.getItem("disfrazSeleccionado");

  const fecha_inicio = document.getElementById("inicio").value;
  const fecha_fin = document.getElementById("fin").value;
  const tipo = document.getElementById("tipo").value;

  fetch("http://localhost:3000/reservar", {
    method: "POST",
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify({
      id_usuario: usuario.id,
      id_disfraz,
      fecha_inicio,
      fecha_fin,
      tipo
    })
  })
  .then(res => res.text())
  .then(data => alert(data));
}