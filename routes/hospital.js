const { Router } = require('express');
const router = Router();
const { getHospitales, postHospitales, putHospitales, deleteHospitales } = require('../controllers/hospital');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');

router.get('/', getHospitales);
router.post('/', 
            [
                validarJWT,
                check('nombre', 'El nombre del hospital es obligatorio').not().isEmpty(),                               
                validarCampos,
            ], 
            postHospitales
);

router.put('/:id', 
            [   
                validarJWT,
                check('nombre', 'El nombre del hospital es obligatorio').not().isEmpty(),                                
                validarCampos,              
            ], 
            putHospitales
);       

router.delete('/:id', validarJWT, deleteHospitales);

module.exports = router;