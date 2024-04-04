// Ruta
// /api/events

// ---- Librerias
const  { Router } = require('express');
const  { check } = require('express-validator');
const  { validarCampos } = require('../middlewares/validar-campos');

const router = Router();

// --- Importacion Controlador
const { getEventos, crearEvento, actulizarEvento, eliminarEvento, } = require('../controllers/events');
const { validarJWT } = require('../middlewares/validar-jwt');
const { isDate } = require('../helpers/isDate');

// --- VALIDAR MIDDLEWARE 
// Cualquier peticion va a tener el validarJWT
// Para evitar esto en todas las peticiones 
// router.get('/', validarJWT, getEventos);
router.use( validarJWT ); 

// --- Endpoints
// --- GET
// Todas deben pasar por la validacion de JWT
// Obtener Eventos

router.get('/', getEventos);

// --- POST
// Crear un nuevo Eventos
router.post(
    '/',
    [
        check('title', 'El titulo es Obligatorio').not().isEmpty(),
        check('start', 'Fecha de Inicio es Obligatoria').custom( isDate ),
        check('end', 'Fecha de Finalizacion es Obligatoria').custom( isDate ),
        validarCampos, // Middleware llamado despues de todos los chec
    ],
     crearEvento
);

// --- PUT
// Actualizar un nuevo Eventos
router.put('/:id', actulizarEvento);

// --- DELETE

// Eliminar un nuevo Eventos
router.delete('/:id', eliminarEvento);

module.exports = router;