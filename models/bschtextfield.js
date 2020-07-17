var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var bschtextfieldSchema = new Schema({
    view: { type: String, required: [true, 'La view es necesario']  },
    bschTextField: { type: String, required: [true, 'El bschTextField es necesario']  },
    setName: { type: String, required: [true, 'El nombre es necesario']  },
    setDataName: { type: String, required: false },
    setBehaviour: { type: String, required: false },
    setMaxChars: { type: String, required: false },
    setType: { type: String, required: false },
    setDefaultValue: { type: String, required: false },
    setDimensions: { type: String, required: false },
    setVisible: { type: String, required: false }
});

module.exports = mongoose.model('bschtextfield', bschtextfieldSchema);