const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const User = new Schema({
    name: {type: String},
    age: {type: Number},
    gender: {type: String},
    address: {type: String, maxLength: 500}
})

module.exports = mongoose.model('User', User)
