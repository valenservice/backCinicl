const { Router } = require('express');
const { login, renewToken } = require('../controllers/auth');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../helpers/jwt')
const router = Router();

router.post('/',
            [
                check('email', 'El email es obligatorio').isEmail(),
                check('password', 'El password es obligatorio').not().isEmpty(),
                validarCampos
            ],
            login
);

router.get('/renew', renewToken);

module.exports = router;