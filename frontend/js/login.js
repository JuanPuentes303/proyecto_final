function login() {
  const correo = document.getElementById("correo").value;
  const contraseña = document.getElementById("password").value;

  fetch("http://localhost:3000/login", {
    method: "POST",
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify({ correo, contraseña })
  })
  .then(res => {
    if (!res.ok) throw new Error();
    return res.json();
  })
  .then(data => {
    localStorage.setItem("usuario", JSON.stringify(data.usuario));

    if (data.usuario.rol === "admin") {
      window.location.href = "admin.html";
    } else {
      window.location.href = "catalogo.html";
    }
  })
  .catch(() => alert("Credenciales incorrectas"));
}