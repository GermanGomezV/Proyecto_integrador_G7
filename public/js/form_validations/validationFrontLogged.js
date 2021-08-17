window.addEventListener("load" , function () {
    
    //Atrapando el formulario de logueo
    let formulario = document.querySelector("form.formLogged");
    
    //Defino un evento para el momento en que se envia el formulario
    formulario.addEventListener("submit", function(evento) {
        validateForm(evento);
    });    
    
})

function validateForm(evento) {
    
    //Creo un objeto literal vacio en el cual ire creando una propiedad por cada mensaje de error 
    let errores = {};
    
    // Verificando el email
    // Obligatorio
    const expressionEmail = /\S+@\S+\.\S+/; // Expresión regular de email
    let campoEmail = document.querySelector("input.email");
    if(campoEmail.value == ""){
        errores.email = "El email debe completarse"; // Creo en el objeto literal errores la propiedad email con este mensaje
    }
    // Valido
    else if (expressionEmail.test(campoEmail)) {
        errores.email = "El campo debe contener un formato de email"; // o bien creo en el objeto literal errores la propiedad email con este mensaje
    }
    
    // Verificando la contraseña
    // Obligatoria
    let campoContraseña = document.querySelector("input.password");
    if(campoContraseña.value == ""){
        errores.password = "La contraseña debe completarse"; // Creo en el objeto literal errores la propiedad password con este mensaje
    }
    
    //Si el objeto literal contiene propiedades con mensajes cancelo el envío del formulario
    if( errores.email || errores.password){
        evento.preventDefault();
        // Capturo el div, si existe la propiedad, le asigno la propiedad con el mensaje, sino no hago nada
        document.querySelector("div.email_errors").innerHTML = errores.email ?? ""
        document.querySelector("div.password_errors").innerHTML = errores.password ?? "";
    }        
    
}