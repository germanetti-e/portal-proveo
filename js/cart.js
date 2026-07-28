/* =======================================================
   PROVEO
   Mi abastecimiento
======================================================= */


/* ==========================
   VARIABLES
========================== */


let carrito = [];

/* ==========================
   PEDIDO MÍNIMO
========================== */

function obtenerPedidoMinimo(producto){

    return parseInt(producto.pedido_minimo) || 1;

}

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

    // Obtiene el pedido mínimo del catálogo
    // Funciona con "2", "2 unidades", "1 docena", etc.
    const minimo = obtenerPedidoMinimo(producto);

    const productoExistente = carrito.find(
        item => item.codigo === producto.codigo
    );

    console.log("Producto encontrado:", productoExistente);

    if(productoExistente){

        // Si ya existe, aumenta según el pedido mínimo
        productoExistente.cantidad += minimo;

    }else{

        // Si es la primera vez, agrega el pedido mínimo
        carrito.push({

            codigo: producto.codigo,

            cantidad: minimo

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
   CONSTRUIR CARRITO
========================== */

function construirCarrito(){

    const carritoCompleto = carrito.map(item => {

        const producto = catalogo.find(
            producto => producto.codigo == item.codigo
        );

        return {

            ...producto,

            cantidad: item.cantidad

        };

    });

    console.log("Carrito completo:");

    console.log(carritoCompleto);

   actualizarPantalla(carritoCompleto);

}

/* ==========================
   INICIALIZAR
========================== */

async function iniciarCarrito(){

    cargarCarrito();

    await cargarCatalogo();

    console.log("Catálogo:", catalogo);

    console.log("Carrito:", carrito);

    construirCarrito();

}

console.log("LocalStorage antes de iniciar:");

console.log(localStorage.getItem("carrito"));

iniciarCarrito();

/* ==========================
   ACTUALIZAR PANTALLA
========================== */

function actualizarPantalla(productos){

    const contenedor = document.getElementById("productos-carrito");

    contenedor.innerHTML = "";

    productos.forEach(producto => {

        contenedor.innerHTML += crearProductoCarrito(producto);

    });
   
   activarBotonesCarrito();

}

/* ==========================
   CREAR TARJETA
========================== */

function crearProductoCarrito(producto){

    return `

    <article class="cart-product">

        <div class="cart-product-image">

            <img
                src="assets/saboriemos_pets/${producto.imagen}.png"
                alt="${producto.nombre}">

        </div>

        <div class="cart-product-info">

            <h3>

                ${producto.nombre}

            </h3>

            <p class="cart-product-price">

                $${Number(producto.precio_sin_iva).toLocaleString("es-CO")}

            </p>

            <p class="cart-product-tax">

                + IVA

            </p>
<div class="cart-quantity">

    <button
        class="btn-restar"
        data-codigo="${producto.codigo}">

        -

    </button>

    <div class="quantity-info">

        <span class="quantity-text">

            ${obtenerUnidadTexto(producto)}

        </span>

    </div>

    <button
        class="btn-sumar"
        data-codigo="${producto.codigo}">

        +

    </button>

</div>
            
   

    </button>

</div>

        </div>

        <button
    class="delete-product"
    data-codigo="${producto.codigo}">

    <i class="fa-solid fa-trash"></i>

</button>

    </article>

    `;

}

/* ==========================
   TEXTO UNIDAD DE VENTA
========================== */

function obtenerUnidadTexto(producto){

    const cantidad = Number(producto.cantidad);

    const unidad = producto.unidad_de_venta.trim();

    // Si es singular
    if(cantidad === 1){

        return `${cantidad} ${unidad}`;

    }

    // Plurales especiales
    const plurales = {

        "Unidad": "Unidades",
        "Docena": "Docenas",
        "Caja": "Cajas",
        "Bolsa": "Bolsas",
        "Paquete": "Paquetes",
        "Bulto": "Bultos",
        "Display": "Displays",
        "Rollo": "Rollos",
        "Caneca": "Canecas",
        "Galón": "Galones",
        "Botella": "Botellas",
        "Frasco": "Frascos",
        "Lata": "Latas",
        "Saco": "Sacos"

    };

    const unidadPlural = plurales[unidad] || `${unidad}s`;

    return `${cantidad} ${unidadPlural}`;

}
/* ==========================
   BOTONES DEL CARRITO
========================== */

function activarBotonesCarrito(){

    const botonesSumar = document.querySelectorAll(".btn-sumar");

    const botonesRestar = document.querySelectorAll(".btn-restar");

    const botonesEliminar = document.querySelectorAll(".delete-product");

    botonesSumar.forEach(boton => {

        boton.addEventListener("click", () => {

            sumarProducto(boton.dataset.codigo);

        });

    });

    botonesRestar.forEach(boton => {

        boton.addEventListener("click", () => {

            restarProducto(boton.dataset.codigo);

        });

    });

    botonesEliminar.forEach(boton => {

        boton.addEventListener("click", () => {

            eliminarProducto(boton.dataset.codigo);

        });

    });

}
function sumarProducto(codigo){

    const producto = carrito.find(
        item => item.codigo == codigo
    );

    producto.cantidad++;

    guardarCarrito();

    construirCarrito();

}

function restarProducto(codigo){

    console.log("Restar:", codigo);

}

function eliminarProducto(codigo){

    console.log("Eliminar:", codigo);

}
