var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var bschlabelSchema = new Schema({
    view: { type: String, required: [true, 'La view es necesario']  },
    bschlabel: { type: String, required: [true, 'El bschLabel es necesario']  },
    setName: { type: String, required: [true, 'El nombre es necesario']  },
    setText: { type: String, required: false },
    setBehaviour: { type: String, required: false },
    setDimensions: { type: String, required: false }
});

module.exports = mongoose.model('bschlabel', bschlabelSchema);