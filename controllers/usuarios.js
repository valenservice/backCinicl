const { response } = require('express');
const bcrypt = require('bcryptjs');
const { generateJWT } = require('../helpers/jwt');

const Usuario = require('../models/usuario');

const getUsuarios = async(req, res , next) => {

    //const usuarios = await Usuario.find({}, 'nombre');

    await Usuario.find({ }, (err, usuarios) => {

        console.log('usuarios', usuarios)

        if( err ){
            return res.status(500).json({
                ok: false,
                mensaje: 'Error cargando usuario',
                errors: err
            });
        }

        res.status(200).json({
            ok: true,
            usuarios
        });
    
    });

}

const postUsuarios = async(req, res = response) => {

    console.log(req.body);
    const {nombre, email, password, role, google, estado} = req.body;    

    try {

        const existeEmail = await Usuario.findOne({email});

        if(existeEmail){
            return res.status(400).json({
                ok: false,
                msg: 'El correo ya está registrado'
            });
        }

        const usuario = new Usuario(req.body);

        // Encriptar contraseña
        const salt = bcrypt.genSaltSync();
        usuario.password = bcrypt.hashSync(password, salt);
        // Crear Usuario
        await usuario.save();
        // Generar el Token - JWT
        const usuarioDB = await Usuario.find({}, 'email');
        console.log(usuarioDB.id)
        const token = await generateJWT( usuarioDB.id );

        res.status(200).json({
            ok: true,
            usuario,
            token
        });

    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok: false,
            msg: 'Error inesperado....'
        });
    }
        
}

const putUsuarios = async (req, res = response) => {

    //TOTO: Validar token y comprobar si es el usuario correcto
    
    const id = req.params.id;

    try {

        const usuarioDB = await Usuario.findById(id);
        if(!usuarioDB){
            return res.status(404).json({
                ok: false,
                msg: 'No existe un usuario'
            })
        }

         // Actualizaciones    
        const {password, google, email, ...campos} = req.body;

        if(usuarioDB.email != email){
            const existeEmail = await Usuario.findOne({email});
            if( existeEmail){
                return res.status(400).json({
                    ok: false,
                    msg: 'Existe correo con ese id'
                })
            }
        }

        campos.email = email;
        const usuarioActualizado = await Usuario.findByIdAndUpdate(id, campos,{new: true});

        res.json({
            ok: true,
            usuario: usuarioActualizado
        })
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error al actualizar'
        })

    }
}

const deleteUsuarios = async (req, res = response) => {

    const id = req.params.id;

    try {

        const usuarioDB = await Usuario.findById(id);
        if(!usuarioDB){
            return res.status(404).json({
                ok: false,
                msg: 'No existe un usuario'
            })
        }

        await Usuario.findOneAndDelete(id);

        res.json({
            ok: true,
            msg: 'Usuario Eliminado'
        })
        
    } catch (error) {
        console.log(500).json({
            ok: false,
            msg: 'Revisar con el administrador'
        })
    }
}

module.exports = {
    getUsuarios,
    postUsuarios,
    putUsuarios,
    deleteUsuarios
}