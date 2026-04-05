document.getElementById("formDisfraz").addEventListener("submit", enviarDisfraz);

function enviarDisfraz(e) {
  e.preventDefault();

  const formData = new FormData(e.target);
  const sesion = JSON.parse(localStorage.getItem("usuario"));

  if (!sesion) {
    alert("Debes iniciar sesión");
    return;
  }

  formData.append("rol", sesion.usuario.rol);

  fetch("http://localhost:3000/admin/disfraz", {
    method: "POST",
    body: formData
  })
    .then(res => res.text())
    .then(mensaje => {
      alert(mensaje);
      e.target.reset();
    })
    .catch(error => {
      console.error("Error:", error);
    });
}