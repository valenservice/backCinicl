const { response } = require('express');
const Hospital = require('../models/hospital');

const getHospitales = async(req, res = response) => {

    const hospitales = await Hospital.find()
                                    .populate('usuario', 'nombre')

     res.json({
        ok: true,
        hospitales       
    })
        
}

const postHospitales = async(req, res = response) => {
   
    const uid = req.uid;
    const hospital = new Hospital({
        usuario: uid,
        ...req.body
    });

    console.log(uid)

    try {

        // Crear Hospital
        const hospitalDB = await hospital.save();

        res.status(200).json({
            ok: true,
            hospital: hospitalDB
        });

    } catch (error) {        
        res.status(500).json({
            ok: false,
            msg: 'Error inesperado....'
        });
    }
        
}

const putHospitales = async (req, res = response) => {

    //TOTO: Validar token y comprobar si es el usuario correcto
    
    const id = req.params.id;

    try {

        const hospitalDB = await Hospital.findById(id);
        if(!hospitalDB){
            return res.status(404).json({
                ok: false,
                msg: 'No existe un hospital'
            })
        }

         // Actualizaciones    
        //const {password, google, email, ...campos} = req.body;

        // if(usuarioDB.email != email){
        //     const existeEmail = await Usuario.findOne({email});
        //     if( existeEmail){
        //         return res.status(400).json({
        //             ok: false,
        //             msg: 'Existe correo con ese id'
        //         })
        //     }
        // }

        //campos.email = email;
        const hospitalActualizado = await Hospital.findByIdAndUpdate(id, campos,{new: true});

        res.json({
            ok: true,
            hospital: hospitalActualizado
        })
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error al actualizar'
        })

    }
}

const deleteHospitales = async (req, res = response) => {

    const id = req.params.id;

    try {

        const hospitalDB = await Hospital.findById(id);
        if(!hospitalDB){
            return res.status(404).json({
                ok: false,
                msg: 'No existe un hospital'
            })
        }

        await Hospital.findOneAndDelete(id);

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
    getHospitales,
    postHospitales,
    putHospitales,
    deleteHospitales
}