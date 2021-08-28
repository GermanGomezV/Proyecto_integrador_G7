//Ejecutando la funcionalidad de path que resuelve rutas
const path = require('path');

//Requiriendo el metodo para guardar sesiones
const session = require('express-session');

//Requiriendo el cookie parser
const cookies = require('cookie-parser');

//Requiriendo el middleware selectivo del heder en función de si estoy o no logueado
const userLoggedMiddleware = require("./middlewares/userLoggedMiddleware");

//Requiriendo e invocando express para obtener sus funcionalidades
const express = require('express'); 
const app = express();

//Los métodos PUT y DELETE no son soportados por todos los navegades. Por ello, es necesario usar la dependencia method-override.
const methodOverride = require('method-override');

//Requiriendo Cons
const cors = require('cors');

// Ruteo: Link hacia con el sistema de ruteo
const rutasPrincipal= require('./routes/main')
const rutasProductos= require('./routes/products')
const rutasUsuario= require('./routes/users')
const rutasApi= require('./routes/api')

const process = require('process');

//Comando para decirle a express que vamos a usar archivos con extensión ejs
//La ruta la defino desde el archivo app.js porque estoy parado en él
app.set('view engine', 'ejs');
//Comando para cuando la carpeta views no esta en la raiz app.set('views', __dirname + '/views');
app.set('views', __dirname + '/views');

//Configurando session como middleware global
app.use(session({
    secret:"Esto es un secreto",
    resave: false,
    saveUninitialized: false,
}));

//configurando cors
app.use(cors());

//Configurando cookie parser
app.use(cookies());

// Configurando el middleware para que sea global
app.use(userLoggedMiddleware);

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
app.use('/api', rutasApi);
app.use((req, res, next)=>{
    res.status(404).render('404');
});

//Levantando un servidor en el puerto 3000
app.listen(process.env.PORT || 3000, function(){
    console.log('Servidor corriendo OK');
});
