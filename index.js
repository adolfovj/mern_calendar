/*
    Rutas de Usuario ? Auth
    hots + /api/auth
*/


// Configuracion EXPRESS
// es como el import pero asi funciona en node
const express = require('express');
require('dotenv').config();

const cors = require('cors');
const { dbConnection } = require('./database/config');

// Variables de entorno que estan corriendo
//console.log( process.env );

// crear el servidor de express
const app = express();

//---- BASE DE DATOS
dbConnection();

//---- CORS
app.use(cors());

// Directorio Publico
// use | En node es un middleware: Es una funcion que se ejecuta 
// cuando se hace una peticion al servidor
app.use( express.static( 'public' ) );

// ---- LECTURA Y PARSEO DEL BDDY
app.use( express.json() ); // Peticiones en formato json

// Rutas
// Lo que el archivo auth va a exportar lo va a exponer en esa ruta /api
app.use('/api/auth', require('./routes/auth'));
// Todo: auth // Crear | login | token | renew
// Todo: Crud Eventos

app.use('/api/events', require('./routes/events'));


// Escuchar peticiones
app.listen( process.env.PORT, () => {
    console.log(`Servidor corriento en puerto ${ process.env.PORT }`);
} )