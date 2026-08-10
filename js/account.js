/* ==========================
   MIS DATOS
========================== */


/* ==========================
   CARGAR DATOS GUARDADOS
========================== */

function cargarDatos(){

    const datos = JSON.parse(
        localStorage.getItem("datosCliente")
    );

    if(!datos){
        return;
    }

    document.getElementById("nombre").value =
        datos.nombre || "";

    document.getElementById("empresa").value =
        datos.empresa || "";

    document.getElementById("whatsapp").value =
        datos.whatsapp || "";

    document.getElementById("direccion").value =
        datos.direccion || "";

    document.getElementById("tipo-negocio").value =
        datos.tipoNegocio || "";

    document.getElementById("observaciones").value =
        datos.observaciones || "";

}


/* ==========================
   GUARDAR DATOS
========================== */

function guardarDatos(){

    const datos = {

        nombre:
            document.getElementById("nombre").value.trim(),

        empresa:
            document.getElementById("empresa").value.trim(),

        whatsapp:
            document.getElementById("whatsapp").value.trim(),

        direccion:
            document.getElementById("direccion").value.trim(),

        tipoNegocio:
            document.getElementById("tipo-negocio").value,

        observaciones:
            document.getElementById("observaciones").value.trim()

    };


    localStorage.setItem(
    "datosCliente",
    JSON.stringify(datos)
);

const mensaje = document.getElementById("mensaje-guardado");

mensaje.classList.add("show");

setTimeout(() => {

    window.location.href = "whatsapp.html";

}, 800);

}

/* ==========================
   BOTÓN GUARDAR
========================== */

document
    .getElementById("guardar-datos")
    .addEventListener(
        "click",
        guardarDatos
    );


/* ==========================
   INICIAR
========================== */

cargarDatos();
