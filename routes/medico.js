const { Router } = require('express');
const router = Router();
const { getMedicos, postMedicos, putMedicos, deleteMedicos } = require('../controllers/medico');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');

router.get('/', getMedicos);
router.post('/', 
            [
                validarJWT,
                check('nombre', 'El nombre del medico obligatorio').not().isEmpty(),                               
                check('hospital', 'El hospital id debe ser obligatorio').isMongoId(),  
                validarCampos,
            ], 
            postMedicos
);

router.put('/:id', 
            [   
                validarJWT,
                check('nombre', 'El nombre del medico es obligatorio').not().isEmpty(),                                
                validarCampos,              
            ], 
            putMedicos
);       

router.delete('/:id', validarJWT, deleteMedicos);

module.exports = router;