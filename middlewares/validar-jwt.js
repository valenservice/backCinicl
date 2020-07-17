const { JsonWebTokenError } = require("jsonwebtoken");

const jwt = require('JsonWebToken')

const validarJWT = (req, res, next) => {

    // Leer el Token
    const token = req.header('x-token');
    console.log(token);

    if(!token){
        return res.status(401).json({
            ok: false,
            msg: 'No hay token en la petición'
        });
    }

    try {

        const { id } = jwt.verify(token, process.env.JWT_SECRET);
        console.log(id)
        req.id = id;
        next()

    } catch (error) {
        return res.status(401).json({
            ok: false,
            msg: 'Token no válido'
        })
    }
}

module.exports = {
    validarJWT
}