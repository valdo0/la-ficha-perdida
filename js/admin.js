document.addEventListener("DOMContentLoaded", () => {
    const sesion = JSON.parse(localStorage.getItem("session"));

    const usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];

    if (!sesion || sesion.tipo !== "admin") {
        window.location.href = "login.html";
        return;
    }

    cargarUsuarios();
});
function activateTab(button, tabId) {
    document.querySelectorAll('.nav-link').forEach(btn => btn.classList.remove('active'));
    
    button.classList.add('active');

    document.querySelectorAll('.tab-content').forEach(tab => {
        tab.classList.add('d-none');
    });

    const selectedTab = document.getElementById(tabId);
    if (selectedTab) {
        selectedTab.classList.remove('d-none');
    }
}
function cargarUsuarios() {

    const usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];

    const tabla = document.getElementById("userTableBody");
    tabla.innerHTML = "";

    usuarios.forEach((user, index) => {
        const fila = document.createElement("tr");


        fila.innerHTML = `
      <td>${user.nombre || "-"}</td>
      <td>${user.email}</td>
      <td>${user.usuario || "-"}
      <td>${user.tipo}
      <td>
        <button class="btn btn-warning btn-sm me-2" onclick="editarUsuario(${index})">Editar</button>
        <button class="btn btn-danger btn-sm" onclick="eliminarUsuario(${index})">Eliminar</button>
      </td>
    `;

        tabla.appendChild(fila);
    });
}
function editarUsuario(index) {
    const usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];
    const user = usuarios[index];
  
    document.getElementById("editIndex").value = index;
    document.getElementById("editNombre").value = user.nombre || "";
    document.getElementById("editEmail").value = user.email || "";
    document.getElementById("editUsuario").value = user.usuario || "";
    document.getElementById("editTipo").value = user.tipo || "usuario";
  
    const modal = new bootstrap.Modal(document.getElementById("modalEditarUsuario"));
    modal.show();
  }
  function guardarCambiosUsuario() {
    const index = parseInt(document.getElementById("editIndex").value);
    const nombre = document.getElementById("editNombre").value.trim();
    const email = document.getElementById("editEmail").value.trim();
    const usuario = document.getElementById("editUsuario").value.trim();
    const tipo = document.getElementById("editTipo").value;
  
    const usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];
  
    usuarios[index] = {
      ...usuarios[index],
      nombre,
      email,
      usuario,
      tipo
    };
  
    localStorage.setItem("usuarios", JSON.stringify(usuarios));
  
    const modal = bootstrap.Modal.getInstance(document.getElementById("modalEditarUsuario"));
    modal.hide();
  
    cargarUsuarios();
  }
  function eliminarUsuario(index) {
      const usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];
    
      Swal.fire({
        title: '¿Estás seguro?',
        text: "No podrás deshacer esta acción",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Sí, eliminar'
      }).then((result) => {
        if (result.isConfirmed) {
          usuarios.splice(index, 1);
          localStorage.setItem("usuarios", JSON.stringify(usuarios));
          cargarUsuarios();
          Swal.fire(
            'Eliminado!',
            'El usuario ha sido eliminado.',
            'success'
          );
        }
      });
  }