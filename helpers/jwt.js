
const jwt = require('jsonwebtoken');

const generarJWT = ( uid, name ) => {

    // Las PROMESAS Resiven un callback | resolve, reject => { }
    return new Promise( ( resolve, reject ) => {

        const payload = { uid, name };

        // fimra del token
        // 1. payloadd
        // 2. palabra ServiceWorkerContainer
        // 3. expiracion en 2 horas
        // 4. un callback si hay error [ Dependencia ] Se dispara
        jwt.sign( payload, process.env.SECRET_JWT_SEED, {
            expiresIn: "2h"
        }, ( err, token ) => {
            if( err ) { // Si hay error
                console.log(err);
                reject( "No se pudo generar el token" )
            }

            resolve( token ); // Si no hay error se puedo resolver el token
        })
    })
}

module.exports = {
    generarJWT
}