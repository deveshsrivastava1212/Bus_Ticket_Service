const mongoose = require('mongoose');

const Admin_Schema = new mongoose.Schema({
    admin: {
        type:Boolean,
        required: true
    },

    email:{
        type: String,
        required: true
    },

    password:{
        type:String,
        required: true
    }
});

module.exports = {
    admin: mongoose.model('Admin', Admin_Schema),
}