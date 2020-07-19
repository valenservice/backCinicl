var express = require('express');
var app = express();

var Formato = require('../models/formato');

app.get('/', (req, res, next) => {    

    Formato.find({ }, (err, formatoinpes) => {
        console.log('formatoinpes', formatoinpes)
        if( err ){
            return res.status(500).json({
                ok: false,
                mensaje: 'Error cargando Formato',
                errors: err
            });
        }

        res.status(200).json({
            ok: true,
            formatoinpes
        });
    
    });

});

module.exports = app;