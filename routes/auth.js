const  { Router } = require('express');

// check | Valida un campo en particular
const  { check } = require('express-validator');

// Ejecutar la funcion
const router = Router();

// Importacion del controlador
const { crearUsuario, loginUsuario, revalidarToken } = require('../controllers/auth');
const { validarCampos } = require('../middlewares/validar-campos');

// Revalidar | Token
const { validarJWT } = require('../middlewares/validar-jwt')

// 2do argumento []
// Coleccion de middlewares
router.post(
    '/new', 
    [
        // Es obligatorio y no es vacio
        check('name', 'El nombre es obligatorio').not().isEmpty(),
        check('email', 'El email es obligatorio').isEmail(),
        check('password', 'El password debe de ser de 6 caracteres').isLength({ min:6 }),
        validarCampos
    ],
    crearUsuario);

router.post(
    '/',
    [
        check('email', 'El email es obligatorio').isEmail(),
        check('password', 'El password debe de ser de 6 caracteres').isLength({ min:6 }),
        validarCampos
    ],
    loginUsuario);

// Se pasa el middleware validarJWT si son mas SE PASA COMO UN ARREGLO
router.get('/renew', validarJWT, revalidarToken);

module.exports = router;