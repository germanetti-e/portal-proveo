/* =======================================================
   PROVEO
   Catálogo dinámico
======================================================= */

/* ==========================
   CONFIGURACIÓN
========================== */

const API_URL = "TU_URL_DEL_APPS_SCRIPT";

/* ==========================
   CARGAR CATÁLOGO
========================== */

async function cargarCatalogo(){

    try{

        const respuesta = await fetch(API_URL);

        const productos = await respuesta.json();

        mostrarProductos(productos);

    }

    catch(error){

        console.error(error);

    }

}

/* ==========================
   MOSTRAR PRODUCTOS
========================== */

function mostrarProductos(productos){

    const contenedor = document.getElementById("products");

    contenedor.innerHTML = "";

    productos.forEach(producto=>{

        contenedor.innerHTML += crearTarjeta(producto);

    });

}

/* ==========================
   CREAR TARJETA
========================== */

function crearTarjeta(producto){

    return `

<article class="product-card">

    <div class="product-image">

        <img src="assets/saboriemos_pets/${producto.imagen}.png">

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
            data-producto="${producto.codigo}">

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
