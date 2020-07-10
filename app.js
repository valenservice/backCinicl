// Requires

var express = require('express');
const mongoose = require('mongoose');

// Inicializar Variable
var app = express();

// Conexion BBDD
mongoose.connect('mongodb://localhost:27017/clinicaDB', (err, res) => {
    if( err ) throw err;

    console.log('MongoDB en Puerto 27017 - \x1b[32m%s\x1b[0m','ONLINE!!!!!!!')

})

// Rutas

app.get('/', (req, res, next) => {

    res.status(200).json({
        ok: true,
        mensaje: 'Peticción get realizada correctamente'
    })

});

// Escuchar Peticiones
app.listen(3000, () => {
    console.log('Express Server en Puerto 3000 - \x1b[32m%s\x1b[0m','ONLINE!!!!!!!')
})