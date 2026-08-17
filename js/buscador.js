/* ==========================
   BUSCADOR PROVEO
========================== */

function activarBuscador(){

    const buscador =
        document.getElementById("searchInput");

    const resultados =
        document.getElementById("search-results");


    if(!buscador || !resultados){

        return;

    }


    buscador.addEventListener(
        "input",
        () => {

            const texto =
                buscador.value
                    .trim()
                    .toLowerCase();


            /* ==========================
               BUSCADOR VACÍO
            ========================== */

            if(texto === ""){

                resultados.innerHTML = "";

                resultados.classList.remove("active");

                return;

            }


            /* ==========================
               BUSCAR EN CATÁLOGO
            ========================== */

            const encontrados =
                catalogo.filter(producto => {

                    const nombre =
                        String(
                            producto.nombre || ""
                        ).toLowerCase();

                    const categoria =
                        String(
                            producto.categoria || ""
                        ).toLowerCase();

                    const imagen =
                        String(
                            producto.imagen || ""
                        ).toLowerCase();


                    return (
                        nombre.includes(texto) ||
                        categoria.includes(texto) ||
                        imagen.includes(texto)
                    );

                });


            /* ==========================
               SIN RESULTADOS
            ========================== */

            if(encontrados.length === 0){

                resultados.innerHTML = `

                    <div class="search-no-results">

                        No encontramos productos
                        para
                        <strong>
                            "${buscador.value}"
                        </strong>

                    </div>

                `;

                resultados.classList.add("active");

                return;

            }


            /* ==========================
               MOSTRAR RESULTADOS
            ========================== */

            resultados.innerHTML = "";


            encontrados
                .slice(0, 8)
                .forEach(producto => {

                    resultados.innerHTML += `

                        <div class="search-result">

                            <div class="search-result-info">

                                <strong>
                                    ${producto.nombre}
                                </strong>

                                <span>
                                    $${Number(
                                        producto.precio_sin_iva || 0
                                    ).toLocaleString("es-CO")}
                                    ${
                                        Number(producto.iva) > 0
                                        ? " + IVA"
                                        : ""
                                    }
                                </span>

                            </div>


                            <button
                                type="button"
                                class="search-add-button"
                                data-producto="${producto.imagen}">

                                Agregar

                            </button>

                        </div>

                    `;

                });


            resultados.classList.add("active");


            /* ==========================
               BOTONES AGREGAR
            ========================== */

            const botones =
                resultados.querySelectorAll(
                    ".search-add-button"
                );


            botones.forEach(boton => {

                boton.addEventListener(
                    "click",
                    () => {

                        agregarProducto(
                            boton.dataset.producto
                        );

                    }
                );

            });

        }
    );


    /* ==========================
       CERRAR AL HACER CLICK FUERA
    ========================== */

    document.addEventListener(
        "click",
        event => {

            if(
                !event.target.closest(".search-section")
            ){

                resultados.classList.remove(
                    "active"
                );

            }

        }
    );

}


/* ==========================
   INICIAR
========================== */

document.addEventListener(
    "DOMContentLoaded",
    () => {

        activarBuscador();

    }
);
