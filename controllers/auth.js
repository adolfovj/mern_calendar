const { response } = require('express'); // > Para trabajar con intelligence
const Usuario = require('../models/Usuario');
const { generarJWT } = require('../helpers/jwt');

// Libreria de encriptacion
const bcrypt = require('bcryptjs');

const crearUsuario = async (req, res = response) => {

    // console.log(req.body);
    const { name, email, password } = req.body;
    try {
            
        // Validando el usuario
        let usuario = await Usuario.findOne({
            email: email
        })

        if( usuario ) { // Si hay un usuario
            return res.status(400).json({
                ok: false,
                msg: "El email ya esta siendo utilizado"
            })
        }

        // Instanciando al modelo
        usuario = new Usuario( req.body );

        // Encriptar contrasena
        // Se genera el salt
        const salt = bcrypt.genSaltSync(); // recibre como arg # de vuletas
        usuario.password = bcrypt.hashSync( password, salt);

        await usuario.save();
    
        // Generar JWT
        const token = await generarJWT( usuario.id, usuario.name );

        res.status(201).json({
            ok: true,
            uid: usuario.id,
            name: usuario.name,
            token: token
        })
    } catch (error) {
        
        res.status(500).json({
            ok: false,
            msg: "Contacte al Administrador"
        })
    }
}

const loginUsuario = async (req, res = response) => {

    const { email, password } = req.body;

    try {

        // Validando el usuario
        const usuario = await Usuario.findOne({
            email: email
        })

        if( !usuario ) { // Si NO hay un usuario
            return res.status(400).json({
                ok: false,
                msg: "El usuario no existe con ese email"
            })
        }

        // Confirmar los PASSWORDS
        const validPassword = bcrypt.compareSync( password, usuario.password );

        if( !validPassword ) {
            return res.status(400).json({
                ok: false,
                msg: "Password Incorrecto"
            })
        }

        // Generar nuestro JWT
        const token = await generarJWT( usuario.id, usuario.name );


        res.status(201).json({
            ok: true,
            uid: usuario.id,
            name: usuario.name,
            token: token
        })
       
    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: "Contacte al Administrador"
        })        
    }

};

const revalidarToken = async (req, res = response) => {
       
    const { uid, name } = req;

    // gernerar un nuevo token y retornarlo en esta peticion
    // Generar nuestro JWT
    const token = await generarJWT( uid, name );

    res.json({
        ok: true,
        // uid: uid,
        // name,
        token
    })
};

// Para crear usuarios
module.exports = {
    crearUsuario,
    loginUsuario,
    revalidarToken,
}