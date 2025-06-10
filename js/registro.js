document.addEventListener("DOMContentLoaded", () => {
    const formulario = document.getElementById('form-registro');
    if (formulario) {
        formulario.addEventListener("submit", function(e){
            e.preventDefault();
            if (validarFormulario()) {
                const usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];
                const nuevoUsuario = {
                    usuario: document.getElementById("username").value,
                    nombre: document.getElementById("nombre").value,
                    fecha_nacimiento: document.getElementById("fecha-nacimiento").value,
                    direccion: document.getElementById("direccion").value,
                    email: document.getElementById("email").value,
                    password: document.getElementById("password").value,
                    tipo: "usuario"
                };

                const existe = usuarios.some(usuario => usuario.usuario === nuevoUsuario.usuario || usuario.email === nuevoUsuario.email);
                if (existe) {
                    Swal.fire({
                        icon: "error",
                        title: "Error de registro",
                        text: "El usuario o el correo ya están registrados.",
                        confirmButtonText: "Aceptar"
                    });
                    return;
                }
                usuarios.push(nuevoUsuario);
                localStorage.setItem("usuarios", JSON.stringify(usuarios));
                Swal.fire({
                    icon: "success",
                    title: "Registro exitoso",
                    text: "Usuario registrado correctamente.",
                    confirmButtonText: "Aceptar"
                }).then(() => {
                    formulario.reset();
                    window.location.href = "login.html";
                });
            }
        })
    }

});