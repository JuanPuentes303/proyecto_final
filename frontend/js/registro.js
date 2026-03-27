function registro() {
  const nombre = document.getElementById("nombre").value;
  const correo = document.getElementById("correo").value;
  const contraseña = document.getElementById("password").value;

  fetch("http://localhost:3000/registro", {
    method: "POST",
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify({ nombre, correo, contraseña })
  })
  .then(res => res.text())
  .then(data => {
    alert(data);
    window.location.href = "login.html";
  });
}