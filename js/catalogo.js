/* =======================================================
   PROVEO
   Catálogo dinámico
======================================================= */

/* ==========================
   CONFIGURACIÓN
========================== */

const API_URL = "https://script.google.com/macros/s/AKfycbxEoH-PFVJTjR0tdug3EedfioGxxAm1a-Ed1SU4na5qNiuLe_QFl1qaOL_an-C7eXF8bg/exec";
/* =======================================================
   PROVEO
   Catálogo dinámico
======================================================= */

/* ==========================
   CONFIGURACIÓN
========================== */

const API_URL = "PEGA_AQUI_TU_URL_DEL_APPS_SCRIPT";

/* ==========================
   LEER CATÁLOGO
========================== */

async function cargarCatalogo() {

    try {

        const respuesta = await fetch(API_URL);

        const productos = await respuesta.json();

        console.log(productos);

    }

    catch(error){

        console.error("Error cargando catálogo:", error);

    }

}

/* ==========================
   INICIAR
========================== */

cargarCatalogo();
