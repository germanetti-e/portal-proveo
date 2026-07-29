/* ==========================
   CARGAR CARRITO
========================== */

function cargarCarrito(){

    const carrito = JSON.parse(
        localStorage.getItem("carrito")
    );

    return carrito || [];

}

/* ==========================
   GUARDAR CARRITO
========================== */

function guardarCarrito(){

    localStorage.setItem(
        "carrito",
        JSON.stringify(carrito)
    );

}
