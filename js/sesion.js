document.addEventListener("DOMContentLoaded", () => {
    const sesion = JSON.parse(localStorage.getItem("session"));

    const nav = document.getElementsByClassName("nav-links")[0];

    if(!nav) {
        console.log("No se encontró el menú de navegación");
        return;
    }
    console.log(nav)
    let links = `
        <li><a href="index.html#inicio">Inicio</a></li>
        <li><a href="index.html#juegos">Juegos</a></li>
        <li><a href="index.html#novedades">Novedades</a></li>
        <li><a href="index.html#contacto">Contacto</a></li>
    `;

    if(sesion?.loqueago){
        if(sesion.tipo === "admin"){
            links += `
                <li><a href="admin.html">Administración</a></li>
                <li><a href="#" id="cerrar-sesion">Cerrar Sesión</a></li>
            `;
        }else{
            links += `
                <li><a href="perfil.html">Perfil</a></li>
                <li><a href="carrito.html">Carrito</a></li>
                <li><a href="#" id="cerrar-sesion">Cerrar Sesión</a></li>
            `;
        }
    }else{
        links += `
            <li><a href="login.html">Iniciar Sesión</a></li>
        `;
    }

    nav.innerHTML = links;


    const cerrarSesionBtn = document.querySelector("#cerrar-sesion");
    if(cerrarSesionBtn) {
        cerrarSesionBtn.addEventListener("click",(e)=>{
            e.preventDefault();
            localStorage.removeItem("session");
            window.location.href = "index.html";
        })
    }
});