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

    const productoExistente = carrito.find(
        item => item.imagen === nombreProducto
    );

    console.log("Producto encontrado:", productoExistente);

    if(productoExistente){

        productoExistente.cantidad++;

    }else{

        carrito.push({
            ...producto,
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

    localStorage.setItem(
        "carrito",
        JSON.stringify(carrito)
    );

}
