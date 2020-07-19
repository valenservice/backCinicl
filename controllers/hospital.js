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

    console.log('UID1: ', id)

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
    
    const id = req.params.id;
    const uid = req.id;

    console.log('UID2: ', uid)

    try {

        const hospital = await Hospital.findById(id);   

        if(!hospital){
            return res.status(404).json({
                ok: false,
                msg: 'No existe un hospital'
            })
        }

        const cambiosHospital = {
            ...req.body,
            usuario: uid
        }
        const hospitalActualizado = await Hospital.findByIdAndUpdate(id, cambiosHospital, {new: true});

        res.json({
            ok: true,
            msg: 'Hospital Actualizado',
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
            msg: 'Hospital Eliminado'
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