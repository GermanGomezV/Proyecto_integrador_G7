window.addEventListener("load" , function () {
    
    //Atrapando el formulario de registro
    let formulario = document.querySelector("form.formEdit");
    
    //Defino un evento para el momento en que se envia el formulario
    formulario.addEventListener("submit", function(evento){
        
        let errores = [];

        // Verificando el nombre
        // Obligatorio, 5 caracteres min
        let campoNombre = document.querySelector("input.nombre");
        if(campoNombre.value == ""){
            errores.push("El nombre debe completarse");
        }
        else if (campoNombre.value.length < 5) {
            errores.push("El nombre debe tener al menos 5 caracteres");
        }

        // Verificando la descripción
        // Obligatorio, 5 caracteres min
        let campoDescripcion = document.querySelector("input.descripcion");
        if (campoDescripcion.value.length < 20) {
            errores.push("La descripción debe tener al menos 20 caracteres");
        }

        // Verificando la imagen (JPG, JPEG, PNG, GIF)
        
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