const { Router } = require('express');
const router = Router();
const { getUsuarios, postUsuarios, putUsuarios, deleteUsuarios } = require('../controllers/usuarios');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos')

router.get('/', getUsuarios);
router.post('/', 
            [
                check('nombre', 'El nombre es obligatorio').not().isEmpty(),                
                check('email', 'Email es obligatorio').isEmail(),
                check('password', 'Contraseña es obligatorio').not().isEmpty(),
                validarCampos,
            ], 
            postUsuarios
);

router.put('/:id', 
                [
                    check('nombre', 'El nombre es obligatorio').not().isEmpty(),                
                    check('email', 'Email es obligatorio').isEmail(),
                    check('role', 'El Rol es obligatorio').not().isEmpty(),  
                    validarCampos,              
                ], 
                putUsuarios
);       

router.delete('/:id', deleteUsuarios);

module.exports = router;