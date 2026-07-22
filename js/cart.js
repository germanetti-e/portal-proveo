/* =======================================================
   PROVEO
   Mi abastecimiento
======================================================= */


/* ==========================
   VARIABLES
========================== */

let catalogo = [];

let carrito = [];


/* ==========================
   INICIALIZACIÓN
========================== */

async function iniciarCart(){

    await cargarCatalogo();

    console.log("Catálogo:", catalogo);

    console.log("Carrito:", carrito);

}

iniciarCart();


/* ==========================
   CATÁLOGO
========================== */

async function cargarCatalogo(){

    try{

        const respuesta = await fetch(API_URL);

        catalogo = await respuesta.json();

    }

    catch(error){

        console.error(error);

    }

}


/* ==========================
   AGREGAR PRODUCTO
========================== */

function agregarProducto(nombreProducto){

    console.log("Producto recibido:", nombreProducto);

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
