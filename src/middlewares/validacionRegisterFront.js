window.addEventListener("load" , function () {
    
    //Atrapando el formulario de registro
    let formulario = document.querySelector("form.formRegister");
    
    //Defino un evento para el momento en que se envia el formulario
    formulario.addEventListener("submit", function(evento){
        
        let errores = [];

        // Verificando el nombre
        let campoNombre = document.querySelector("input.nombre");
        if(campoNombre.value == ""){
            errores.push("El nombre debe completarse");
        }
        else if (campoNombre.value.length < 2) {
            errores.push("El nombre debe tener al menos 2 caracteres");
        }

        // Verificando el apellido
        let campoApellido = document.querySelector("input.apellido");
        if(campoApellido.value == ""){
            errores.push("El apellido debe completarse");
        }
        else if (campoApellido.value.length < 2) {
            errores.push("El apellido debe tener al menos 2 caracteres");
        }

        // Verificando el email
        let campoEmail = document.querySelector("input.email");
        if(campoEmail.value == ""){
            errores.push("El email debe completarse");
        }
        else if (!expresion.test(campoEmail)) {
            errores.push("El email debe contener un formato de email");
        }
        
        // Verificando la contraseña
        let campoContraseña = document.querySelector("input.password");
        if(campoContraseña.value == ""){
            errores.push("La contraseña debe completarse");
        }
        else if (campoContraseña.value.length < 8) {
            errores.push("La contraseña debe tener al menos 8 caracteres");
        }

        
        //Si hay errores cancelo el envío del formulario, recorro el array de errores y los muestro 
        if( errores.length > 0 ){
            evento.preventDefault();
            let ulErrores = document.querySelector("div.erroresFront ul");
            //for que recorre el array de errores
            for( let i=0 ; i<errores.length ; i++ ){
                ulErrores.innerHTML += "<li>" + errores[i] + "</li>"
            }
        }        
        
    })
})