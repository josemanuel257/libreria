const formulario = document.getElementById("formulario");

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

    }
);