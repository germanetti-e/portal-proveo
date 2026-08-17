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
   CONTADOR DEL CARRITO
========================== */

function actualizarContadorCarrito(){

    const contador =
        document.getElementById("cart-counter");

    if(!contador) return;

    const carrito = cargarCarrito();

    const total = carrito.reduce(
        (suma, producto) => {

            return suma + Number(producto.cantidad);

        },
        0
    );

    contador.textContent = total;

}


/* ==========================
   MENÚ HAMBURGUESA
========================== */

function activarMenu(){

    const boton =
        document.getElementById("menu-button");

    const menu =
        document.getElementById("side-menu");

    const cerrar =
        document.getElementById("menu-close");

    const overlay =
        document.getElementById("menu-overlay");


    if(
        !boton ||
        !menu ||
        !cerrar ||
        !overlay
    ){

        return;

    }


    /* ==========================
       ABRIR
    ========================== */

    boton.addEventListener("click", () => {

        menu.classList.add("active");

        overlay.classList.add("active");

        document.body.classList.add("menu-open");

    });


    /* ==========================
       CERRAR
    ========================== */

    cerrar.addEventListener("click", cerrarMenu);

    overlay.addEventListener("click", cerrarMenu);


    function cerrarMenu(){

        menu.classList.remove("active");

        overlay.classList.remove("active");

        document.body.classList.remove("menu-open");

    }


    /* ==========================
       CERRAR AL ELEGIR OPCIÓN
    ========================== */

    const enlaces =
        menu.querySelectorAll("a");

    enlaces.forEach(enlace => {

        enlace.addEventListener(
            "click",
            cerrarMenu
        );

    });

}


/* ==========================
   INICIAR HEADER
========================== */

document.addEventListener(
    "DOMContentLoaded",
    () => {

        actualizarContadorCarrito();

        activarMenu();

    }
);
