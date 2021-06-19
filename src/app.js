//Requiriendo el metodo para guardar sesiones
const session = require('express-session');
app.use(session({
    secret:"Esto es un secreto",
    resve: false,
    saveUninitialized: false,

}));

//Requiriendo e invocando express para obtener sus funcionalidades
const express = require('express'); 
const app = express();

//Los métodos PUT y DELETE no son soportados por todos los navegades. Por ello, es necesario usar la dependencia method-override.
const methodOverride = require('method-override');

// Ruteo: Link hacia con el sistema de ruteo
const rutasPrincipal= require('./routes/main')
const rutasProductos= require('./routes/products')
const rutasUsuario= require('./routes/users')

const process = require('process');

//Ejecutando la funcionalidad de path que resuelve rutas
const path = require('path');

//Comando para decirle a express que vamos a usar archivos con extensión ejs
//La ruta la defino desde el archivo app.js porque estoy parado en él
app.set('view engine', 'ejs');
//Comando para cuando la carpeta views no esta en la raiz app.set('views', __dirname + '/views');
app.set('views', __dirname + '/views');

//Accediendo a los archivos de la carpeta public
app.use(express.static(path.resolve(__dirname, '../public')));
app.use(methodOverride('_method'));

//La siguiente linea nos permite procesar los formularios
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

//Ruteo: Link con el navegador
app.use('/', rutasPrincipal);
app.use('/products', rutasProductos);
app.use('/users', rutasUsuario);
app.use((req, res, next)=>{
    res.status(404).render('404');
});

//Levantando un servidor en el puerto 3000
app.listen(process.env.PORT || 3000, function(){
    console.log('Servidor corriendo OK');
});
