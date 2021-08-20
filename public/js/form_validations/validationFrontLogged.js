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
    let campoEmail = document.querySelector("input.email");
    // Obligatorio
    if(campoEmail.value == ""){
        errores.email = "El email debe completarse";
    }
    else {
        // Valido
        //Expresión regular de emails
        expressionEmail = /^[-\w.%+]{1,64}@(?:[A-Z0-9-]{1,63}\.){1,125}[A-Z]{2,63}$/i;
        if (!expressionEmail.test("input.email")) {
        } else {
            errores.email = "El email debe contener un formato de email";
        }
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