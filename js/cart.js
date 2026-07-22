/* =======================================================
   PROVEO
   Mi abastecimiento
======================================================= */


/* ==========================
   VARIABLES
========================== */


let carrito = [];


/* ==========================
   AGREGAR PRODUCTO
========================== */

function agregarProducto(nombreProducto){

    const producto = catalogo.find(item => item.imagen === nombreProducto);

    if(!producto){
        return;
    }

    carrito.push(producto);

    console.log(carrito);

}

/* ==========================
   ELIMINAR PRODUCTO
========================== */

function eliminarProducto(codigo){

}


/* ==========================
   CAMBIAR CANTIDAD
========================== */

function aumentarCantidad(codigo){

}


function disminuirCantidad(codigo){

}


/* ==========================
   TOTALES
========================== */

function calcularTotales(){

}


/* ==========================
   INTERFAZ
========================== */

function actualizarPantalla(){

}


/* ==========================
   ENVIAR SOLICITUD
========================== */

function enviarSolicitud(){

}
