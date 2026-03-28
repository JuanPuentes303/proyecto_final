document.getElementById("formDisfraz").addEventListener("submit", e => {
  e.preventDefault();

  console.log("Enviando formulario..."); 

  const formData = new FormData(e.target);
  const usuario = JSON.parse(localStorage.getItem("usuario"));

if (!usuario) {
  alert("Debes iniciar sesión");
  return;
}

formData.append("rol", data.usuario.rol);

  fetch("http://localhost:3000/admin/disfraz", {
    method: "POST",
    body: formData
  })
  .then(res => res.text())
  .then(data => {
    console.log("Respuesta del servidor:", data);
    alert(data);
  })
  .catch(err => console.error("Error:", err)); 
});