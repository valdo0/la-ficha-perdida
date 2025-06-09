document.addEventListener("DOMContentLoaded", () => {
    const sesion = JSON.parse(localStorage.getItem("session"));

    const usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];

    if (!sesion || sesion.tipo !== "admin") {
        window.location.href = "login.html";
        return;
    }

    cargarUsuarios();
    cargarMetricas();
});

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

function cargarMetricas() {
    const meses = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio'];

    new Chart(document.getElementById('userChart'), {
        type: 'bar',
        data: {
            labels: meses,
            datasets: [{
                label: 'Usuarios',
                data: [10, 25, 40, 32, 50, 70],
                backgroundColor: 'rgba(54, 162, 235, 0.6)',
                borderColor: 'rgba(54, 162, 235, 1)',
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });

    new Chart(document.getElementById('salesChart'), {
        type: 'line',
        data: {
            labels: meses,
            datasets: [{
                label: 'Ventas ($)',
                data: [1200, 2000, 1500, 1800, 2400, 3000],
                backgroundColor: 'rgba(255, 99, 132, 0.2)',
                borderColor: 'rgba(255, 99, 132, 1)',
                fill: true,
                tension: 0.3
            }]
        },
        options: {
            responsive: true,
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });
}