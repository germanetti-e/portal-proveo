/* ==========================
   INICIAR
========================== */

document.addEventListener("DOMContentLoaded", () => {

    cargarDatosCliente();

    cargarSolicitud();

});


/* ==========================
   DATOS DEL CLIENTE
========================== */

function cargarDatosCliente(){

    const datos = JSON.parse(
        localStorage.getItem("datosCliente")
    );

    const contenedor =
        document.getElementById("datos-cliente");

    if(!datos){

        contenedor.innerHTML = `

            <p>
                No encontramos datos guardados.
            </p>

            <a href="account.html">
                Completar mis datos
            </a>

        `;

        return;

    }

    contenedor.innerHTML = `

        <div class="client-data">

            <p>
                <strong>Nombre:</strong>
                ${datos.nombre || ""}
            </p>

            <p>
                <strong>Empresa:</strong>
                ${datos.empresa || ""}
            </p>

            <p>
                <strong>WhatsApp:</strong>
                ${datos.whatsapp || ""}
            </p>

            <p>
                <strong>Dirección:</strong>
                ${datos.direccion || ""}
            </p>

            <p>
                <strong>Tipo de negocio:</strong>
                ${datos.tipoNegocio || ""}
            </p>

            ${
                datos.observaciones
                ? `
                    <p>
                        <strong>Observaciones:</strong>
                        ${datos.observaciones}
                    </p>
                `
                : ""
            }

        </div>

    `;

}


/* ==========================
   CARGAR SOLICITUD
========================== */

async function cargarSolicitud(){

    const carrito = JSON.parse(
        localStorage.getItem("carrito")
    ) || [];

    const contenedor =
        document.getElementById("productos-solicitados");

    if(carrito.length === 0){

        contenedor.innerHTML = `
        
            <p>
                No hay productos en tu solicitud.
            </p>

        `;

        return;

    }

    /*
       El catálogo ya se carga desde catalogo.js.
       Esperamos a que esté disponible.
    */

    const esperarCatalogo = setInterval(() => {

        if(
            typeof catalogo !== "undefined" &&
            catalogo.length > 0
        ){

            clearInterval(esperarCatalogo);

            mostrarProductosSolicitud(carrito);

        }

    }, 100);

}


/* ==========================
   MOSTRAR PRODUCTOS
========================== */

function mostrarProductosSolicitud(carrito){

    const contenedor =
        document.getElementById("productos-solicitados");

    let subtotal = 0;

    let totalConIva = 0;

    contenedor.innerHTML = "";


    carrito.forEach(item => {

        const producto = catalogo.find(
            producto =>
                producto.codigo === item.codigo
        );

        if(!producto){
            return;
        }

        const precio =
            Number(producto.precio_sin_iva);

        const cantidad =
            Number(item.cantidad);

        const iva =
            Number(producto.iva || 0);

        const subtotalProducto =
            precio * cantidad;

        const totalProducto =
            precio *
            (1 + iva / 100) *
            cantidad;


        subtotal += subtotalProducto;

        totalConIva += totalProducto;


        contenedor.innerHTML += `

            <div class="request-product">

                <div>

                    <strong>
                        ${producto.nombre}
                    </strong>

                    <p>
                        ${cantidad}
                        ${producto.unidad_de_venta}
                    </p>

                </div>

                <strong>

                    $${subtotalProducto.toLocaleString("es-CO")}

                </strong>

            </div>

        `;

    });


    document.getElementById(
        "request-subtotal"
    ).textContent =
        `$${subtotal.toLocaleString("es-CO")}`;


    document.getElementById(
        "request-total"
    ).textContent =
        `$${Math.round(totalConIva).toLocaleString("es-CO")}`;

}

/* ==========================
   ENVIAR A WHATSAPP
========================== */

document
    .getElementById("enviar-whatsapp")
    .addEventListener("click", () => {

        const numero = "573239445016";

        window.open(
            `https://wa.me/${numero}`,
            "_blank"
        );

    });
