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
        // CATEGORÍA DESDE LA URL
        // ==========================

        const parametros = new URLSearchParams(window.location.search);

        const categoria = parametros.get("categoria");

        let productosMostrar = catalogo;

        if (categoria) {

            productosMostrar = catalogo.filter(producto =>
                producto.categoria === categoria
            );

            // ==========================
            // TÍTULO
            // ==========================

            const titulo = document.getElementById("category-title");

            if (titulo) {

                titulo.textContent = categoria;

            }

            document.title = `${categoria} | Proveo`;

            // ==========================
            // CONFIGURACIÓN DE CATEGORÍAS
            // ==========================

            const categorias = {

                "Novedades y promociones": {
                    icono: "fa-star",
                    descripcion: "Descubre nuestras promociones y novedades."
                },

                "Insumos, empaques y desechables": {
                    icono: "fa-box",
                    descripcion: "Todo lo que necesitas para la operación de tu negocio."
                },

                "Despensa": {
                    icono: "fa-basket-shopping",
                    descripcion: "Productos esenciales para tu despensa."
                },

                "Salsas": {
                    icono: "fa-bottle-droplet",
                    descripcion: "Salsas y aderezos."
                },

                "Condimentos y especias": {
                    icono: "fa-pepper-hot",
                    descripcion: "Condimentos y especias para tus preparaciones."
                },

                "Enlatados y conservas": {
                    icono: "fa-jar",
                    descripcion: "Enlatados y conservas."
                },

                "Mascotas": {
                    icono: "fa-bone",
                    descripcion: "Snacks y productos para mascotas."
                },

                "Bebidas y complementos": {
                    icono: "fa-mug-hot",
                    descripcion: "Bebidas y productos complementarios."
                },

                "Productos de limpieza": {
                    icono: "fa-pump-soap",
                    descripcion: "Productos para limpieza e higiene."
                }

            };

            const datosCategoria = categorias[categoria];

            if (datosCategoria) {

                const descripcion = document.getElementById("category-description");

                if (descripcion) {

                    descripcion.textContent = datosCategoria.descripcion;

                }

                const icono = document.getElementById("category-icon");

                if (icono) {

                    icono.className = `fa-solid ${datosCategoria.icono}`;

                }

            }

        }

        if (document.getElementById("products")) {

            mostrarProductos(productosMostrar);

        }

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
    src="assets/${producto.carpeta_imagen}/${producto.imagen}.png"
    alt="${producto.nombre}"
    loading="lazy">

        </div>

        <div class="product-info">

            <h2>${producto.nombre}</h2>

            <p class="product-price">

    $ ${Number(producto.precio_sin_iva).toLocaleString("es-CO")}

    ${
        Number(producto.iva) > 0
        ? `<span class="price-tax">+ IVA</span>`
        : ``
    }

</p>

            <p class="product-unit">
    Unidad de venta mínimo:
    <span class="product-highlight">
        ${producto.unidad_de_venta}
    </span>
</p>

<p class="product-minimum">
    Pedido mínimo:
    <span class="product-highlight">
        ${producto.pedido_minimo}
    </span>
    <span class="product-note">
        (<i class="fa-solid fa-arrow-up"></i> ver unidad de venta)
    </span>
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
