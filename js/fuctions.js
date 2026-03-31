const formulario = document.getElementById("formulario");
const cuerpotabla = document.getElementById("cuerpotabla");
const campoBusqueda = document.getElementById("campoBusqueda");

let idEdicion = null;
formulario.addEventListener(
    "submit",function(event){
        event.preventDefault();


        const Titulo = document.getElementById("Titulo").value.trim();
        const Autor = document.getElementById("Autor").value.trim();
        const Año = document.getElementById("Año").value.trim();
        const Genero = document.getElementById("Genero").value.trim();

        // Elementos de error
        const errorTitulo = document.getElementById("errorTitulo");
        const errorAutor = document.getElementById("errorAutor");
        const errorAño = document.getElementById("errorAño");
        const errorGenero = document.getElementById("errorGenero");


        // Técnica del Centinela
        let valido = true;
        if(Titulo === ""){
            errorTitulo.textContent = "El titulo es obligatario"
            valido = false; 
        }else{
            errorTitulo.textContent = "";
        }

        if(Autor === ""){
            errorAutor.textContent = "El autor es obligatario"
            valido = false;
        }else{
            errorAutor.textContent = "";
        }

        if(Año === ""){
            errorAño.textContent = "El año es obligatario"
            valido = false;
        }else{
            errorAño.textContent = "";
        }

        if(Genero === ""){
            errorGenero.textContent = "El género es obligatario"
            valido = false;
        }else{
            errorGenero.textContent = "";
        }

        if (valido) {
            let librosGuardados = JSON.parse(localStorage.getItem("libros")) || [];

            if (idEdicion !==null) {}
            const indice = librosGuardados.findIndex(libro => libro.id === idEdicion);
            if (indice -1) {
                librosGuardados[indice].titulo = Titulo;
                librosGuardados[indice].autor = Autor;
                librosGuardados[indice].año = Año;
                librosGuardados[indice].genero = Genero;
            }
            idEdicion = null;
        }else{
            const nuevoLibro = {
                id: Date.now(),
                titulo: Titulo,
                autor: Autor,
                año: Año,
                genero: Genero
            };
            librosGuardados.push(nuevoLibro);
        }

            localStorage.setItem("libros", JSON.stringify(librosGuardados));
            formulario.reset();
            mostrarLibros();
        }
    );

    function mostrarLibros(filtroTitulo = "", filtroGenero = "") {
        cuerpotabla.innerHTML = "";
        const libros = JSON.parse(localStorage.getItem("libros")) || [];

        libros
            .filter(libro => libro.titulo.toLowerCase().includes(filtroTitulo.toLowerCase()) && (filtroGenero === "" || libro.genero === filtroGenero))
            .forEach((libro) => {
                const fila = document.createElement("tr");
                fila.innerHTML = `
                    <td>${libro.titulo}</td>
                    <td>${libro.autor}</td>
                    <td>${libro.año}</td>
                    <td>${libro.genero}</td>
                    <td>
                        <button type="button" onclick="prepararEdicion(${libro.id})">Editar</button>
                        <button type="button" onclick="eliminarLibro(${libro.id})">Eliminar</button>
                    </td>
                `;
                cuerpotabla.appendChild(fila);
            });
        }
        window.eliminarLibro = function(id) {
            if (confirm("¿Estás seguro de que deseas eliminar este libro?")) {
            let libros = JSON.parse(localStorage.getItem("libros")) || [];
            libros = libros.filter(libro => libro.id !== id);
            localStorage.setItem("libros", JSON.stringify(libros));
            mostrarLibros();
            }
        }

        window.prepararEdicion = function(id) {
            const libros = JSON.parse(localStorage.getItem("libros")) || [];
            const libro = libros.find(libro => libro.id === id);

            if (libro) {
                document.getElementById("Titulo").value = libro.titulo;
                document.getElementById("Autor").value = libro.autor;
                document.getElementById("Año").value = libro.año;
                document.getElementById("Genero").value = libro.genero;
                idEdicion = id;
                formulario.querySelector("button[type='submit']").textContent = "AgregarLibro";
            }
        };

        formulario.addEventListener("submit", function(event) {
            event.preventDefault();
            const Titulo = document.getElementById("Titulo").value.trim();
            const Autor = document.getElementById("Autor").value.trim();
            const Año = document.getElementById("Año").value.trim();
            const Genero = document.getElementById("Genero").value.trim();

            let valido = true;
            if (valido) {
                let libros = JSON.parse(localStorage.getItem("libros")) || [];

                if (idEdicion !== null) {   
                    const index = libros.findIndex(libro => libro.id === idEdicion);
                    if (index !== -1) {
                        libros[index].titulo = Titulo;
                        libros[index].autor = Autor;
                        libros[index].año = Año;
                        libros[index].genero = Genero;
                    }
                    idEdicion = null;
                    formulario.querySelector("button[type='submit']").textContent = "Agregar Libro";
                } else {
                    const nuevoLibro = {
                        id: Date.now(),
                        titulo: Titulo,
                        autor: Autor,
                        año: Año,
                        genero: Genero
                    };
                    libros.push(nuevoLibro);
                }

                localStorage.setItem("libros", JSON.stringify(libros));
                formulario.reset();
                mostrarLibros();
            }
        });

        const campoBusquedaTitulo = document.getElementById("campoBusquedaTitulo");

        document.addEventListener("DOMContentLoaded", () => {
            mostrarLibros();

        });


