const mongoose = require('mongoose');
//mongoose.connect('mongodb://localhost:27017/library');
mongoose.connect('mongodb://localhost:27017/library', { useNewUrlParser: true, useUnifiedTopology: true });
const Schema = mongoose.Schema;

const AuthSchema = new Schema({
    user_type: String,
    name: String,
    gender: String,
    dob: String,
    address: String,
    email: String,
    phone: String,
    password: String
});

var Authdata = mongoose.model('userdata', AuthSchema);

module.exports = Authdata;