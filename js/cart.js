/* =======================================================
   PROVEO
   Mi abastecimiento
======================================================= */


/* ==========================
   CONFIGURACIÓN
========================== */

const API_URL = "https://script.google.com/macros/s/AKfycbxEoH-PFVJTjR0tdug3EedfioGxxAm1a-Ed1SU4na5qNiuLe_QFl1qaOL_an-C7eXF8bg/exec";


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

function agregarProducto(codigo){

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
