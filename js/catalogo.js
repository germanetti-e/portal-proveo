/* =======================================================
   PROVEO
   Catálogo dinámico
======================================================= */

/* ==========================
   CONFIGURACIÓN
========================== */

const API_URL = "https://script.google.com/macros/s/AKfycbxEoH-PFVJTjR0tdug3EedfioGxxAm1a-Ed1SU4na5qNiuLe_QFl1qaOL_an-C7eXF8bg/exec";

/* ==========================
   VARIABLES
========================== */

let catalogo = [];

/* ==========================
   CARGAR CATÁLOGO
========================== */

async function cargarCatalogo() {

    try {

        const respuesta = await fetch(API_URL);

        catalogo = await respuesta.json();

        // ==========================
        // SOLO PRODUCTOS ACTIVOS
        // ==========================

        catalogo = catalogo.filter(producto =>
            String(producto.Activo).trim().toUpperCase() === "SI"
        );

        // ==========================
        // ORDEN DEL CATÁLOGO
        // ==========================

        catalogo.sort((a, b) =>
            Number(a.orden || 9999) - Number(b.orden || 9999)
        );

        // ==========================
        // SI EXISTE UNA CATEGORÍA EN LA URL
        // ==========================

        const parametros = new URLSearchParams(window.location.search);

        const categoria = parametros.get("categoria");

        let productosMostrar = catalogo;

        if (categoria) {

            productosMostrar = catalogo.filter(producto =>
                producto.categoria === categoria
            );

            // Cambiar título de la página
            const titulo = document.getElementById("category-title");

            if (titulo) {

                titulo.textContent = categoria;

            }

            // Cambiar título del navegador
            document.title = `${categoria} | Proveo`;

            // Cambiar descripción
            const descripcion = document.getElementById("category-description");

            if (descripcion) {

                descripcion.textContent = `Productos de ${categoria}.`;

            }

        }

        if (document.getElementById("products")) {

            mostrarProductos(productosMostrar);

        }

    } catch (error) {

        console.error("Error cargando catálogo:", error);

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

    activarBotones();

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
                Pedido mínimo: ${producto.pedido_minimo} unidades
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

function activarBotones() {

    console.log("Activando botones...");

    const botones = document.querySelectorAll(".add-button");

    console.log("Botones encontrados:", botones.length);

    botones.forEach(boton => {

        boton.addEventListener("click", () => {

            agregarProducto(boton.dataset.producto);

        });

    });

}
