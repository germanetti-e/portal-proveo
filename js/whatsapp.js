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
                        Cantidad: ${cantidad}
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
   ENVIAR SOLICITUD
========================== */

document
    .getElementById("enviar-whatsapp")
    .addEventListener("click", async () => {

        const datosCliente = JSON.parse(
            localStorage.getItem("datosCliente")
        );

        const carrito = JSON.parse(
            localStorage.getItem("carrito")
        ) || [];


        /* ==========================
           VALIDAR DATOS
        ========================== */

        if (!datosCliente) {

            alert(
                "No encontramos tus datos. Por favor completa Mis datos."
            );

            return;

        }


        if (carrito.length === 0) {

            alert(
                "No hay productos en tu solicitud."
            );

            return;

        }


        /* ==========================
           PREPARAR SOLICITUD
        ========================== */

        const solicitud = {

            nombre:
                datosCliente.nombre || "",

            empresa:
                datosCliente.empresa || "",

            whatsapp:
                datosCliente.whatsapp || "",

            direccion:
                datosCliente.direccion || "",

            tipoNegocio:
                datosCliente.tipoNegocio || "",

            observaciones:
                datosCliente.observaciones || "",

            productos:
                carrito.map(producto => ({

                    nombre:
                        producto.nombre || "",

                    cantidad:
                        Number(producto.cantidad) || 0,

                    unidadDeVenta:
                        producto.unidad_de_venta || "",

                    precioSinIva:
                        Number(producto.precioSinIva) || 0,

                    iva:
                        Number(producto.iva) || 0

                }))

        };


        /* ==========================
           ENVIAR A GOOGLE SHEETS
        ========================== */

        try {

            const respuesta = await fetch(
                "https://script.google.com/macros/s/AKfycbxEoH-PFVJTjR0tdug3EedfioGxxAm1a-Ed1SU4na5qNiuLe_QFl1qaOL_an-C7eXF8bg/exec",
                {

                    method: "POST",

                    body: JSON.stringify(solicitud)

                }
            );


            const resultado =
                await respuesta.json();


            /* ==========================
               CONFIRMAR REGISTRO
            ========================== */

            if (!resultado.success) {

                throw new Error(
                    resultado.error ||
                    "No se pudo registrar la solicitud."
                );

            }


            console.log(
                "Solicitud registrada:",
                resultado.idSolicitud
            );


            /* ==========================
               ABRIR WHATSAPP
            ========================== */

            const numero =
                "573239445016";

            const mensaje =
                `Hola, quiero realizar la solicitud ${resultado.idSolicitud} de abastecimiento.`;

            window.location.href =
                `https://wa.me/${numero}?text=${encodeURIComponent(mensaje)}`;


        } catch (error) {

            console.error(
                "Error enviando solicitud:",
                error
            );

            alert(
                "No pudimos registrar tu solicitud. Por favor intenta nuevamente."
            );

        }

    });
