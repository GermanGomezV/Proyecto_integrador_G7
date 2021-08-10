window.addEventListener("load" , function () {
    
    //Atrapando el formulario de registro
    let formulario = document.querySelector("form.formRegister");
    
    //Defino un evento para el momento en que se envia el formulario
    formulario.addEventListener("submit", function(evento){
        
        let errores = {};

        // Verificando el nombre
        // Obligatorio, 2 caracteres min
        let campoNombre = document.querySelector("input.nombre");
        if(campoNombre.value == ""){
            errores.nombre = "El nombre debe completarse";
        }
        else if (campoNombre.value.length < 2) {
            errores.nombre = "El nombre debe tener al menos 2 caracteres";
        }

        // Verificando el apellido
        // Obligatorio, 2 caracteres min
        let campoApellido = document.querySelector("input.apellido");
        if(campoApellido.value == ""){
            errores.apellido = "El apellido debe completarse";
        }
        else if (campoApellido.value.length < 2) {
            errores.apellido = "El apellido debe tener al menos 2 caracteres";
        }

        // Verificando el email
        // Oobligatorio, valido - Opcional: Que no se repita con los existentes en la base
        const expresionEmail = /^\S+@\S+\.\S+$/;
        let campoEmail = document.querySelector("input.email");
        if(campoEmail.value == ""){
            errores.email = "El email debe completarse";
        }
        else if (!expresionEmail.test(campoEmail)) {
            errores.email = "El email debe contener un formato de email";
        }
        
        // Verificando la contraseña 
        // Obligatoria, 8 caracteres min - Opcional: contenga mayúsculas minúsculas un numero y un caracter especial
        const expresionContrasena = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z](?=.*[@#$%^&+=]){8,}$/

        let campoContrasena = document.querySelector("input.password");
        if(campoContrasena.value == ""){
            errores.contrasena =  "La contraseña debe completarse";
        }
        else if (!expresionContrasena.test(campoContrasena.value)) {
            errores.contrasena = "La contraseña deberá tener al menos 8 caracteres, letras mayúsculas, minúsculas, un número y un carácter especial";
        }

        // Verificando la imagen (JPG, JPEG, PNG, GIF)
        
        //Si hay errores cancelo el envío del formulario, recorro el array de errores y los muestro 
        if( errores.nombre  || errores.apellido  || errores.email  || errores.contrasena ){
            evento.preventDefault();
            console.log(errores)
        }        
        
    })
})