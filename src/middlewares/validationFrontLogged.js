window.addEventListener("load" , function () {
    
    //Atrapando el formulario de logueo
    let formulario = document.querySelector("form.formLogged");
    
    //Defino un evento para el momento en que se envia el formulario
    formulario.addEventListener("submit", function(evento){
        
        let errores = [];

        // Verificando el email
        // Oobligatorio, valido - Opcional: Que exista en la base
        let campoEmail = document.querySelector("input.email");
        if(campoEmail.value == ""){
            errores.push("El email debe completarse");
        }
        else if (!expresion.test(campoEmail)) {
            errores.push("El email debe contener un formato de email");
        }
        
        // Verificando la contraseña
        // Oobligatoria
        let campoContraseña = document.querySelector("input.password");
        if(campoContraseña.value == ""){
            errores.push("La contraseña debe completarse");
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