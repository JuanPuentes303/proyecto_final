document.getElementById("formDisfraz").addEventListener("submit", e => {
  e.preventDefault();

  console.log("Enviando formulario...");

  const formData = new FormData(e.target);

  fetch("http://localhost:3000/admin/disfraz", {
    method: "POST",
    body: formData
  })
  .then(res => res.text())
  .then(data => {
    console.log(data);
    alert(data);
  })
  .catch(err => console.error(err));
});