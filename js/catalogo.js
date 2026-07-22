/* =======================================================
   PROVEO
   Catálogo dinámico
======================================================= */

/* ==========================
   CONFIGURACIÓN
========================== */

const API_URL = "https://script.google.com/macros/s/AKfycbxEoH-PFVJTjR0tdug3EedfioGxxAm1a-Ed1SU4na5qNiuLe_QFl1qaOL_an-C7eXF8bg/exec";


/* ==========================
   CARGAR CATÁLOGO
========================== */

async function cargarCatalogo() {

    try {

        const respuesta = await fetch(API_URL);

        const productos = await respuesta.json();

        mostrarProductos(productos);

    } catch (error) {

        console.error("Error cargando catálogo:", error);

    }

}


/* ==========================
   MOSTRAR PRODUCTOS
========================== */

function mostrarProductos(productos) {

    const contenedor = document.getElementById("products");

    contenedor.innerHTML = "";

    productos.forEach(producto => {

        contenedor.innerHTML += crearTarjeta(producto);

    });

}


/* ==========================
   CREAR TARJETA
========================== */

function crearTarjeta(producto) {

    return `

    <article class="product-card">

        <div class="product-image">

            <img
                src="assets/saboriemos_pets/${producto.imagen}.png"
                alt="${producto.nombre}">

        </div>

        <div class="product-info">

            <h2>${producto.nombre}</h2>

            <p class="product-price">
                $ ${Number(producto.precio_sin_iva).toLocaleString("es-CO")}
            </p>

            <p class="product-unit">
                Unidad de venta: ${producto.unidad_de_venta}
            </p>

            <p class="product-minimum">
                Pedido mínimo: ${producto.pedido_minimo}
            </p>

            <button
                class="add-button"
                data-producto="${producto.imagen}">

                Agregar

            </button>

        </div>

    </article>

    `;

}


/* ==========================
   INICIAR
========================== */

cargarCatalogo();
/* ==========================
   BOTONES AGREGAR
========================== */

const botonesAgregar = document.querySelectorAll(".add-button");

botonesAgregar.forEach(boton => {

    boton.addEventListener("click", () => {

        const producto = boton.dataset.producto;

        console.log(producto);

    });

});
