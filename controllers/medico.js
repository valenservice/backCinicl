const { response } = require('express');
const Medico = require('../models/medico');

const getMedicos = async(req, res , next) => {

    const medicos = await Medico.find()
                                .populate('usuario', 'nombre')
                                .populate('hospital', 'nombre')

        res.status(200).json({
            ok: true,
            medicos
        });
    
}

const postMedicos = async(req, res = response) => {

    // console.log(req.body);
    // const {nombre} = req.body;    

    const uid = req.id;
    const medico = new Medico({
        usuario: uid,
        ...req.body
    });

    console.log(uid)

    try {

        //const medico = new Medico(req.body);

        // Crear Usuario
        const medicoDB = await medico.save();

        res.status(200).json({
            ok: true,
            medico: medicoDB
        });

    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok: false,
            msg: 'Error inesperado....'
        });
    }
        
}

const putMedicos = async (req, res = response) => {
    
    const id = req.params.id
    const uid = req.id;

    try {

        const medico = await Medico.findById(id);

        if(!medico){
            return res.status(404).json({
                ok: false,
                msg: 'No existe un medico'
            })
        }

        const cambiosMedico = {
            ...req.body,
            usuario: uid,
        }
        
        const medicoActualizado = await Medico.findByIdAndUpdate(id, cambiosMedico, {new: true});

        res.json({
            ok: true,
            medico: medicoActualizado
        })
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error al actualizar'
        })

    }
}

const deleteMedicos = async (req, res = response) => {

    const id = req.params.id;

    try {

        const medicoDB = await Medico.findById(id);
        if(!medicoDB){
            return res.status(404).json({
                ok: false,
                msg: 'No existe un medico'
            })
        }

        await Medico.findOneAndDelete(id);

        res.json({
            ok: true,
            msg: 'Medico Eliminado'
        })
        
    } catch (error) {
        console.log(500).json({
            ok: false,
            msg: 'Revisar con el administrador'
        })
    }
}

module.exports = {
    getMedicos,
    postMedicos,
    putMedicos,
    deleteMedicos
}