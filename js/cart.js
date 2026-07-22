/* =======================================================
   PROVEO
   Mi abastecimiento
======================================================= */


/* ==========================
   VARIABLES
========================== */


let carrito = [];

/* ==========================
   CARGAR CARRITO
========================== */

function cargarCarrito(){

    const carritoGuardado = localStorage.getItem("carrito");

    if(carritoGuardado){

        carrito = JSON.parse(carritoGuardado);

    }

    console.log("Carrito cargado:", carrito);

}

/* ==========================
   AGREGAR PRODUCTO
========================== */

function agregarProducto(nombreProducto){

    const producto = catalogo.find(
        item => item.imagen === nombreProducto
    );

    if(!producto){
        return;
    }

    const productoExistente = carrito.find(
        item => item.codigo === producto.codigo
    );

    console.log("Producto encontrado:", productoExistente);

    if(productoExistente){

        productoExistente.cantidad++;

    }else{

        carrito.push({
            codigo: producto.codigo,
            cantidad: 1
        });

    }

    guardarCarrito();

    console.log(
        JSON.parse(JSON.stringify(carrito))
    );

}

/* ==========================
   LOCAL STORAGE
========================== */

function guardarCarrito(){

    console.log("Guardando carrito...");

    localStorage.setItem(
        "carrito",
        JSON.stringify(carrito)
    );

    console.log(
        localStorage.getItem("carrito")
    );

}

/* ==========================
   INICIALIZAR
========================== */

async function iniciarCarrito(){

    await cargarCatalogo();

    cargarCarrito();

    console.log("Catálogo:", catalogo);

    console.log("Carrito:", carrito);

}

iniciarCarrito();
