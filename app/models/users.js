var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var UserSchema = new Schema({
    id_guid: String,
    nome: {
        type: String,
        require: true
    },
    email: {
        type: String,
        require: true
    },
    senha: {
        type: String,
        require: true
    }
    // telefones: {
    //     numero: Number,
    //     ddd: Number
    // }
});

module.exports = mongoose.model('users', UserSchema);