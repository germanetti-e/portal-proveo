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

    actualizarEstadoAbastecimiento(productos);

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

    // Validación por si llega un producto inválido
    if(!producto){

        return "0 Unidades";

    }

    // Cantidad
    const cantidad = Number(producto.cantidad || 0);

    // Unidad de venta
    const unidad = String(
        producto.unidad_de_venta || "Unidad"
    ).trim();

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

    // Singular
    if(cantidad === 1){

        return `1 ${unidad}`;

    }

    // Plural
    const unidadPlural = plurales[unidad] || `${unidad}s`;

    return `${cantidad} ${unidadPlural}`;

}
/* ==========================
   BOTONES DEL CARRITO
========================== */

function activarBotonesCarrito(){

    /* -------- SUMAR -------- */

    document.querySelectorAll(".btn-sumar").forEach(boton => {

        boton.addEventListener("click", () => {

            sumarProducto(boton.dataset.codigo);

        });

    });

    /* -------- RESTAR -------- */

    document.querySelectorAll(".btn-restar").forEach(boton => {

        boton.addEventListener("click", () => {

            restarProducto(boton.dataset.codigo);

        });

    });

    /* -------- ELIMINAR -------- */

    document.querySelectorAll(".delete-product").forEach(boton => {

        boton.addEventListener("click", () => {

            eliminarProducto(boton.dataset.codigo);

        });

    });

}

/* ==========================
   SUMAR PRODUCTO
========================== */

function sumarProducto(codigo){

    const itemCarrito = carrito.find(
        item => item.codigo == codigo
    );

    const productoCatalogo = catalogo.find(
        producto => producto.codigo == codigo
    );

    if(!itemCarrito || !productoCatalogo){
        return;
    }

    itemCarrito.cantidad += Number(productoCatalogo.pedido_minimo);

    guardarCarrito();

    construirCarrito();

}

/* ==========================
   RESTAR PRODUCTO
========================== */

function restarProducto(codigo){

    const itemCarrito = carrito.find(
        item => item.codigo == codigo
    );

    const productoCatalogo = catalogo.find(
        producto => producto.codigo == codigo
    );

    if(!itemCarrito || !productoCatalogo){
        return;
    }

    const minimo = Number(productoCatalogo.pedido_minimo);

    if(itemCarrito.cantidad > minimo){

        itemCarrito.cantidad -= minimo;

    }else{

        eliminarProducto(codigo);

        return;

    }

    guardarCarrito();

    construirCarrito();

}

/* ==========================
   ELIMINAR PRODUCTO
========================== */

function eliminarProducto(codigo){

    carrito = carrito.filter(
        item => item.codigo != codigo
    );

    guardarCarrito();

    construirCarrito();

}

/* ==========================
   ESTADO DE ABASTECIMIENTO
========================== */

function actualizarEstadoAbastecimiento(productos){

    // ==========================
    // SUBTOTAL
    // ==========================

    const subtotal = productos.reduce((total, producto) => {

        return total + (
            Number(producto.precio_sin_iva) *
            Number(producto.cantidad)
        );

    }, 0);

    document.getElementById("status-subtotal").textContent =
        `$${subtotal.toLocaleString("es-CO")}`;

    document.getElementById("summary-total").textContent =
        `$${subtotal.toLocaleString("es-CO")}`;

    // ==========================
    // BARRA DE PROGRESO
    // ==========================

    const pedidoMinimo = 100000;

    const envioGratis = 250000;

    let porcentaje = (subtotal / envioGratis) * 100;

    porcentaje = Math.min(porcentaje, 100);

    document.getElementById("progress-dot").style.left =
        `${porcentaje}%`;

    // ==========================
    // MENSAJES
    // ==========================

    const estado = document.getElementById("status-success");

    const mensaje = document.getElementById("status-message");

    // ==========================
    // MENOR AL PEDIDO MÍNIMO
    // ==========================

    if(subtotal < pedidoMinimo){

        const faltante = pedidoMinimo - subtotal;

        estado.innerHTML = `
            <i class="fa-solid fa-circle-xmark"></i>
            <span>
                Aún no alcanzas el pedido mínimo.
            </span>
        `;

        estado.style.color = "#d32f2f";

        mensaje.innerHTML = `
            Te faltan <strong>$${faltante.toLocaleString("es-CO")}</strong>
            para realizar tu solicitud.
        `;

    }

    // ==========================
    // YA PUEDE COMPRAR
    // ==========================

    else if(subtotal < envioGratis){

        const faltante = envioGratis - subtotal;

        estado.innerHTML = `
            <i class="fa-solid fa-circle-check"></i>
            <span>
                Ya puedes realizar tu solicitud.
            </span>
        `;

        estado.style.color = "#16a34a";

        mensaje.innerHTML = `
            Te faltan <strong>$${faltante.toLocaleString("es-CO")}</strong>
            para obtener <strong>ENVÍO GRATIS.</strong>
        `;

    }

    // ==========================
    // ENVÍO GRATIS
    // ==========================

    else{

        estado.innerHTML = `
            <i class="fa-solid fa-circle-check"></i>
            <span>
                ¡Felicidades! Tu pedido tiene ENVÍO GRATIS.
            </span>
        `;

        estado.style.color = "#16a34a";

        mensaje.innerHTML = `
            Tu pedido ya supera los
            <strong>$250.000</strong>.
        `;

    }

}
