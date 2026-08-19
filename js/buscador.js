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

                        <div
                            class="search-result"
                            data-codigo="${producto.codigo}">

                            <div
                                class="search-result-info search-product-link">

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
                    event => {

                        /*
                           Evita que el clic
                           también active el
                           enlace del producto.
                        */

                        event.stopPropagation();


                        agregarProducto(
                            boton.dataset.producto
                        );

                    }
                );

            });


            /* ==========================
               IR AL PRODUCTO
            ========================== */

            const productosResultado =
                resultados.querySelectorAll(
                    ".search-product-link"
                );


            productosResultado.forEach(resultado => {

                resultado.addEventListener(
                    "click",
                    () => {

                        const codigo =
                            resultado
                                .closest(".search-result")
                                .dataset.codigo;


                        const producto =
                            catalogo.find(
                                item =>
                                    String(item.codigo) ===
                                    String(codigo)
                            );


                        if(!producto){

                            return;

                        }


                        /*
                           Si ya estamos en la categoría
                           del producto, buscamos
                           directamente la tarjeta.
                        */

                        const parametros =
                            new URLSearchParams(
                                window.location.search
                            );

                        const categoriaActual =
                            parametros.get("categoria");


                        if(
                            categoriaActual ===
                            producto.categoria
                        ){

                            irAlProducto(
                                producto.codigo
                            );

                            return;

                        }


                        /*
                           Si estamos en otra pantalla
                           o en otra categoría,
                           vamos primero a la categoría.
                        */

                        const url =
                            `categoria.html?categoria=${encodeURIComponent(
                                producto.categoria
                            )}&producto=${encodeURIComponent(
                                producto.codigo
                            )}`;


                        window.location.href = url;

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
   IR AL PRODUCTO
========================== */

function irAlProducto(codigo){

    const tarjeta =
        document.querySelector(
            `[data-producto-codigo="${codigo}"]`
        );


    if(!tarjeta){

        return;

    }


    tarjeta.scrollIntoView({

        behavior: "smooth",

        block: "center"

    });


    tarjeta.classList.add(
        "search-highlight"
    );


    setTimeout(() => {

        tarjeta.classList.remove(
            "search-highlight"
        );

    }, 1800);

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
