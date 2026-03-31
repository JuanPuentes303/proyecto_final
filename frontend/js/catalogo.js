window.addEventListener("DOMContentLoaded", () => {
  cargarDestacados();
});

function cargarDestacados() {
  fetch("http://localhost:3000/disfraces")
    .then(res => res.json())
    .then(disfraces => {
      const aleatorios = disfraces
        .sort(() => 0.5 - Math.random())
        .slice(0, 6);

      mostrarDisfraces(aleatorios, "destacados");

      mostrarDisfraces(disfraces, "resultados");
    });
}

function filtrar() {
  const nombre = document.getElementById("filtroNombre").value;
  const estado = document.getElementById("filtroEstado").value;

  fetch(`http://localhost:3000/disfraces/filtro?nombre=${nombre}&estado=${estado}`)
    .then(res => res.json())
    .then(data => {
      mostrarDisfraces(data, "resultados");
    });
}

function mostrarDisfraces(lista, contenedorId) {
  const contenedor = document.getElementById(contenedorId);
  contenedor.innerHTML = "";

  if (lista.length === 0) {
    contenedor.innerHTML = "<p>No se encontraron disfraces</p>";
    return;
  }

  lista.forEach(d => {
    contenedor.innerHTML += `
      <div class="tarjeta">
        <img src="http://localhost:3000/uploads/${d.imagen}">
        <h3>${d.nombre}</h3>
        <p>${d.descripcion}</p>
        <p>$${d.precio}</p>
        <p><strong>${d.estado}</strong></p>

        <button onclick="irReservar(${d.id})">Reservar</button>
      </div>
    `;
  });
}

function irReservar(id) {
  localStorage.setItem("disfrazSeleccionado", id);
  window.location.href = "reserva.html";
}