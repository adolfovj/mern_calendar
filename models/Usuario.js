
const { Schema, model } = require('mongoose');

const UsuarioSchma = Schema({

    name:{
        type: String, 
        required: true, // Es obligatorio
    },

    email:{
        type: String, 
        required: true, // Es obligatorio
        unique: true, // Es unico
    },

    password:{
        type: String, 
        required: true, // Es obligatorio
    }
})

module.exports = model("Usuario", UsuarioSchma);
