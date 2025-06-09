document.addEventListener("DOMContentLoaded", () => {
    const usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];

    const existeAdmin = usuarios.some(usuario => usuario.email === "admin@lafichaperdida.cl");
    if (!existeAdmin) {
        usuarios.push({
            nombre: "Administrador",
            usuario: "admin",
            password: "Admin123",
            email: "admin@lafichaperdida.cl",
            tipo: "admin"
        });
        localStorage.setItem("usuarios", JSON.stringify(usuarios));
    }

});

function login(usuario, password) {
    const usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];
    const usuarioEncontrado = usuarios.find(u => u.usuario === usuario && u.password === password);
    if (usuarioEncontrado) {
        console.log("Usuario encontrado:", usuarioEncontrado);
        const session = {
            nombre: usuarioEncontrado.nombre,
            usuario: usuarioEncontrado.usuario,
            email: usuarioEncontrado.email,
            tipo: usuarioEncontrado.tipo,
            loqueago: true
        };
        localStorage.setItem("session", JSON.stringify(session));
        window.location.href = "index.html";
    } else {
        Swal.fire({
            icon: "error",
            title: "Error de inicio de sesión",
            text: "Correo o contraseña incorrectos.",
            confirmButtonText: "Aceptar"
        });
    }
}

document.addEventListener("DOMContentLoaded", () => {
    const loginForm = document.getElementById("form-login");
    if (loginForm) {
        loginForm.addEventListener("submit", (e) => {
            e.preventDefault();
            const usuario = document.getElementById("username").value;
            const password = document.getElementById("password").value;

            if (usuario && password) {
                login(usuario, password);
            } else {
                Swal.fire({
                    icon: "error",
                    title: "Campos incompletos",
                    text: "Por favor, complete todos los campos.",
                    confirmButtonText: "Aceptar"
                });
            }
        });
    }

});