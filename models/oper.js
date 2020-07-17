var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var operSchema = new Schema({
    oper: { type: String, required: [true, 'La oper es necesario']  },
    formatoIn: { type: String, required: [true, 'El formato In es necesario']  }
});

module.exports = mongoose.model('oper', operSchema);