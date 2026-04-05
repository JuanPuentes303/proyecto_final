window.addEventListener("DOMContentLoaded", () => {
  cargarDestacados();
});

function obtenerAleatorios(lista, cantidad) {
  return [...lista]
    .sort(() => 0.5 - Math.random())
    .slice(0, cantidad);
}

function cargarDestacados() {
  fetch("http://localhost:3000/disfraces")
    .then(res => res.json())
    .then(disfraces => {
      const destacados = obtenerAleatorios(disfraces, 6);

      mostrarDisfraces(destacados, "destacados");
      mostrarDisfraces(disfraces, "resultados");
    })
    .catch(error => {
      console.error("Error al cargar catálogo:", error);
    });
}

function filtrar() {
  const nombre = document.getElementById("filtroNombre").value;
  const estado = document.getElementById("filtroEstado").value;

  fetch(`http://localhost:3000/disfraces/filtro?nombre=${nombre}&estado=${estado}`)
    .then(res => res.json())
    .then(disfraces => {
      mostrarDisfraces(disfraces, "resultados");
    })
    .catch(error => {
      console.error("Error al filtrar:", error);
    });
}

function crearTarjeta(disfraz) {
  return `
    <div class="tarjeta">
      <img src="http://localhost:3000/uploads/${disfraz.imagen}" alt="${disfraz.nombre}">
      <h3>${disfraz.nombre}</h3>
      <p>${disfraz.descripcion}</p>
      <p>$${disfraz.precio}</p>
      <p><strong>${disfraz.estado_actual}</strong></p>
      <button onclick="irReservar(${disfraz.id})">Reservar</button>
    </div>
  `;
}

function mostrarDisfraces(disfraces, contenedorId) {
  const contenedor = document.getElementById(contenedorId);
  contenedor.innerHTML = "";

  if (disfraces.length === 0) {
    contenedor.innerHTML = "<p>No se encontraron disfraces.</p>";
    return;
  }

  disfraces.forEach(disfraz => {
    contenedor.innerHTML += crearTarjeta(disfraz);
  });
}

function irReservar(id) {
  localStorage.setItem("disfrazSeleccionado", id);
  window.location.href = "reserva.html";
}