/* ==========================
   CARGAR CARRITO
========================== */

function cargarCarrito(){

    const carrito = JSON.parse(localStorage.getItem("carrito"));

    return carrito || [];

}

/* ==========================
   CONTADOR DEL CARRITO
========================== */

function actualizarContadorCarrito(){

    const contador = document.getElementById("cart-counter");

    if(!contador) return;

    const carrito = cargarCarrito();

    const total = carrito.reduce((suma, producto) => {

        return suma + Number(producto.cantidad);

    }, 0);

    contador.textContent = total;

}

/* ==========================
   INICIAR HEADER
========================== */

document.addEventListener("DOMContentLoaded", () => {

    actualizarContadorCarrito();

});
