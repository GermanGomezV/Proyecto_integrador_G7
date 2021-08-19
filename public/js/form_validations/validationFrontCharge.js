window.addEventListener("load" , function () {
       
    //Atrapando el formulario de registro
    let formulario = document.querySelector("form.formChargeEdit");
    
    //Defino un evento para el momento en que se envia el formulario
    formulario.addEventListener("submit", function(evento){
        validateForm(evento);
    });

})

function validateForm(evento) {

    //Creo un objeto literal vacio en el cual ire creando una propiedad por cada mensaje de error 
    let errores = {};

    // Verificando el nombre
    // Obligatorio
    let campoNombre = document.querySelector("input.nombre");
    if(campoNombre.value == ""){
        errores.nombre("El nombre debe completarse"); // Creo en el objeto literal errores la propiedad nombre con este mensaje
    }
    // 5 caracteres min
    else if (campoNombre.value.length < 5) {
        errores.nombre("El nombre debe tener al menos 5 caracteres"); // o bien creo en el objeto literal errores la propiedad nombre con este mensaje
    }

    // Verificando la descripción
    // 20 caracteres min
    let campoDescripcion = document.querySelector("input.descripcion");
    if (campoDescripcion.value.length < 20) {
        errores.descripcion("La descripción debe tener al menos 20 caracteres");
    }

    // Verificando la imagen
    // Deberá ser un archivo válido (JPEG, JPG, PNG, GIF)
    const expresionImagen = /\.(jpe?g|png|gif)$/i // Expresión regular de imagen
    let campoImagen = document.querySelector("input.imagen");
    if (expresionImagen.test(campoImagen.value)) {
        errores.imagen = "La imagen debe contener extensión JPEG, JPG, PNG o GIF";
    }
    
    //Si el objeto literal contiene propiedades con mensajes cancelo el envío del formulario
    if( errores.email || errores.descripcion || errores.imagen){
        evento.preventDefault();
        // Capturo el div, si existe la propiedad, le asigno la propiedad con el mensaje, sino no hago nada
        document.querySelector("div.nombre_error").innerHTML = errores.nombre ?? ""
        document.querySelector("div.descripcion_error").innerHTML = errores.descripcion ?? "";
        document.querySelector("div.imagen_error").innerHTML = errores.imagen ?? "";
    }        
    
}