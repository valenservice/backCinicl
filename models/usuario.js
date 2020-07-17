const {Schema, model} = require('mongoose');

const usuarioSchema = new Schema({
    nombre: { type: String, required: [true, 'El nombre es necesario'] },
    email: { type: String, unique: true, required: [true, 'El correo es necesario'] },
    password: { type: String, required: [true, 'La contraseña es obligatorio'] },
    img: { type: String, required: false },
    role: { type: String, required: true, default: 'USER_ROLE' }
});

usuarioSchema.method('toJSON', function() {
    const {__v, _id, password, ...object} = this.toObject();
    
    object.id = _id;
    return object;
})

module.exports = model('usuario', usuarioSchema);