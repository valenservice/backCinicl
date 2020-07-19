const { Router } = require('express')
const router = Router();
const { getTodo, getDocumentoColleccion } = require('../controllers/busqueda')
const { validarJWT } = require('../middlewares/validar-jwt');

router.get('/:busqueda', validarJWT, getTodo);

router.get('/colleccion/:tabla/:busqueda', validarJWT, getDocumentoColleccion);

module.exports = router