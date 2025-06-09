let salesChartInstance;

function cargarMetricas() {
  const compras = JSON.parse(localStorage.getItem('compras')) || [];
  const meses = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];
  const ventasPorMes = new Array(12).fill(0);

  function obtenerMesDesdeFecha(fechaTexto) {
    const [fecha, hora] = fechaTexto.split(',');
    const [dia, mes, anio] = fecha.trim().split('/').map(num => parseInt(num));
    return mes - 1;
  }

  compras.forEach(compra => {
    const mes = obtenerMesDesdeFecha(compra.fecha);
    const totalCompra = compra.juegos.reduce((acc, juego) => acc + (juego.precio * juego.cantidad), 0);
    ventasPorMes[mes] += totalCompra;
  });

  const canvas = document.getElementById('salesChart');
  const ctx = canvas.getContext('2d');

  if (salesChartInstance) {
    salesChartInstance.destroy();
  }

  salesChartInstance = new Chart(ctx, {
    type: 'line',
    data: {
      labels: meses,
      datasets: [{
        label: 'Ventas ($)',
        data: ventasPorMes,
        backgroundColor: 'rgba(255, 99, 132, 0.2)',
        borderColor: 'rgba(255, 99, 132, 1)',
        fill: true,
        tension: 0.3
      }]
    },
    options: {
      responsive: true,
      scales: {
        y: { beginAtZero: true }
      }
    }
  });
}

// 🔁 Ejecutar después de que el DOM esté listo
document.addEventListener('DOMContentLoaded', cargarMetricas);
