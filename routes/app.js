var express = require('express');

var app = express();

app.get('/', (req, res, next) => {

    res.status(200).json({
        ok: true,
        mensaje: 'Peticción get realizada correctamente'
    })

});

module.exports = app;