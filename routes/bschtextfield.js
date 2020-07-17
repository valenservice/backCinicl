var express = require('express');
var app = express();

var Bschtextfield = require('../models/bschtextfield');

app.get('/', (req, res, next) => {    

    Bschtextfield.find({ }, (err, bschtextfields) => {
        console.log('bschTextField', bschtextfields)
        if( err ){
            return res.status(500).json({
                ok: false,
                mensaje: 'Error cargando textfield',
                errors: err
            });
        }

        res.status(200).json({
            ok: true,
            bschtextfields
        });
    
    });

});

module.exports = app;