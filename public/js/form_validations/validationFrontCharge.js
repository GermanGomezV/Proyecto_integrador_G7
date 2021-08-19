window.addEventListener("load" , function () {
    
    //Atrapando el formulario
    let formulario = document.querySelector("form.formCharge");
    
    //Defino un evento para el momento en que se envia el formulario
    formulario.addEventListener("submit", function(evento){
        validateForm(evento);
    });

})

function validateForm(evento) {

    //Creo un objeto literal vacio en el cual ire creando una propiedad por cada mensaje de error 
    let errores = {};

    // Verificando el nombre
    let campoNombre = document.querySelector("input.nombre");
    // Obligatorio
    if(campoNombre.value == ""){
        errores.nombre = "El nombre debe completarse"; // Creo en el objeto literal errores la propiedad nombre con este mensaje
    }
    // 5 caracteres min
    else if (campoNombre.value.length < 5) {
        errores.nombre = "El nombre debe tener al menos 5 caracteres"; // o bien creo en el objeto literal errores la propiedad nombre con este mensaje
    }

    // Verificando la descripción
    let campoDescripcion = document.querySelector("input.descripcion");
    // 20 caracteres min
    if (campoDescripcion.value.length < 20) {
        errores.descripcion = "La descripción debe tener al menos 20 caracteres";
    }
   
    //Si el objeto literal contiene propiedades con mensajes cancelo el envío del formulario
    if( errores.nombre || errores.descripcion ){
        evento.preventDefault();
        document.querySelector("div.nombre_error").innerHTML = errores.nombre ?? "";
        document.querySelector("div.descripcion_error").innerHTML = errores.descripcion ?? "";
    }        
    
}