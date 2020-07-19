const {Schema, model} = require('mongoose');

const HospitalSchema = new Schema({
    nombre: { type: String, required: [true, 'El nombre es necesario'] },    
    img: { type: String, required: false },
    usuario: { type: Schema.Types.ObjectId, required: true, ref: 'Usuario'}
}, {collection: 'hospitales'});

HospitalSchema.method('toJSON', function() {
    const {__v, ...object} = this.toObject();
    return object;
});

module.exports = model('Hospital', HospitalSchema);