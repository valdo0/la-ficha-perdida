document.addEventListener("DOMContentLoaded", () => {
  const sesion = JSON.parse(localStorage.getItem("session"));

  if (!sesion || sesion.tipo !== "usuario") {
    window.location.href = "index.html";
    return;
  }

  const usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];
  const usuarioExistente = usuarios.find(u => u.usuario === sesion.usuario);
  if (!usuarioExistente) {
    Swal.fire({
      icon: 'error',
      title: 'Error',
      text: 'Usuario no encontrado',
      timer: 1500,
      showConfirmButton: false
    }).then(() => {
      window.location.href = "index.html";
    });
    return;
  }

  const container = document.getElementById("perfilUsuarioContainer");

  container.innerHTML = `
    <h2 class="mb-4">Perfil de Usuario</h2>
    <div class="card">
      <div class="card-body">
        <h5 class="card-title">${usuarioExistente.nombre || "Sin nombre"}</h5>
        <p class="card-text"><strong>Correo:</strong> ${usuarioExistente.email}</p>
        <p class="card-text"><strong>Usuario:</strong> ${usuarioExistente.usuario}</p>
        <p class="card-text"><strong>Dirección:</strong> ${usuarioExistente.direccion || "Sin dirección"}</p>
        <p class="card-text"><strong>Fecha de Nacimiento:</strong> ${usuarioExistente.fecha_nacimiento || "Sin fecha"}</p>
        <button class="btn btn-primary me-2" onclick="abrirModalEditarPerfil()">Editar Perfil</button>
        <button class="btn btn-danger" onclick="cerrarSesion()">Cerrar Sesión</button>
      </div>
    </div>
  `;

  // Prellenar el modal al abrir
  const formEditar = document.getElementById("formEditarPerfil");
  formEditar.addEventListener("submit", (e) => {
    e.preventDefault();
    if(!validarEditPerfil()){
      return;
    }
    const nuevoNombre = document.getElementById("editNombre").value;
    const nuevoEmail = document.getElementById("editEmail").value;
    const nuevaDireccion = document.getElementById("editDireccion").value;

    var correos = usuarios.map(u => u.email);
    if (correos.includes(nuevoEmail) && nuevoEmail !== usuarioExistente.email) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'El correo electrónico ya está en uso',
        timer: 1500,
        showConfirmButton: false
      });
      return;
    }

    usuarioExistente.nombre = nuevoNombre;
    usuarioExistente.email = nuevoEmail;
    usuarioExistente.direccion = nuevaDireccion;

    localStorage.setItem("usuarios", JSON.stringify(usuarios));

    const nuevaSesion = {
      ...sesion,
      nombre: nuevoNombre,
      email: nuevoEmail,
      direccion: nuevaDireccion,
    };
    localStorage.setItem("session", JSON.stringify(nuevaSesion));

    Swal.fire({
      icon: 'success',
      title: 'Perfil actualizado',
      text: 'Tus datos han sido actualizados correctamente',
      timer: 1500,
      showConfirmButton: false
    }).then(() => {
      location.reload();
    });
  });
});

function cerrarSesion() {
  Swal.fire({
    title: '¿Cerrar sesión?',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonText: 'Sí, salir',
    cancelButtonText: 'Cancelar'
  }).then((result) => {
    if (result.isConfirmed) {
      localStorage.removeItem("session");
      window.location.href = "login.html";
    }
  });
}

function abrirModalEditarPerfil() {
  const sesion = JSON.parse(localStorage.getItem("session"));
  const usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];
  const usuarioExistente = usuarios.find(u => u.usuario === sesion.usuario);

  if (!usuarioExistente) return;

  document.getElementById("editNombre").value = usuarioExistente.nombre || "";
  document.getElementById("editEmail").value = usuarioExistente.email || "";
  document.getElementById("editDireccion").value = usuarioExistente.direccion || "";


  const modal = new bootstrap.Modal(document.getElementById("modalEditarPerfil"));
  modal.show();
}