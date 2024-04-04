const { response } = require("express");
const { validationResult } = require("express-validator");

// next | Es un callback
const validarCampos = ( req, res = response, next ) => {

    // Manejo de errores
    const errors = validationResult( req );
    if ( !errors.isEmpty() ) { // Si hay errores
        return res.status(400).json({
            ok: false,
            errors: errors.mapped()
        })
    }    

    next();
}

module.exports = {
    validarCampos
};