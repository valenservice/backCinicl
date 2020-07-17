var express = require('express');
var app = express();

var Bschlabel = require('../models/bschlabel');

app.get('/', (req, res, next) => {    

    Bschlabel.find({ }, (err, bschlabels) => {
        console.log('bschLabels', bschlabels)
        if( err ){
            return res.status(500).json({
                ok: false,
                mensaje: 'Error cargando label',
                errors: err
            });
        }

        res.status(200).json({
            ok: true,
            bschlabels
        });
    
    });

});

module.exports = app;