var express = require('express');
var app = express();

var Oper = require('../models/oper');

app.get('/', (req, res, next) => {    

    Oper.find({ }, (err, opers) => {
        console.log('opers', opers)
        if( err ){
            return res.status(500).json({
                ok: false,
                mensaje: 'Error cargando Oper',
                errors: err
            });
        }

        res.status(200).json({
            ok: true,
            opers
        });
    
    });

});

module.exports = app;