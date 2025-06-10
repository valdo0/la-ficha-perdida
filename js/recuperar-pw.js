document.addEventListener("DOMContentLoaded", () => {
    const formulario = document.getElementById('form-recuperar-pw');
    if(formulario){
        formulario.addEventListener("submit", function(e){
            e.preventDefault();
            if(validarFormularioRecuperar()){
                const usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];
                const username = document.getElementById("username").value;
                const usuario_encontrado = usuarios.find(usuario => usuario.usuario === username);

                if (!usuario_encontrado) {
                    Swal.fire({
                        icon: "error",
                        title: "Error de recuperación",
                        text: "El usuario no se encuentra registrado.",
                        confirmButtonText: "Aceptar"
                    });
                    return;
                }
                usuario_encontrado.password = document.getElementById("password").value;
                localStorage.setItem("usuarios", JSON.stringify(usuarios));
                formulario.reset();
                Swal.fire({
                    icon: "success",
                    title: "Recuperación exitosa",
                    text: "Se ha cambiado su contraseña con exito.",
                    confirmButtonText: "Aceptar"
                }).then(() => {
                    formulario.reset();
                    window.location.href = "login.html";
                });
            }

        });
    }
});