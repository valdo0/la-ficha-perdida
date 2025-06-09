document.addEventListener('DOMContentLoaded', function() {
    actualizarCarrito();
});

function actualizarCarrito() {
    const listaCarrito = document.getElementById('cartList');
    const totalPriceElement = document.getElementById('totalPrice');
    const sesion = JSON.parse(localStorage.getItem('session'));
    const buttonComprar = document.getElementById('btnComprar');
    if (!sesion || !sesion.usuario) {
        alert('Por favor, inicia sesión para ver el carrito.');
        window.location.href = 'login.html';
        return;
    }
    const carrito = JSON.parse(localStorage.getItem('carrito_' + sesion.usuario)) || [];
    if (carrito.length === 0) {
        listaCarrito.innerHTML = '<p>El carrito está vacío.</p>';
        totalPriceElement.textContent = 'Total: $0';
        buttonComprar.disabled = true;
        return;
    }
    listaCarrito.innerHTML = '';
    let totalPrice = 0;
    carrito.forEach(item => {
        const tr = document.createElement('tr');

        const tdNombre = document.createElement('td');
        tdNombre.textContent = item.nombre;

        const tdCantidad = document.createElement('td');
        const btnIncrementar = document.createElement('button');
        btnIncrementar.textContent = '+';
        btnIncrementar.classList.add('btn', 'btn-success', 'btn-sm', 'mx-1');
        btnIncrementar.addEventListener('click', () => {
            item.cantidad++;
            localStorage.setItem('carrito_' + sesion.usuario, JSON.stringify(carrito));
            actualizarCarrito();
        });

        const btnDecrementar = document.createElement('button');
        btnDecrementar.textContent = '-';
        btnDecrementar.classList.add('btn', 'btn-danger', 'btn-sm', 'mx-1');
        btnDecrementar.addEventListener('click', () => {
            if (item.cantidad > 1) {
            item.cantidad--;
            localStorage.setItem('carrito_' + sesion.usuario, JSON.stringify(carrito));
            actualizarCarrito();
            }
        });

        tdCantidad.appendChild(btnIncrementar);
        tdCantidad.appendChild(document.createTextNode(' ' + item.cantidad + ' '));
        tdCantidad.appendChild(btnDecrementar);

        const tdPrecio = document.createElement('td');
        tdPrecio.textContent = `$${item.precio}`;

        const tdAcciones = document.createElement('td');
        const btnEliminar = document.createElement('button');
        btnEliminar.textContent = 'Eliminar';
        btnEliminar.classList.add('btn', 'btn-danger', 'btn-sm');
        btnEliminar.addEventListener('click', () => {
            eliminarDelCarrito(item.nombre);
        });
        tdAcciones.appendChild(btnEliminar);

        tr.appendChild(tdNombre);
        tr.appendChild(tdCantidad);
        tr.appendChild(tdPrecio);
        tr.appendChild(tdAcciones);

        listaCarrito.appendChild(tr);
        totalPrice += item.precio * item.cantidad;
    });
    totalPriceElement.textContent = `Total: $${totalPrice}`;
}

function agregarAlCarrito(juego, precio) {
    const sesion = JSON.parse(localStorage.getItem('session'));
    if (!sesion || !sesion.usuario) {
        alert('Por favor, inicia sesión para agregar juegos al carrito.');
        window.location.href = 'login.html';
        return;
    }
    if(sesion.tipo !== 'usuario') {
        Swal.fire({
            icon: 'error',
            title: 'Acceso Denegado',
            text: 'Solo los usuarios pueden agregar juegos al carrito.',
            confirmButtonText: 'Aceptar'
        });
        return;
    }
    let carrito = JSON.parse(localStorage.getItem('carrito_' + sesion.usuario)) || [];
    if (carrito) {
        const juegoExistente = carrito.find(item => item.nombre === juego);
        if (juegoExistente) {
            Swal.fire({
                toast: true,
                position: 'top-end',
                icon: 'info',
                text: 'El juego ya está en el carrito.',
                showConfirmButton: false,
                timer: 2000,
                timerProgressBar: true,
              });
            return;
        }
    }
    const juegoAAgregar = {
        nombre: juego,
        precio: precio,
        cantidad: 1
    };
    carrito.push(juegoAAgregar);
    localStorage.setItem('carrito_' + sesion.usuario, JSON.stringify(carrito));

    Swal.fire({
        toast: true,
        position: 'top-end',
        icon: 'success',
        title: 'Agregado al carrito',
        text: 'El juego fue agregado correctamente.',
        showConfirmButton: false,
        timer: 2000,
        timerProgressBar: true,
      });
    actualizarCarrito();
}

function eliminarDelCarrito(juego) {
    const sesion = JSON.parse(localStorage.getItem('session'));
    let carrito = JSON.parse(localStorage.getItem('carrito_' + sesion.usuario)) || [];
    const indice = carrito.findIndex(item => item.nombre === juego);
    if (indice !== -1) {
        carrito.splice(indice, 1);
        localStorage.setItem('carrito_' + sesion.usuario, JSON.stringify(carrito));
        actualizarCarrito();
    }
}

function finalizarCompra(){
    const sesion = JSON.parse(localStorage.getItem('session'));
    const compras = JSON.parse(localStorage.getItem('compras')) || [];
    if (!compras) {
        localStorage.setItem('compras', JSON.stringify([]));
    }
    if (!sesion || !sesion.usuario) {
        alert('Por favor, inicia sesión para finalizar la compra.');
        window.location.href = 'login.html';
        return;
    }
    let carrito = JSON.parse(localStorage.getItem('carrito_' + sesion.usuario)) || [];
    if (carrito.length === 0) {
        alert('El carrito está vacío. Agrega juegos antes de comprar.');
        return;
    }
    const compra = {
        usuario: sesion.usuario,
        juegos: carrito,
        fecha: new Date().toLocaleString()
    };
    compras.push(compra);
    localStorage.setItem('compras', JSON.stringify(compras));
    Swal.fire({
        title: 'Compra realizada',
        text: 'Gracias por tu compra, ' + sesion.usuario + '!',
        icon: 'success',
        confirmButtonText: 'Aceptar'
    }).then(() => {
        localStorage.removeItem('carrito_' + sesion.usuario);
        actualizarCarrito();
    });
}