const mongoose = require('mongoose');

const studentModel = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: String,
    email: String
}, { versionKey: false });

module.exports = mongoose.model('user', studentModel);