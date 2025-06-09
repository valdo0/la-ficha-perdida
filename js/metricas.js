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