var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var formatoinSchema = new Schema({
    oper: { type: String, required: [true, 'La oper es necesario'] },
    formato: { type: String, required: [true, 'El formato In es necesario'] },
    type: { type: String, required: [true, 'El type In es necesario'] },
    dataname: { type: String, required: [true, 'El dataname In es necesario'] },
    defaultValue: { type: String, required: false },
    length: { type: String, required: false },
    justify: { type: String, required: false },
    padChar: { type: String, required: false },
    decPlaces: { type: String, required: false },
    signed: { type: String, required: false },
    to: { type: String, required: false },
    padding: { type: String, required: false },
});

module.exports = mongoose.model('formatoinpe', formatoinSchema);