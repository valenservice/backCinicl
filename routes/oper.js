var express = require('express');
var app = express();

var Oper = require('../models/oper');

app.get('/', (req, res, next) => {    

    Oper.find({ }, (err, operpes) => {
        console.log('operpes', operpes)
        if( err ){
            return res.status(500).json({
                ok: false,
                mensaje: 'Error cargando Oper',
                errors: err
            });
        }

        res.status(200).json({
            ok: true,
            operpes
        });
    
    });

});

module.exports = app;