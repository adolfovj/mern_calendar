// --- Librerias
const { response } = require('express'); // > Para trabajar con intelligence
const Evento = require('../models/Evento')
// const Usuario = require('../models/Usuario');
// const { generarJWT } = require('../helpers/jwt');

// --- POST
const crearEvento = async ( req, res = response ) => {

    // instancia del model
    const evento = new Evento( req.body );

    try {
        
        evento.user = req.uid;

        const eventoGuardado = await evento.save();

        res.status(201).json({
            ok: true,
            evento: eventoGuardado
        })

    } catch (error) {
        
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Contacte con el Administrador'
        });
    }
}

// --- GET
const getEventos = async ( req, res = response ) => {

    // Traer todos los eventos
    // populate() | Rellenar datos del usuario COMPLETAR
    // Me trae el id y el nombre del usuario
    const eventos = await Evento.find().populate('user', 'name');

    try {
      
        res.json({
            ok: true,
            eventos
        })        
    } catch (error) {
       
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Contacte con el Administrador'
        });        
    }
}


// --- PUT
const actulizarEvento = async ( req, res = response ) => {

    const eventoId = req.params.id;
    const uid = req.uid;

    try {
        
        const evento = await Evento.findById( eventoId );

        if( !evento ) { // Si no existe el id
            return res.status(400).json({
                ok: false,
                msg: 'Evento no existe con ese Id'
            })
        }

        // Verificar si la persona tiene permiso para editar
        // Una persona edita el permiso de otra persona NO ES PERMITIDO
        if( evento.user.toString() !== uid ) { 
            return res.status(401).json({
                ok: false,
                msg: 'No tiene privilegio de editar este evento'
            })
        }

        // Si llega aca es la misma persona 
        const nuevoEvento = {
            ...req.body,
            user: uid,
        }

        // { new: true } | PARA QUE REGRESE EL EVENTO ACTUALIZADO
        const eventoActualizado = await Evento.findByIdAndUpdate( eventoId, nuevoEvento, { new: true } );

        res.status(201).json({
            ok: true,
            evento: eventoActualizado
        })

    } catch (error) {
        // SE podria escribir en el log y poner fecha y hora en el error
        // SE PODRIA SABER LA IP DE LA PETICION - PARA EVITAR ATAQUES Y SI HAY MUCHAS PETICIONES 
        // SE RECHAZA LA IP
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Contacte con el Administrador'
        });         
    }
}

// --- DELETE
const eliminarEvento = async ( req, res = response ) => {

    const eventoId = req.params.id;
    const uid = req.uid;

    try {
        
        const evento = await Evento.findById( eventoId );

        if( !evento ) { // Si no existe el id
            return res.status(400).json({
                ok: false,
                msg: 'Evento no existe con ese Id'
            })
        }

        // Verificar si la persona tiene permiso para editar
        // Una persona edita el permiso de otra persona NO ES PERMITIDO
        if( evento.user.toString() !== uid ) { 
            return res.status(401).json({
                ok: false,
                msg: 'No tiene privilegio de eliminar este evento'
            })
        }

        // { new: true } | PARA QUE REGRESE EL EVENTO ACTUALIZADO
        await Evento.findByIdAndDelete( eventoId, nuevoEvento, { new: true } );

        res.status(201).json({
            ok: true,            
        })

    } catch (error) {
        // SE podria escribir en el log y poner fecha y hora en el error
        // SE PODRIA SABER LA IP DE LA PETICION - PARA EVITAR ATAQUES Y SI HAY MUCHAS PETICIONES 
        // SE RECHAZA LA IP
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Contacte con el Administrador'
        });         
    }
}

module.exports = {
    getEventos,
    crearEvento,
    actulizarEvento,
    eliminarEvento,
}