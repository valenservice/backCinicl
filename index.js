// Requires
require('dotenv').config();
const express = require('express');
const { dbConnection } = require('./database/config');
const cors = require('cors');
//console.log(process.env)

// Crear el servidor Express
const app = express();
// Configurar CORS
app.use(cors());
// Lectura y Parseo desde body
app.use(express.json());
// Conexion BBDD
dbConnection();
// Rutas
app.use('/api/usuarios', require('./routes/usuarios'));
app.use('/api/login', require('./routes/auth'));
app.use('/', require('./routes/app'));
app.use('/tf/textfield', require('./routes/bschtextfield'));
app.use('/tf/label', require('./routes/bschlabel'));
app.use('/tf/oper', require('./routes/oper'));

// Escuchar Peticiones
app.listen(process.env, () => {
    console.log('Express Server en puerto: ' + process.env.PORT + ' - \x1b[32m%s\x1b[0m','ONLINE!!!!!!!')
})