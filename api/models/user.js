const mongoose = require('mongoose');
const {
    Schema
} = mongoose;

const userSchema = new Schema({
    nome: {
        type: String,
        required: true
    },
    centro: {
        type: String,
        require: true
    },
    telefone: {
        type: String,
        require: true
    }
});

module.exports = mongoose.model('user', userSchema);