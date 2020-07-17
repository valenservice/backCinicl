const mongoose = require('mongoose');

const dbConnection = async  () => {

    try {
        await mongoose.connection.openUri(process.env.DB_CNN, {
                                useNewUrlParser: true, 
                                useCreateIndex: true, 
                                useUnifiedTopology: true
        });

        console.log('MongoDB en Puerto 27017 - \x1b[32m%s\x1b[0m','ONLINE!!!!!!!') 

    } catch (error) {

        console.log(error);

        throw new Error('Error al iniciar la BD Mongo');
    }

}

 module.exports = {
     dbConnection
 }

