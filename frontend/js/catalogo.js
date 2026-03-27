function cargarDisfraces() {
  fetch("http://localhost:3000/disfraces")
    .then(res => res.json())
    .then(data => mostrar(data));
}

function filtrar() {
  const nombre = document.getElementById("filtroNombre").value;
  const estado = document.getElementById("filtroEstado").value;

  fetch(`http://localhost:3000/disfraces/filtro?nombre=${nombre}&estado=${estado}`)
    .then(res => res.json())
    .then(data => mostrar(data));
}

function mostrar(disfraces) {
  const lista = document.getElementById("lista");
  lista.innerHTML = "";

  disfraces.forEach(d => {
    lista.innerHTML += `
      <div class="card">
        <h3>${d.nombre}</h3>
        <img src="http://localhost:3000/uploads/${d.imagen}" width="150">
        <p>${d.descripcion}</p>
        <p>$${d.precio}</p>
        <p>${d.estado}</p>

        <button onclick="irReservar(${d.id})">Reservar</button>
      </div>
    `;
  });
}

function irReservar(id) {
  localStorage.setItem("disfrazSeleccionado", id);
  window.location.href = "reserva.html";
}

cargarDisfraces();