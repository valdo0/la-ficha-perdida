document.addEventListener("DOMContentLoaded", () => {
    const sesion = JSON.parse(localStorage.getItem("session"));
  
    if (!sesion || sesion.tipo !== "usuario") {
      window.location.href = "index.html";
      return;
    }
  
    const container = document.getElementById("perfilUsuarioContainer");
  
    container.innerHTML = `
      <h2 class="mb-4">Perfil de Usuario</h2>
      <div class="card">
        <div class="card-body">
          <h5 class="card-title">${sesion.nombre || "Sin nombre"}</h5>
          <p class="card-text"><strong>Correo:</strong> ${sesion.email}</p>
          <p class="card-text"><strong>Usuario:</strong> ${sesion.usuario}</p>
          <button class="btn btn-primary me-2" onclick="abrirModalEditarPerfil()">Editar Perfil</button>
          <button class="btn btn-danger" onclick="cerrarSesion()">Cerrar Sesión</button>
        </div>
      </div>
    `;
  
    // Prellenar el modal al abrir
    const formEditar = document.getElementById("formEditarPerfil");
    formEditar.addEventListener("submit", (e) => {
      e.preventDefault();
      const nuevoNombre = document.getElementById("editNombre").value;
      const nuevoEmail = document.getElementById("editEmail").value;
      const nuevoUsuario = document.getElementById("editUsuario").value;
  
      const nuevaSesion = {
        ...sesion,
        nombre: nuevoNombre,
        email: nuevoEmail,
        usuario: nuevoUsuario
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
    if (!sesion) return;
  
    document.getElementById("editNombre").value = sesion.nombre || "";
    document.getElementById("editEmail").value = sesion.email || "";
    document.getElementById("editUsuario").value = sesion.usuario || "";
  
    const modal = new bootstrap.Modal(document.getElementById("modalEditarPerfil"));
    modal.show();
  }
  