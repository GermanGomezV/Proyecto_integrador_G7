window.addEventListener("load" , function () {
    
    //Atrapando el formulario de registro
    let formulario = document.querySelector("form.formRegister");
    
    //Defino un evento para el momento en que se envia el formulario
    formulario.addEventListener("submit", function(evento){
        validateForm(evento);
    });

});
       
function validateForm(evento) {

    //Creo un objeto literal vacio en el cual ire creando una propiedad por cada mensaje de error 
    let errores = {};
    
    // Verificando el nombre
    let campoNombre = document.querySelector("input.nombre");
    // Obligatorio
    if(campoNombre.value == ""){
        errores.nombre = "El nombre debe completarse"; // Creo en el objeto literal errores la propiedad nombre con este mensaje
    }
    // 2 caracteres min
    else if (campoNombre.value.length < 2) {
        errores.nombre = "El nombre debe tener al menos 2 caracteres"; // o bien creo en el objeto literal errores la propiedad nombre con este mensaje
    }

    // Verificando el apellido
    let campoApellido = document.querySelector("input.apellido");
    // Obligatorio
    if(campoApellido.value == ""){
        errores.apellido = "El apellido debe completarse";
    }
    // 2 caracteres min
    else if (campoApellido.value.length < 2) {
        errores.apellido = "El apellido debe tener al menos 2 caracteres";
    }

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
        if (expressionEmail.test("input.email")) {
        } else {
            errores.email = "El email debe contener un formato de email";
        }
    }
    
    // Verificando la contraseña 1
    let campoContrasena = document.querySelector("input.password");
    // Obligatoria
    if(campoContrasena.value == ""){
        errores.contrasena =  "La contraseña debe completarse";
    }
    // 8 caracteres min
    else if (campoContrasena.value.length < 8) {
        errores.contrasena = "La contraseña debe tener al menos 8 caracteres";
    }

    // Verificando la contraseña 2
    let campoContrasena2 = document.querySelector("input.password2");
    // Obligatoria
    if(campoContrasena2.value == ""){
        errores.contrasena2 =  "La contraseña debe completarse";
    }
    // 8 caracteres min
    else if (campoContrasena2.value.length < 8) {
        errores.contrasena2 = "La contraseña debe tener al menos 8 caracteres";
    }

    /* (opcional) La contraseña debera tener 8 caracteres min, mayúsculas, minúsculas, un numero y un caracter especial
    Expresión regular de contraseña
    const expresionContrasena = /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/
    /^            : Start
    (?=.{8,})        : Length
    (?=.*[a-zA-Z])   : Letters
    (?=.*\d)         : Digits
    (?=.*[!#$%&? "]) : Special characters
    $/              : End
    else if (expresionContrasena.test(campoContrasena.value)) {
        errores.contrasena = "La contraseña deberá tener al menos 8 caracteres, letras mayúsculas y minúsculas, un número y un carácter especial";
    } */
    
    //Si el objeto literal contiene propiedades con mensajes cancelo el envío del formulario
    if( errores.nombre || errores.apellido || errores.email || errores.contrasena){
        evento.preventDefault();
        // Capturo el div, si existe la propiedad, le asigno la propiedad con el mensaje, sino no hago nada
        document.querySelector("div.nombre_error").innerHTML = errores.nombre ?? ""
        document.querySelector("div.apellido_error").innerHTML = errores.apellido ?? "";
        document.querySelector("div.email_error").innerHTML = errores.email ?? ""
        document.querySelector("div.password_error").innerHTML = errores.contrasena ?? "";
        document.querySelector("div.password2_error").innerHTML = errores.contrasena2 ?? "";
    }       
        
}