const { response } = require("express");
const jwt = require('jsonwebtoken');

const validarJWT = ( req, res = response, next ) => {

    // Recibir el JWT
    // x-token | En los headers
    // Express ya tiene algo para leer los headers
    const token = req.header('x-token');
    //console.log( token );

    if( !token ) { // Si no hay token
        return res.status(401).json({
            ok: false,
            msg: "No hay token en la validacion"
        });
    }

    try {
        
        // Verificar TOKEN
        //const payload = jwt.verify(
        const { uid, name } = jwt.verify(
            token, 
            process.env.SECRET_JWT_SEED
        );

        req.uid = uid;
        req.name = name;
        //console.log(payload);

    } catch (error) {

        return res.status(401).json({
            ok: false,
            msg: "Token no valido",
        })
    }

    // Si todo esta correcto llame a lo siguiente
    next();
}

module.exports = {
    validarJWT
}