
const { Schema, model } = require('mongoose');

const EventoSchma = Schema({

    title:{
        type: String, 
        required: true, // Es obligatorio
    },

    notes:{
        type: String, 
    },

    start:{
        type: Date, 
        required: true, // Es obligatorio
    },

    end:{
        type: Date, 
        required: true, // Es obligatorio
    },

    user:{
        // Va a ser una referencia | Relacion
        type: Schema.Types.ObjectId, 
        ref: 'Usuario',
        required: true,
    }
})

EventoSchma.method('toJSON', function() {
    // Para que no inserte en la BD estos variables
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
})

module.exports = model("Evento", EventoSchma);
